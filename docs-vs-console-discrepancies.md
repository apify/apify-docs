# Documentation vs Console discrepancies

Audit performed on 2026-03-20 against local Apify Console at localhost:3000.

## 1. Console homepage: "Homepage" vs "Dashboard"

**File**: `sources/platform/console/index.md`

- **Docs say**: Section heading "Homepage overview", references the page as "homepage"
- **Actual Console**: The page heading is "Dashboard" and the sidebar item is "Dashboard"
- **Docs keyboard shortcut**: Lists "Home" with shortcut GH
- **Actual**: The sidebar says "Dashboard", not "Home"
- **Fix**: Rename "Homepage overview" to "Dashboard overview", update references to use "Dashboard"

## 2. Console navigation: missing "Dashboard" sidebar item

**File**: `sources/platform/console/index.md`

- **Docs**: The navigation table (lines 111-123) does not include "Dashboard" as a sidebar item
- **Actual**: "Dashboard" is a sidebar item at `/`, positioned between "Apify Store" and "Actors"
- **Fix**: Add "Dashboard" row to the navigation table

## 3. Sign-up/sign-in buttons: wrong button labels

**File**: `sources/platform/console/index.md`

- **Docs say**: "Sign up with Google" / "Sign up with GitHub" buttons
- **Actual**: Buttons say "Continue with Google" / "Continue with GitHub"
- **Docs say**: References "sign-in" throughout
- **Actual**: The page heading says "Log in to Apify"
- **Fix**: Update button labels to match actual UI

## 4. Settings tab name: "Integrations" vs "API & Integrations"

**File**: `sources/platform/console/settings.md`

- **Docs say**: "The **Integrations** tab"
- **Actual**: The tab is called "**API & Integrations**"
- **Fix**: Update tab name to "API & Integrations"

## 5. Settings: missing "Referrals" tab

**File**: `sources/platform/console/settings.md`

- **Docs**: Do not mention the "Referrals" tab at all
- **Actual**: There is a "Referrals" tab in Settings, positioned after "Notifications"
- **Fix**: Add a section describing the Referrals tab

## 6. Settings: "API & Integrations" content description outdated

**File**: `sources/platform/console/settings.md`

- **Docs say**: Mentions "Slack workspace" integration specifically and "Actor Integration Accounts"
- **Actual**: The tab shows "API tokens" section, "Third-party apps & services", "Account-level integrations" with generic "Add account" button, and "Actor OAuth accounts"
- **Fix**: Update description to match actual sections

## 7. Billing tab name: "Subscriptions" vs "Subscription"

**File**: `sources/platform/console/billing.md`

- **Docs say**: "The **Subscriptions** tab"
- **Actual**: The tab is called "**Subscription**" (singular)
- **Fix**: Change "Subscriptions" to "Subscription"

## 8. Schedules: outdated Console URLs

**File**: `sources/platform/schedules.md`

- **Docs reference**: `https://console.apify.com/account?tab=integrations` for secret API token
- **Docs reference**: `https://console.apify.com/account#/integrations` for user ID
- **Actual**: The correct URL is `https://console.apify.com/settings/integrations`
- **Fix**: Update URLs to point to correct settings path

## 9. Actors page: "Pay per usage" pricing label not documented

**File**: `sources/platform/actors/running/store.md`

- **Docs say**: Three pricing models: "Pay per event", "Pay per result", "Rental"
- **Actual Console**: Some Actors show "Pay per usage" as their pricing model label in the Actors table
- **Note**: "Pay per usage" appears to be the standard platform-usage-only pricing model (no additional per-event or per-result charges). The docs only describe the three store-specific pricing models but don't mention the "Pay per usage" label that appears in Console.
- **Fix**: Add note about "Pay per usage" as the default model for Actors that only charge platform usage costs

## 10. Settings: "Login & Privacy" tab not separately described

**File**: `sources/platform/console/settings.md`

- **Docs**: Mention "Login & Privacy" in an info box but list login info under the Account section bullet points
- **Actual**: "Login & Privacy" is its own separate tab (distinct from "Account"), containing sign-in methods, password reset, two-factor authentication, and session configuration
- **Fix**: Restructure to describe Login & Privacy as its own section/tab

## 11. Widespread outdated `/account` URLs across the codebase

**Affected files** (30+ files):

- Multiple integration docs reference `console.apify.com/account?tab=integrations`, `console.apify.com/account#/integrations`, or `console.apify.com/account/integrations`
- Organization docs reference `console.apify.com/account#/myorganizations` and `console.apify.com/account#/myorganization`
- Storage docs, monitoring docs, academy docs, and API reference docs all contain old URLs
- **Actual**: Settings is at `console.apify.com/settings/integrations`, organizations at `console.apify.com/settings/organizations`
- **Fix**: Updated all occurrences across the codebase

## 12. Widespread "Settings > Integrations" instead of "Settings > API & Integrations"

**Affected files** (20+ files):

- Many integration docs (Make, n8n, Gumloop, Telegram, Slack, Keboola, etc.) refer to the tab as "Settings > Integrations" in prose text
- **Actual**: The Settings tab is called "API & Integrations"
- **Fix**: Updated text references to "Settings > API & Integrations" across all affected files

---

## Second-round findings (step-by-step tutorial walkthrough)

## 13. Actor running tutorial: wrong button labels

**File**: `sources/platform/actors/running/index.md`

- **Docs say**: "click **Use Actor**" then "click **Save & Start**"
- **Actual Console**: There is no "Use Actor" button on the Actor detail page. The run button says **"Start"**, not "Save & Start"
- **Fix**: Updated to remove "Use Actor" reference and changed "Save & Start" to "Start"

## 14. Actor tasks: wrong "Create task" button label

**File**: `sources/platform/actors/running/tasks.md`

- **Docs say**: "click the **Create task** button"
- **Actual Console**: The button says **"Save as a new task"**
- **Fix**: Updated button label

## 15. Schedules: wrong "Add" button label and nonexistent "Save & activate"

**File**: `sources/platform/schedules.md`

- **Docs say**: "Click on the **Add** dropdown"
- **Actual Console**: Button says **"Add new"**
- **Docs say**: "click **Save & activate**"
- **Actual Console**: No such button exists. Schedules are created in an enabled state; you toggle with **Disable**/**Enable** button
- **Fix**: Updated button label and replaced "Save & activate" description

## 16. Dataset detail: outdated export flow description

**File**: `sources/platform/storage/dataset.md`

- **Docs say**: "Select the format in **Export dataset** section" then "Click **Download**"
- **Actual Console**: There is an **Export** button (not an "Export dataset" section), and data can be viewed in **Table** or **JSON** format. There is no separate **Download** button.
- **Fix**: Updated the export flow to match actual UI

## 18. Web IDE guide: wrong intro paragraph

**File**: `sources/platform/actors/development/quick-start/start_web_ide.md`

- **Docs say**: "You'll start by creating and running it locally with the Apify CLI"
- **Actual**: This guide is about the Web IDE, not the CLI. The intro was copied from the local development guide.
- **Fix**: Rewrote the intro to accurately describe the Web IDE workflow

## 19. Web IDE guide: outdated template name and New Actor page layout

**File**: `sources/platform/actors/development/quick-start/start_web_ide.md`

- **Docs say**: "templates for JavaScript, TypeScript, and Python" and "proceed with **Crawlee + Puppeteer + Chrome**"
- **Actual New Actor page**: Shows three sections - "Link a Git repository", "Select a code template", and "Push your code with Apify CLI". The default templates shown are "Crawlee + Cheerio" variants, not "Crawlee + Puppeteer + Chrome"
- **Fix**: Updated to describe the actual page layout and use "Crawlee + Cheerio" template name

## 20. Web IDE guide: minor tab capitalization

**File**: `sources/platform/actors/development/quick-start/start_web_ide.md`

- **Docs say**: "Last Run" (capitalized R)
- **Actual**: Tab says "Last run" (lowercase r)
- **Fix**: Updated to "Last run"

## 21. Builds doc: wrong button label "Start" instead of "Build"

**File**: `sources/platform/actors/development/builds_and_runs/builds.md`

- **Docs say**: "Locate the **Start** button. Next to it, click on the arrow & choose **Clean build**"
- **Actual Console**: The button says **"Build"**, not "Start"
- **Fix**: Updated "Start" to "Build"

## 22. General resource access: wrong settings tab name

**File**: `sources/platform/collaboration/general-resource-access.md`

- **Docs say**: "Settings → Security & Privacy"
- **Actual Console**: For personal accounts, the tab is **"Login & Privacy"** (not "Security & Privacy")
- Also docs say "Account Settings → Privacy" for run sharing - actual is "Settings → Login & Privacy → Share run data with developers"
- **Fix**: Updated both references

## 23. Google Drive integration: wrong integration name

**File**: `sources/platform/integrations/data-storage/drive.md`

- **Docs say**: click on the **"Upload file"** integration
- **Actual Console**: The integration is called **"Upload results to GDrive"**
- **Fix**: Updated integration name

## 24. Gmail integration: wrong integration name

**File**: `sources/platform/integrations/workflows-and-notifications/gmail.md`

- **Docs say**: "click on Send email generic integration"
- **Actual Console**: The integration is called **"Send results email via Gmail"**
- **Fix**: Updated integration name

## 17. Actor detail page: tabs don't match documentation structure

**Observed in Console** (for own Actors in development mode):

Main tabs: Source, Information, Runs, Builds, Integrations, Monitoring, Issues, Saved tasks, Settings, Publication

Inner source tabs: Code, Last build, Input, Last run

This differs from what's implied in the running tutorial docs, which describe a simpler view with just Input/Output tabs. The development mode view has a significantly different tab structure than the store Actor view.
