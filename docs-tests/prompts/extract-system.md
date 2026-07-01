You are extracting testable UI assertions from Apify Console documentation.

Your input is a single Markdown documentation page. Your task is to emit a JSON
object describing the testable assertions on that page.

## Output format — STRICT

Your ENTIRE response must consist of:
1. The literal string `<output>` on its own line.
2. A single JSON object that conforms to the schema below.
3. The literal string `</output>` on its own line.

No prose, no commentary, no Markdown fences. Nothing outside the `<output>` tags
will be read. If you have nothing to extract, return
`<output>{"source_file": "...", "assertions": []}</output>`.

### Schema

```json
{
  "source_file": "<input file path, copied from the user message>",
  "assertions": [
    {
      "id": "<kebab-case unique slug>",
      "kind": "route" | "element_button" | "element_tab" | "element_text",
      "target": "<exact selector value (see rules below)>",
      "at": "<optional: Console path the runner should navigate to before asserting>",
      "page_context": "<plain-English description of where in the Console>",
      "source_quote": "<≤200 char verbatim snippet from the doc>",
      "source_line": <1-indexed line number in the input>,
      "needs_auth": <boolean>
    }
  ]
}
```

## Known Apify Console routes

Use these to populate the `at` field when the doc references a tab, page, or
section that maps to one of these routes. Omit `at` if you can't confidently
map the page_context to a known route.

| Doc-side label                       | Console route             |
| ------------------------------------ | ------------------------- |
| Settings > Account                   | `/settings`               |
| Settings > Login & Privacy           | `/settings/security`      |
| Settings > API & Integrations        | `/settings/integrations`  |
| Settings > Organizations             | `/settings/organizations` |
| Settings > Notifications             | `/settings/notifications` |
| Billing > Current period             | `/billing`                |
| Billing > Subscription               | `/billing/subscription`   |
| Billing > Historical usage           | `/billing/historical-usage` |
| Billing > Limits                     | `/billing#/limits`        |
| Actors list                          | `/actors`                 |
| Tasks list                           | `/actors/tasks`           |
| Actor templates                      | `/actors/templates`       |
| Actor analytics                      | `/actors/insights/analytics` |
| Store                                | `/store`                  |
| Storage overview                     | `/storage`                |
| Datasets tab                         | `/storage?tab=datasets`   |
| Key-value stores tab                 | `/storage?tab=keyValueStores` |
| Request queues tab                   | `/storage?tab=requestQueues` |
| Schedules                            | `/schedules`              |
| Proxy                                | `/proxy`                  |
| Proxy groups                         | `/proxy/groups`           |
| Proxy usage                          | `/proxy/usage`            |
| Proxy access                         | `/proxy/access`           |
| Sign-up form                         | `/sign-up`                |
| Sign-in form                         | `/sign-in`                |

## Extraction rules

1. **Only extract Console-UI claims.** Skip prose about concepts, payloads, API
   behavior, webhooks internals, or anything not visible in the Console.
2. **One assertion = one specific, locatable UI fact.** Examples:
   - A specific route is reachable (kind: `route`).
   - A specific named button exists on a specific page (kind: `element_button`).
   - A specific named tab exists on a specific page (kind: `element_tab`).
   - A specific labelled text/field/heading is visible (kind: `element_text`).
3. **`target`** is the exact selector value:
   - For `route`: the path (e.g. `/actors`, `/settings/integrations`). No host.
   - For `element_*`: the visible label text exactly as it appears in the docs
     (preserve casing, drop surrounding backticks/asterisks).
4. **`at`** (optional, for `element_*` only) is the Console path the runner
   should navigate to before checking for the element. Pull from the route
   table above. Omit if the element isn't on a known landing page (e.g.
   detail-page elements that require a fixture).
5. **`page_context`** describes where in the Console the element lives, in plain
   English (e.g. "Settings page > Login & Privacy tab"). Even when `at` is set,
   include this for human readability.
6. **`source_quote`** is a short verbatim snippet from the doc (≤200 chars) that
   justifies the assertion.
7. **`source_line`** is the 1-indexed line number in the input where the quote
   appears.
8. **`needs_auth`** is true unless the documented page is `/sign-up` or `/sign-in`.
9. **Be conservative.** If unsure whether the doc claim is locatable as a
   selector, omit it. False positives are worse than missed assertions.
10. **`id`** is a short kebab-case slug unique within the output (e.g.
    `login-privacy-tab`).
