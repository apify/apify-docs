---
name: adaptive-svg
description: Merge a light and a dark SVG export into one adaptive SVG that follows the site's light/dark theme. Use when user says "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles merging, pixel-exact verification, and checking the live site.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: light.svg dark.svg target.svg
---

# Adaptive SVG

One SVG file holds both color schemes. A `<style>` block defines the light colors as CSS custom properties (`--color-01`, …) and overrides them inside `@media (prefers-color-scheme: dark)`. Docusaurus sets `color-scheme` on `<html>` from its theme toggle, and the browser passes it into SVGs loaded through `<img>`, so the image follows the site toggle, not only the OS setting. Don't use `imageUrlDarkTheme` or separate `*-dark.svg` files.

## Process

1. **Identify the variants** - the light export has a light background `rect`, the dark one a dark one. Both must come from the same Figma frame, with the dark one a recolored copy
2. **Keep the originals** - copy both into a scratch directory outside the repo, such as `/tmp/adaptive-svg/<name>/`. Verification needs them, and they must not be committed
3. **Merge** - `python3 -I .agents/skills/adaptive-svg/scripts/merge_svg.py LIGHT.svg DARK.svg static/img/<section>/<name>.svg`. Name the result after what it shows, with no `-light` or `-dark` suffix
4. **Verify** - install the browser driver once, outside the repo, then compare renders:

   ```bash
   npm install --prefix /tmp/adaptive-svg playwright-core
   NODE_PATH=/tmp/adaptive-svg/node_modules node .agents/skills/adaptive-svg/scripts/verify.cjs \
     LIGHT.svg DARK.svg static/img/<section>/<name>.svg /tmp/adaptive-svg/<name>/shots
   ```

   Every line must say `ok`, which means pixel-identical to the source in both OS and site-toggle modes. Look at one light and one dark screenshot too
5. **Wire it up** - reference only the merged file, for example `imageUrl` in `sources/academy/homepage_content.json`, and delete the source exports from the repo
6. **Check the deployed page** (optional, on a preview build or after merge) - `NODE_PATH=/tmp/adaptive-svg/node_modules node .agents/skills/adaptive-svg/scripts/site-check.cjs <page URL> /tmp/adaptive-svg/site /img/<section>/`

If `merge_svg.py` stops with an error, see `.agents/skills/adaptive-svg/references/technique.md` before editing anything by hand.
