"""Merge a light and a dark SVG variant into one adaptive SVG.

The output keeps the light variant's markup and replaces every color that
differs between the variants with a CSS custom property. A <style> block
defines the light values and overrides them inside
@media (prefers-color-scheme: dark).

Both inputs must have the same element tree, which is what Figma exports
when the dark variant is a recolored copy of the light one. IDs may differ.

Usage: python3 merge_svg.py LIGHT.svg DARK.svg OUTPUT.svg
"""

import re
import sys
from xml.dom import minidom

COLOR_ATTRS = {'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color'}
URL_REF = re.compile(r'url\(#([^)]+)\)')
NUMBER = re.compile(r'-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?')
NUMERIC_TOLERANCE = 0.01
ROOT_TAG = re.compile(r'<svg\b[^>]*>')


def numeric_delta(a, b):
    """Largest difference between the numbers in two values with the same non-numeric skeleton, or None."""
    if NUMBER.sub('#', a) != NUMBER.sub('#', b):
        return None
    return max((abs(float(x) - float(y)) for x, y in zip(NUMBER.findall(a), NUMBER.findall(b))), default=0.0)


def child_elements(node):
    return [c for c in node.childNodes if c.nodeType == c.ELEMENT_NODE]


def text_content(node):
    return ''.join(c.data for c in node.childNodes if c.nodeType == c.TEXT_NODE).strip()


def walk_pairs(light, dark, path='svg'):
    yield light, dark, path
    light_children, dark_children = child_elements(light), child_elements(dark)
    if len(light_children) != len(dark_children):
        sys.exit(f'{path}: {len(light_children)} children in light, {len(dark_children)} in dark')
    for i, (lc, dc) in enumerate(zip(light_children, dark_children)):
        child_path = f'{path}/{lc.tagName}[{i}]'
        if lc.tagName != dc.tagName:
            sys.exit(f'{child_path}: <{lc.tagName}> in light, <{dc.tagName}> in dark')
        yield from walk_pairs(lc, dc, child_path)


def main(light_path, dark_path, out_path):
    light_doc, dark_doc = minidom.parse(light_path), minidom.parse(dark_path)
    for doc, path in ((light_doc, light_path), (dark_doc, dark_path)):
        if doc.getElementsByTagName('style'):
            sys.exit(f'{path} already has a <style> block, merge only plain exports')
    pairs = list(walk_pairs(light_doc.documentElement, dark_doc.documentElement))

    # Dark IDs map onto light IDs, so url(#...) references compare equal
    id_map = {d.getAttribute('id'): l.getAttribute('id') for l, d, _ in pairs if d.hasAttribute('id')}

    def normalize(value):
        return URL_REF.sub(lambda m: f'url(#{id_map.get(m.group(1), m.group(1))})', value)

    variables = {}  # (light value, dark value) -> variable name
    for light, dark, path in pairs:
        if text_content(light) != text_content(dark):
            sys.exit(f'{path}: text content differs')
        names = set(light.attributes.keys()) | set(dark.attributes.keys())
        for name in sorted(names):
            if name == 'id':
                continue
            if not (light.hasAttribute(name) and dark.hasAttribute(name)):
                sys.exit(f'{path}: attribute {name!r} is only in one variant')
            lv, dv = light.getAttribute(name), normalize(dark.getAttribute(name))
            if lv == dv:
                continue
            if name not in COLOR_ATTRS:
                delta = numeric_delta(lv, dv)
                if delta is not None and delta < NUMERIC_TOLERANCE:
                    # Figma exports rounding noise, keep the light geometry
                    print(f'{path}: {name!r} differs by {delta:g} at most, keeping the light value')
                    continue
                sys.exit(f'{path}: non-color attribute {name!r} differs: {lv!r} vs {dv!r}')
            var = variables.setdefault((lv, dv), f'--color-{len(variables) + 1:02d}')
            light.setAttribute(name, f'var({var})')

    if not variables:
        sys.exit('The variants are identical, nothing to merge')

    light_rules = '\n'.join(f'      {v}: {lv};' for (lv, _), v in variables.items())
    dark_rules = '\n'.join(f'        {v}: {dv};' for (_, dv), v in variables.items())
    css = (f'\n    :root {{\n{light_rules}\n    }}\n'
           f'    @media (prefers-color-scheme: dark) {{\n      :root {{\n{dark_rules}\n      }}\n    }}\n  ')

    root = light_doc.documentElement
    style = light_doc.createElement('style')
    style.appendChild(light_doc.createTextNode(css))
    root.insertBefore(light_doc.createTextNode('\n  '), root.firstChild)
    root.insertBefore(style, root.firstChild.nextSibling)

    # minidom reorders the root's attributes, so put back the original opening tag
    with open(light_path) as f:
        root_tag = ROOT_TAG.search(f.read()).group(0)
    with open(out_path, 'w') as f:
        f.write(ROOT_TAG.sub(lambda _: root_tag, root.toxml(), count=1) + '\n')
    print(f'{out_path}: {len(variables)} color variables')


if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
