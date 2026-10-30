---
name: adaptive-svg
description: Add an illustration with light and dark variants as one SVG that follows the site theme, copied from Figma or from exported files. Use when user says "add course images from Figma", pastes a Figma link with light and dark illustrations, "make this SVG adaptive", "join light and dark images", "add dark mode to this illustration", "here is the light and dark version", or "adaptive-svg". Handles getting the variants, merging, checking the result, and wiring the image up.
allowed-tools: Read Write Edit Bash Glob Grep
argument-hint: FIGMA_LINK | light.svg dark.svg
---

# Adaptive SVG

Merge a light and a dark variant of an illustration into one SVG that switches colors with the site theme, as "Light and dark variants" in `standards/page-structure.md` describes. There's no script for the merge. Do it however works for the pair at hand. What counts is the check in step 4: each mode of the merged file renders the same as the variant it came from.

Locally, the skill expects macOS, because it reads the variants from the clipboard with `pbpaste`. In a cloud environment, where the agent can't reach the user's clipboard, the user uploads the variants as files instead.

## Process

1. **Decide where it goes** - match the illustration to its use. For a course image, that's the card in `sources/academy/homepage_content.json` with the same title, and its `imageUrl`. An existing image at that path gets replaced. If the course has no card yet, add one, ordered like the left navigation. Ask the user to confirm the target file and where it's wired up before going further
2. **Get the variants** - put both in `/tmp/adaptive-svg/<name>/light.svg` and `dark.svg`, outside the repo. Given files, copy them there. Given a Figma link, don't use a Figma connector. Ask the user to copy one variant at a time:

   > In Figma, click the outermost frame of the light variant, right-click it, and choose **Copy as SVG**. Tell me when it's copied.

   Then save the clipboard and check it:

   ```bash
   mkdir -p /tmp/adaptive-svg/<name> && pbpaste > /tmp/adaptive-svg/<name>/light.svg
   head -c 120 /tmp/adaptive-svg/<name>/light.svg; tail -c 20 /tmp/adaptive-svg/<name>/light.svg
   ```

   The file must start with `<svg` and end with `</svg>`. Its first `<rect>` is usually the background, which tells light from dark. If it's the wrong variant, or not an SVG, ask the user to copy it again. Repeat for `dark.svg`

   In a cloud environment, ask for both variants at once instead:

   > In Figma, click the outermost frame of each variant, right-click it, and choose **Copy as SVG**. Paste each into a text editor, save it as `light.svg` or `dark.svg`, and attach both files to your next message.

   Copy the attached files to `/tmp/adaptive-svg/<name>/` and check them the same way. If the attachments aren't available as files, ask the user to attach them again. Don't recreate them from text in the conversation
3. **Merge** into `static/img/<section>/<name>.svg`. See [The merged file](#the-merged-file) for the result and [What the variants differ in](#what-the-variants-differ-in) for what to expect
4. **Check** - render each mode of the merged file and compare it with the original variant, as [Checking the result](#checking-the-result) describes. Don't hand over a file that fails
5. **Wire it up** - reference only the merged file, and make sure no source exports ended up in the repo
6. **Hand over** - tell the user what the variants differed in and how you handled it, show the check's numbers, list the changed files, remind them to try the theme toggle on the preview build, and ask before committing or opening a pull request

## The merged file

Use `static/img/academy/scraping-with-ai.svg` as the model:

- Start from the light variant's markup and keep it as it is, so the file stays close to a plain Figma export
- Replace each color that differs between the variants with `var(--color-NN)`, numbered from `01` in order of first use. One light and dark pair gets one variable wherever it occurs. Colors that are the same in both variants stay as they are
- Right after the opening `<svg>` tag, add a `<style>` block that sets the light values on `:root` and overrides them inside `@media (prefers-color-scheme: dark)`, indented like the model
- Don't add a separate `*-dark.svg`, and don't use `imageUrlDarkTheme`

Variables also work for non-color attributes such as `opacity` or `display`, when the variants differ in more than color.

## What the variants differ in

Designers make the dark frame as a recolored copy of the light one, but it rarely stays a pure recolor. Expect these, and handle them so that both modes still render as their variant does:

- **IDs** - Figma names IDs after the frame's node, such as `clip0_7348_1731` and `clip0_7348_883`. Treat them as equal, and keep the light ones
- **Tiny numeric differences** - text converted to paths differs by a few thousandths between frames. Keep the light values
- **Layer order** - layers can be stacked in a different order. Pair elements by their shape and position, not by their place in the file. Keeping the light order is fine as long as the reordered layers don't overlap, and the check confirms it
- **An attribute in one variant only** - for example `opacity` or `stroke`. Work out the effective value in the other variant, such as `opacity` 1 when it's missing, and treat it as a difference in that attribute
- **A layer in one variant only** - keep it and hide it in the other mode with a variable, for example on `opacity`
- **Embedded images** - Figma names them after the node, so `href` differs even when the image data is the same. Compare the data, not the reference

Write the merge as code, such as a throwaway Node.js or Python script in `/tmp/adaptive-svg/<name>/`. Never retype an SVG from the conversation into a file, since a changed digit would go unnoticed. If the variants differ in a way one file can't express, show the user where and ask how to proceed.

## Checking the result

For each mode, render the original variant and the merged file the same way, and compare the pixels:

1. Render each file alone on a fresh page, as the only `<img>` at the top left with no margin, at its natural size and a device scale factor of 2, and take a screenshot of the image. Two images on the same page anti-alias differently even when they're the same file, so never compare images that sit at different positions. Emulate the color scheme, for example with Playwright and `page.emulateMedia({ colorScheme: 'light' })` or `'dark'`. If the repo has no Playwright, install it in `/tmp/adaptive-svg/` rather than adding it to the project
2. Compare `light.svg` with the merged file in light mode, and `dark.svg` with the merged file in dark mode, pixel by pixel on the decoded colors, not the PNG bytes. Count the pixels that differ and the largest difference in any color channel. As a control, compare `light.svg` with `dark.svg` in light mode, which must differ a lot, so you know the comparison works
3. The check passes when the renders are identical. Expect that even with layers stacked differently or tiny numeric differences. If a few pixels differ by a small amount, show the user where. Any other difference means the merge is wrong. Look at a diff image to find where, then fix the merge and check again
