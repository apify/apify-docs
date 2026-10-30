// Merge a light and a dark variant of an SVG illustration into one SVG that follows the site theme.
//
// The output keeps the light variant's markup and replaces every color that differs between the
// variants with a CSS custom property. A <style> block defines the light values and overrides them
// inside @media (prefers-color-scheme: dark), which Docusaurus drives from its theme toggle.
//
// Both inputs must have the same element tree, which is what Figma exports when the dark variant is
// a recolored copy of the light one. IDs may differ. Before writing, the script parses its output,
// resolves the variables both ways, and checks the result against the inputs.
//
// See "Light and dark variants" in standards/page-structure.md.
//
// Generated with an AI agent. The built-in check validates every merge against both inputs, and the
// output matches static/img/academy/scraping-with-ai.svg, which was checked in a browser. If it
// breaks, regenerate or fix it with an agent against the failing pair of exports rather than
// patching it by hand.
//
// Usage:
//   pnpm svg:adaptive LIGHT.svg DARK.svg static/img/<section>/<name>.svg

import { readFile, writeFile } from 'node:fs/promises';

import { parseDocument } from 'htmlparser2';

const COLOR_ATTRS = new Set(['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color']);
const URL_REF = /url\(#([^)]+)\)/g;
const NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g;
const VAR_REF = /var\((--color-\d+)\)/g;
// Figma exports differ by up to a few thousandths in text converted to paths
const NUMERIC_TOLERANCE = 0.01;

class MergeError extends Error {}

const isElement = (node) => node.type === 'tag' || node.type === 'script' || node.type === 'style';
const childElements = (node) => node.children.filter(isElement);
const textContent = (node) =>
    node.children
        .filter((child) => child.type === 'text')
        .map((child) => child.data)
        .join('')
        .trim();

function parse(text) {
    const doc = parseDocument(text, { xmlMode: true, decodeEntities: false });
    const root = doc.children.find(isElement);
    if (root?.name !== 'svg') throw new MergeError('expected an <svg> root element');
    return { doc, root };
}

function serialize(nodes) {
    return nodes
        .map((node) => {
            if (node.type === 'text') return node.data;
            if (node.type === 'comment') return `<!--${node.data}-->`;
            if (node.type === 'directive') return `<${node.data}>`;
            if (node.type === 'cdata') return `<![CDATA[${serialize(node.children)}]]>`;
            return serializeElement(node, serialize(node.children));
        })
        .join('');
}

function serializeElement(node, inner) {
    const attrs = Object.entries(node.attribs)
        .map(([name, value]) => ` ${name}="${value}"`)
        .join('');
    return inner ? `<${node.name}${attrs}>${inner}</${node.name}>` : `<${node.name}${attrs}/>`;
}

// Largest difference between the numbers in two values with the same non-numeric skeleton, or null
function numericDelta(a, b) {
    if (a.replace(NUMBER, '#') !== b.replace(NUMBER, '#')) return null;
    const as = a.match(NUMBER) ?? [];
    const bs = b.match(NUMBER) ?? [];
    return Math.max(0, ...as.map((x, i) => Math.abs(Number(x) - Number(bs[i]))));
}

function* walkPairs(a, b, path = 'svg') {
    yield [a, b, path];
    const aChildren = childElements(a);
    const bChildren = childElements(b);
    if (aChildren.length !== bChildren.length) {
        throw new MergeError(`${path}: ${aChildren.length} children in light, ${bChildren.length} in dark`);
    }
    for (const [i, ac] of aChildren.entries()) {
        const bc = bChildren[i];
        const childPath = `${path}/${ac.name}[${i}]`;
        if (ac.name !== bc.name) throw new MergeError(`${childPath}: <${ac.name}> in light, <${bc.name}> in dark`);
        yield* walkPairs(ac, bc, childPath);
    }
}

// Dark IDs map onto light IDs, so url(#...) references compare equal
function idNormalizer(lightRoot, darkRoot) {
    const idMap = new Map();
    for (const [light, dark] of walkPairs(lightRoot, darkRoot)) {
        if (dark.attribs.id !== undefined) idMap.set(dark.attribs.id, light.attribs.id);
    }
    return (value) => value.replace(URL_REF, (match, id) => `url(#${idMap.get(id) ?? id})`);
}

function attributeNames(a, b, path) {
    const names = new Set([...Object.keys(a.attribs), ...Object.keys(b.attribs)]);
    names.delete('id');
    for (const name of names) {
        if (!(name in a.attribs && name in b.attribs)) {
            throw new MergeError(`${path}: attribute '${name}' is only in one variant`);
        }
    }
    return [...names].sort();
}

function merge(light, dark) {
    for (const { root } of [light, dark]) {
        if (root.children.some((node) => isElement(node) && node.name === 'style')) {
            throw new MergeError('an input already has a <style> block, merge only plain exports');
        }
    }
    const normalize = idNormalizer(light.root, dark.root);
    const variables = new Map(); // "light\0dark" -> { name, light, dark }
    for (const [l, d, path] of walkPairs(light.root, dark.root)) {
        if (textContent(l) !== textContent(d)) throw new MergeError(`${path}: text content differs`);
        for (const name of attributeNames(l, d, path)) {
            const lv = l.attribs[name];
            const dv = normalize(d.attribs[name]);
            if (lv === dv) continue;
            if (!COLOR_ATTRS.has(name)) {
                const delta = numericDelta(lv, dv);
                if (delta !== null && delta < NUMERIC_TOLERANCE) {
                    console.log(`${path}: '${name}' differs by ${delta.toFixed(4)} at most, keeping the light value`);
                    continue;
                }
                throw new MergeError(`${path}: non-color attribute '${name}' differs: '${lv}' vs '${dv}'`);
            }
            const key = `${lv}\0${dv}`;
            if (!variables.has(key)) {
                const index = String(variables.size + 1).padStart(2, '0');
                variables.set(key, { name: `--color-${index}`, light: lv, dark: dv });
            }
            l.attribs[name] = `var(${variables.get(key).name})`;
        }
    }
    if (variables.size === 0) throw new MergeError('the variants are identical, nothing to merge');

    const vars = [...variables.values()];
    const lightRules = vars.map((v) => `      ${v.name}: ${v.light};`).join('\n');
    const darkRules = vars.map((v) => `        ${v.name}: ${v.dark};`).join('\n');
    const css =
        `\n    :root {\n${lightRules}\n    }\n` +
        `    @media (prefers-color-scheme: dark) {\n      :root {\n${darkRules}\n      }\n    }\n  `;
    const nodes = light.doc.children;
    const rootIndex = nodes.indexOf(light.root);
    const root = serializeElement(light.root, `\n  <style>${css}</style>${serialize(light.root.children)}`);
    const output = serialize(nodes.slice(0, rootIndex)) + root + serialize(nodes.slice(rootIndex + 1));
    return { output: `${output.trimEnd()}\n`, count: vars.length };
}

// Parse the written file, resolve the variables to one scheme, and compare with that scheme's input
function check(output, light, dark) {
    const { root } = parse(output);
    const style = root.children.find((node) => isElement(node) && node.name === 'style');
    const [lightCss, darkCss] = serialize(style.children).split('@media');
    const values = (css) => new Map([...css.matchAll(/(--color-\d+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]));
    root.children = root.children.filter((node) => node !== style);

    for (const [scheme, source, map] of [
        ['light', light, values(lightCss)],
        ['dark', dark, values(darkCss)],
    ]) {
        const normalize = idNormalizer(root, source.root);
        for (const [o, s, path] of walkPairs(root, source.root)) {
            if (textContent(o) !== textContent(s)) throw new MergeError(`${path}: text content differs`);
            for (const name of attributeNames(o, s, path)) {
                const resolved = o.attribs[name].replace(VAR_REF, (match, v) => map.get(v));
                const expected = normalize(s.attribs[name]);
                if (resolved === expected) continue;
                const delta = numericDelta(resolved, expected);
                if (COLOR_ATTRS.has(name) || delta === null || delta >= NUMERIC_TOLERANCE) {
                    throw new MergeError(
                        `${path}: '${name}' is '${resolved}' in ${scheme} mode, expected '${expected}'`,
                    );
                }
            }
        }
    }
}

async function main() {
    const [lightPath, darkPath, outPath] = process.argv.slice(2);
    if (!outPath) {
        console.error('Usage: pnpm svg:adaptive LIGHT.svg DARK.svg OUTPUT.svg');
        process.exit(1);
    }
    const lightText = await readFile(lightPath, 'utf8');
    const light = parse(lightText);
    // The output is built from the light file's markup, and only attribute values come from the dark
    // file, so only the light file has to serialize back unchanged
    if (serialize(light.doc.children) !== lightText) {
        throw new MergeError(`${lightPath}: can't reproduce the file exactly, use a plain SVG export`);
    }
    const dark = parse(await readFile(darkPath, 'utf8'));
    const { output, count } = merge(light, dark);
    try {
        check(output, parse(lightText), dark);
    } catch (error) {
        if (error instanceof MergeError) error.message = `Check of the merged file failed: ${error.message}`;
        throw error;
    }
    await writeFile(outPath, output);
    console.log(`${outPath}: ${count} color variables, matches both variants`);
}

try {
    await main();
} catch (error) {
    if (!(error instanceof MergeError)) throw error;
    console.error(error.message);
    process.exit(1);
}
