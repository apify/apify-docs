---
name: adaptive-svg
description: Add an illustration with light and dark variants as one SVG that follows the site theme, copied from Figma or from exported files. Use when user says "add course images from Figma", pastes a Figma link with light and dark illustrations, "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles getting the variants, merging, and wiring the image up.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: FIGMA_LINK | light.svg dark.svg
---

# Adaptive SVG

People merge light and dark variants with `pnpm svg:adaptive`, as "Light and dark variants" in `standards/page-structure.md` describes. This skill adds what an agent needs on top: getting the variants from the user, handling merge errors, and confirming the details.

The skill expects macOS, because it reads the variants from the clipboard with `pbpaste`.

## Process

1. **Decide where it goes** - match the illustration to its use. For a course image, that's the card in `sources/academy/homepage_content.json` with the same title, and its `imageUrl`. An existing image at that path gets replaced. If the course has no card yet, add one, ordered like the left navigation. Ask the user to confirm the target file and where it's wired up before going further
2. **Get the variants** - put both in `/tmp/adaptive-svg/<name>/light.svg` and `dark.svg`, outside the repo. Given files, copy them there. Given a Figma link, don't use a Figma connector. Ask the user to copy one variant at a time:

   > In Figma, click the outermost frame of the light variant, right-click it, and choose **Copy as SVG**. Tell me when it's copied.

   Then save the clipboard and check it:

   ```bash
   mkdir -p /tmp/adaptive-svg/<name> && pbpaste > /tmp/adaptive-svg/<name>/light.svg
   head -c 120 /tmp/adaptive-svg/<name>/light.svg; tail -c 20 /tmp/adaptive-svg/<name>/light.svg
   ```

   The file must start with `<svg` and end with `</svg>`. Its first `<rect>` is usually the background, which tells light from dark. If it's the wrong variant, or something else than an SVG, ask the user to copy it again. Repeat for `dark.svg`. Never retype an SVG from the conversation into a file
3. **Merge** - `pnpm svg:adaptive /tmp/adaptive-svg/<name>/light.svg /tmp/adaptive-svg/<name>/dark.svg static/img/<section>/<name>.svg`. Don't edit the SVGs to make them fit. The script refuses anything that isn't the same drawing in two color schemes, and then it's for the user to fix the frames in Figma and copy them again. If it stops:

   | Message | Cause | Fix |
   | --- | --- | --- |
   | `N children in light, M in dark` | A layer is missing or hidden in one frame, or the frames don't belong together | Ask the user to align the layers in Figma |
   | `<x> in light, <y> in dark` | Same as above, or the layers are stacked in a different order. Compare the two files around the reported element to find which | Ask the user to make the layer order in the dark frame match the light one, or align the layers |
   | `attribute 'x' is only in one variant` | Usually `stroke` or `opacity` set in one frame only | Ask the user to fix the frame |
   | `non-color attribute 'href' differs` or `'xlink:href' differs` | The frame has an embedded image. Figma names it after the node ID, so it differs between the frames. The script doesn't support embedded images | Ask the user to replace the image with vector shapes or drop it |
   | `non-color attribute 'style' differs` | Usually a color set in inline CSS, such as `style="fill:#000"`, instead of as an attribute. Copy as SVG doesn't produce this | Ask the user to copy the frame with Copy as SVG |
   | `non-color attribute 'x' differs` | A real difference in geometry or opacity | Ask whether it's intended. An `opacity` change can become a color change in Figma |
   | `already has a <style> block` | An input is already adaptive | Use plain exports |
   | `the variants are identical` | The same frame copied twice | Ask the user to copy the other variant |
   | `can't reproduce the file exactly` | The input isn't a plain SVG export | Ask the user to copy the frame with Copy as SVG |

   When pointing the user to a problem, name the Figma layers involved. The `id` attributes in the export don't match layer names, but the shapes, positions, and colors around the reported element usually make it clear

   A warning that a value differs by a few thousandths is Figma's rounding in text converted to paths. The script keeps the light value
4. **Wire it up** - reference only the merged file, and make sure no source exports ended up in the repo
5. **Hand over** - show the user the script's output and which files changed, remind them to check the theme toggle on the preview build, and ask before committing or opening a pull request
