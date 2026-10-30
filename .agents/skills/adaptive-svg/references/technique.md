# Adaptive SVG technique

## What the output looks like

```xml
<svg width="460" height="200" viewBox="0 0 460 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --color-01: #FAFAFA;
      --color-02: white;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --color-01: #0F0F0F;
        --color-02: #020202;
      }
    }
  </style>
<rect width="460" height="200" fill="var(--color-01)"/>
<circle cx="132.709" cy="84.5039" r="5.18109" fill="#F86606"/>
```

- Each unique pair of light and dark values gets one variable, so a color used on 50 elements is still one variable
- Colors that are the same in both variants, such as brand colors, stay literal
- Gradients work two ways. Differing `stop-color` values become variables, or a variable holds the whole reference, such as `--color-07: url(#paint0_linear_…)`, with both gradient definitions kept in `<defs>`. Some older images in `static/img/academy/` use the second form

## Why it follows the site toggle

Infima, the CSS framework under Docusaurus, sets `html { color-scheme: var(--ifm-color-scheme) }`, and `[data-theme='dark']` switches it to `dark`. Chromium resolves `prefers-color-scheme` inside an SVG image from the embedding page's color scheme. So the image follows the site toggle when it's loaded with `<img>`, which is how the `Card` component and Markdown images load it. Opened directly in a browser tab, it follows the OS or browser setting instead.

`verify.cjs` and `site-check.cjs` cover this in Chromium only.

## How `merge_svg.py` works

1. It walks both trees in parallel and stops on a different tag or child count
2. It maps dark-variant IDs to light-variant IDs. Figma generates fresh ones per export, such as `clip0_7347_98540` and `clip0_7348_1530`, so `url(#…)` references compare equal
3. It compares every attribute:
   - A color attribute (`fill`, `stroke`, `stop-color`, `flood-color`, `lighting-color`, `color`) that differs becomes a variable
   - A number that differs by less than 0.01 is Figma rounding noise, often in text converted to paths. The script keeps the light value and prints a warning
   - Anything else stops the merge
4. It writes the light variant's markup, with the `<style>` block as the first child of `<svg>`

## When the merge stops

| Error | Cause | Fix |
| --- | --- | --- |
| `N children in light, M in dark` or `<x> in light, <y> in dark` | The variants aren't the same drawing. Either a layer is hidden in one of them, or they were exported from different frames | Ask for both exports from the same frame. Don't hand-edit the tree to make it fit |
| `attribute 'x' is only in one variant` | Usually `stroke` or `opacity` set in one variant only | Re-export, or decide by hand which value is right and add it to the other file before merging |
| `non-color attribute 'x' differs` | Real geometry or opacity difference | Check whether it's intended. An `opacity` change can be turned into a color change in Figma instead |
| `already has a <style> block` | An input is already adaptive | Use the plain Figma exports |
| `The variants are identical` | The same file was passed twice | Check the inputs |

## Verification pitfalls

- A page created with `page.setContent()` is `about:blank`, which can't load `file://` images. It renders broken-image icons that compare as equal, so the check passes when it shouldn't. `verify.cjs` loads its page from disk and fails if the image doesn't decode
- `verify.cjs` also fails if the light and dark sources render the same, because then matching them proves nothing
- Screenshots are compared byte for byte. For a pixel count of a mismatch, use `magick compare -metric AE a.png b.png diff.png`
- The repo has no Playwright dependency. Install `playwright-core` in a scratch directory and point `NODE_PATH` at it. `browser.cjs` uses `$CHROME_PATH`, then a Chromium downloaded by Playwright, looking in `$PLAYWRIGHT_BROWSERS_PATH` and the default cache, then installed Google Chrome

## Prior art

PR #2955 converted the six original Academy homepage images to this technique and removed their `*-dark.svg` files. Their bright key grids in dark mode match the original dark designs, so that's a design choice, not a merge bug.
