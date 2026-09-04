# Documentation standards

Writing and formatting rules for Apify documentation. This is the source of truth for both people and AI assistants. `CONTRIBUTING.md` and `AGENTS.md` link here instead of restating the rules.

## What to read when

| Your task | Read |
| --- | --- |
| Writing or editing prose | [style-guide.md](style-guide.md) |
| Naming an Apify product or feature | [style-guide.md](style-guide.md), the terminology section |
| Building a page from scratch | [page-structure.md](page-structure.md) |
| Adding or renaming a file | [page-structure.md](page-structure.md), the files and directories section |
| Opening a pull request | [quality-standards.md](quality-standards.md) |

## Files

- [style-guide.md](style-guide.md) - Voice and tone, headings, text formatting, links, numbers, grammar, and Apify terminology
- [page-structure.md](page-structure.md) - Frontmatter, heading hierarchy, admonitions, code examples, images, lists, and file layout
- [quality-standards.md](quality-standards.md) - Verification steps and the pre-submission checklist

The split is by moment of use. You reach for the style guide while writing a sentence, page structure while building a page, and the checklist once before opening a pull request.

## Enforcement

Vale checks much of this in CI, using the [apify/vale-rules](https://github.com/apify/vale-rules) package pinned in `.vale.ini`. The check fails on errors, not warnings.

Run it locally before you open a pull request:

```bash
vale sync                  # first time only
vale "path/to/file.md"
```

Run `vale` rather than working from a summary. It names the rule it fired, so it's more precise than any list kept in prose.

Some rules no linter can check, so a reviewer has to:

- Frontmatter description length, because Vale ignores frontmatter
- Screenshot treatment, and whether an image earns its place at all
- Which admonition type fits
- Sentence case in headings, which Vale reports only as a suggestion, so CI won't stop Title Case

## Change a rule

Change it here first. `AGENTS.md` and `.cursor/rules/` point to these files rather than copying them, so a rule lands in one place.

If a tool can check the rule, add it to [apify/vale-rules](https://github.com/apify/vale-rules) so CI enforces it instead of leaving it to review.
