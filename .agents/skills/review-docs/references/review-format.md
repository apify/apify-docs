# Review output format

Use this format when providing documentation review feedback.

Report tool output and judgment separately. Tool findings are facts with a rule name and a line number, and the reader can act on them without trusting your reading. Judgment findings need an argument.

## Template

```markdown
## Documentation review: [File name]

### Automated checks

| Check | Result |
| --- | --- |
| `vale --minAlertLevel=suggestion` | [N errors, N warnings, N suggestions, or "not installed, prose coverage skipped"] |
| `pnpm lint:md` | [pass, or N issues] |
| `check-frontmatter.sh` | [PASS/FAIL with the character count] |

Findings, verbatim, most severe first:

- `path:line` `Rule.Name` - [message]

### Strengths

- [What's done well]

### Issues found

Judgment calls only. Anything a tool already reported belongs in the section above, not here.

#### Standards

- [ ] Issue 1: [Description, naming the rule it violates]
  - Current: [Example from the doc]
  - Suggested: [Better version]

#### Content

- [ ] Issue 2: [Description]

### Suggestions

- [Optional improvement 1]

### Priority fixes

1. [Critical - must fix before publishing]
1. [Important - should fix]
1. [Minor - nice to have]
```

When reviewing a pull request rather than a single page, run the automated checks over every changed `.md` and `.mdx` file and report them per file. The repo-level PR check only gates errors on changed files, so a local run surfaces warnings and suggestions that CI won't.

## Common issues with examples

Vale reports most style violations with a rule name and line number, so this section covers only what it can't judge.

### Non-descriptive links

`Apify.ClickHere` catches a literal "click here". It can't tell whether other link text is genuinely descriptive.

```markdown
# Bad
To learn more, see the [documentation](link).

# Good
Learn more about [Actor input schemas](/actors/development/input-schema).
```

### Bold used for emphasis

Vale can't tell a UI element from emphasis, so this one is always a judgment call.

```markdown
# Bad - bold used for emphasis
Click the button and **ensure you verify** the settings.

# Good - bold only for UI elements
Click the **Save & Run** button and ensure you verify the settings.
```

### Feature-focused description

`check-frontmatter.sh` verifies the 140-160 character range. It can't tell whether the description sells the feature or the outcome.

```markdown
# Bad - feature-focused
description: "This comprehensive documentation guide will teach you everything you need to know about creating, configuring, and deploying Actors on the Apify platform."

# Good - value-focused
description: "Build and deploy Actors efficiently with this guide covering setup, development, testing, and best practices for production use."
```

## Quality gate

A document is ready for publication when:

- `vale` reports no errors, and any remaining warnings are deliberate
- `pnpm lint:md` passes
- `check-frontmatter.sh` passes
- The judgment items in `standards/quality-standards.md` are satisfied
- Content is technically accurate, and examples are tested and working
- No broken links
