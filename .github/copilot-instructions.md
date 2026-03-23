# GitHub Copilot instructions for Apify documentation

Read `AGENTS.md` in the repository root - it is the single source of truth for project architecture, commands, writing style, and terminology.

## Key points for Copilot

- API docs are generated from OpenAPI specs - never edit files in `apify-api/docs/` directly
- All admonitions must have titles
- Use sentence case for headings, no gerunds (-ing forms)
- Bold only for UI elements (buttons, menus, fields)
- Front matter required on all docs: title, description (140-160 chars), sidebar_position, slug
- Use descriptive link text (never "click here")
- Always specify language for code blocks
- Follow Apify terminology: Actor, Console, Proxy, Store are capitalized; task, schedule, dataset are lowercase
