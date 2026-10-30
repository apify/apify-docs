---
name: adaptive-svg
description: Add an illustration with light and dark variants as one SVG that follows the site theme, starting from a Figma link or from exported files. Use when user says "add course images from Figma", pastes a Figma link with light and dark illustrations, "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles finding the variants, export, merging, and wiring the image up.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: FIGMA_LINK | light.svg dark.svg
---

# Adaptive SVG

The technique and the merge script are documented for everyone in "Light and dark variants" in `standards/page-structure.md`. Read it first. This skill adds what an agent needs on top: getting the variants out of Figma and confirming the details with the user.

## Process

1. **Find the variants**
   - From a **Figma link**: list the frames around the linked node with the snippet in `.agents/skills/adaptive-svg/references/figma.md`. Pair the light and dark frames by name, background, and size
   - From **files**: the light export has a light background, the dark one a dark one
2. **Decide where it goes** - match the frame or file name to its use. For a course image, that's the card in `sources/academy/homepage_content.json` with the same title, and its `imageUrl`. An existing image at that path gets replaced. Ask the user to confirm the pair, the target file, and where it's wired up before going further
3. **Get the originals** - put both variants in `/tmp/adaptive-svg/<name>/light.svg` and `dark.svg`, outside the repo. From Figma, export each frame and check it as `references/figma.md` describes
4. **Merge** - `pnpm svg:adaptive /tmp/adaptive-svg/<name>/light.svg /tmp/adaptive-svg/<name>/dark.svg static/img/<section>/<name>.svg`. If it stops, follow the table in the standards section. Don't edit the SVGs to make them fit
5. **Wire it up** - reference only the merged file, and delete any source exports from the repo
6. **Hand over** - show the user the script's output and which files changed, remind them to check the theme toggle on the preview build, and ask before committing or opening a pull request
