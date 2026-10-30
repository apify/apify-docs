---
name: adaptive-svg
description: Merge a light and a dark SVG variant into one adaptive SVG that follows the site's light/dark theme, starting from a Figma link or from exported files. Use when user says "add course images from Figma", pastes a Figma link with light and dark illustrations, "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles export, merging, pixel-exact verification, and checking the live site.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: FIGMA_LINK | light.svg dark.svg target.svg
---

# Adaptive SVG

One SVG file holds both color schemes. A `<style>` block defines the light colors as CSS custom properties (`--color-01`, …) and overrides them inside `@media (prefers-color-scheme: dark)`. Docusaurus sets `color-scheme` on `<html>` from its theme toggle, and the browser passes it into SVGs loaded through `<img>`, so the image follows the site toggle, not only the OS setting. Don't use `imageUrlDarkTheme` or separate `*-dark.svg` files.

## Process

1. **Find the variants**
   - From a **Figma link**: list the frames around the linked node with the snippet in `.agents/skills/adaptive-svg/references/figma.md`. Pair the light and dark frames by name, background, and size
   - From **files**: the light export has a light background `rect`, the dark one a dark one

   Both must come from the same drawing, with the dark one a recolored copy
2. **Decide where it goes** - match the frame or file name to its use. For a course image, that's the card in `sources/academy/homepage_content.json` with the same title, and its `imageUrl`. An existing image at that path gets replaced. Ask the user to confirm the pair, the target file, and where it's wired up before going further
3. **Get the originals** - put both variants in a scratch directory outside the repo, such as `/tmp/adaptive-svg/<name>/light.svg` and `dark.svg`. Verification needs them, and they must not be committed. From Figma, export each frame and check it with `svg_hash.py` as `references/figma.md` describes
4. **Merge** - `python3 -I .agents/skills/adaptive-svg/scripts/merge_svg.py LIGHT.svg DARK.svg static/img/<section>/<name>.svg`. Name the result after what it shows, with no `-light` or `-dark` suffix
5. **Verify** - install the browser driver once, outside the repo, then compare renders:

   ```bash
   npm install --prefix /tmp/adaptive-svg playwright-core
   NODE_PATH=/tmp/adaptive-svg/node_modules node .agents/skills/adaptive-svg/scripts/verify.cjs \
     LIGHT.svg DARK.svg static/img/<section>/<name>.svg /tmp/adaptive-svg/<name>/shots
   ```

   Every line must say `ok`, which means pixel-identical to the source in both OS and site-toggle modes. Look at one light and one dark screenshot too
6. **Wire it up** - reference only the merged file, for example `imageUrl` in `sources/academy/homepage_content.json`, and delete any source exports from the repo
7. **Hand over** - show the user the verify output and a light and a dark screenshot, then ask before committing or opening a pull request
8. **Check the deployed page** (optional, on a preview build or after merge) - `NODE_PATH=/tmp/adaptive-svg/node_modules node .agents/skills/adaptive-svg/scripts/site-check.cjs <page URL> /tmp/adaptive-svg/site /img/<section>/`

If `merge_svg.py` stops with an error, see `.agents/skills/adaptive-svg/references/technique.md` before editing anything by hand.
