---
name: adaptive-svg
description: Add an illustration with light and dark variants as one SVG that follows the site theme, starting from a Figma link or from exported files. Use when user says "add course images from Figma", pastes a Figma link with light and dark illustrations, "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles finding the variants, export, merging, and wiring the image up.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: FIGMA_LINK | light.svg dark.svg
---

# Adaptive SVG

People merge light and dark variants with `pnpm svg:adaptive`, as "Light and dark variants" in `standards/page-structure.md` describes. This skill adds what an agent needs on top: getting the variants out of Figma, handling merge errors, and confirming the details with the user.

## Process

1. **Find the variants**
   - From a **Figma link**: list the frames around the linked node with the snippet in `.agents/skills/adaptive-svg/references/figma.md`. Pair the light and dark frames by name, background, and size
   - From **files**: the light export has a light background, the dark one a dark one
2. **Decide where it goes** - match the frame or file name to its use. For a course image, that's the card in `sources/academy/homepage_content.json` with the same title, and its `imageUrl`. An existing image at that path gets replaced. Ask the user to confirm the pair, the target file, and where it's wired up before going further
3. **Get the originals** - put both variants in `/tmp/adaptive-svg/<name>/light.svg` and `dark.svg`, outside the repo. From Figma, export each frame and check it as `references/figma.md` describes
4. **Merge** - `pnpm svg:adaptive /tmp/adaptive-svg/<name>/light.svg /tmp/adaptive-svg/<name>/dark.svg static/img/<section>/<name>.svg`. Don't edit the SVGs to make them fit. If it stops:

   | Message | Cause | Fix |
   | --- | --- | --- |
   | `N children in light, M in dark` or `<x> in light, <y> in dark` | Not the same drawing: a layer is hidden in one frame, or the frames don't belong together | Ask the user to align the frames in Figma, then export again |
   | `attribute 'x' is only in one variant` | Usually `stroke` or `opacity` set in one frame only | Ask the user to fix the frame, then export again |
   | `non-color attribute 'href' differs` or `'xlink:href' differs` | The frame has an embedded image. Figma names it after the node ID, so it differs between the frames. The script doesn't support embedded images | Ask the user to replace the image with vector shapes or drop it. Don't edit the SVGs by hand |
   | `non-color attribute 'style' differs` | Usually a color set in inline CSS, such as `style="fill:#000"`, instead of as an attribute. Plain Figma exports don't produce this | Export again with Copy as SVG or `exportAsync` |
   | `non-color attribute 'x' differs` | A real difference in geometry or opacity | Ask whether it's intended. An `opacity` change can become a color change in Figma |
   | `already has a <style> block` | An input is already adaptive | Use plain exports |
   | `the variants are identical` | The same frame or file twice | Check the pairing |
   | `can't reproduce the file exactly` | The input isn't a plain SVG export | Export again from Figma |

   A warning that a value differs by a few thousandths is Figma's rounding in text converted to paths. The script keeps the light value
5. **Wire it up** - reference only the merged file, and make sure no source exports ended up in the repo
6. **Hand over** - show the user the script's output and which files changed, remind them to check the theme toggle on the preview build, and ask before committing or opening a pull request
