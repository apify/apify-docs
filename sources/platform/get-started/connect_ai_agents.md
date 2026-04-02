---
title: Connect AI agents
description: Give your AI agent access to thousands of web scraping and automation tools on the Apify platform using MCP, API clients, or Agent Skills.
sidebar_position: 4
slug: /get-started/connect-ai-agents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from '@site/src/components/Card';
import CardGrid from '@site/src/components/CardGrid';

Give your AI agent access to thousands of web scraping and automation tools through Apify. The fastest way to connect is the MCP server - no local installation, just a config snippet.

## Quickest path: MCP server

Add this to your MCP client config (Claude Code, Cursor, VS Code, GitHub Copilot):

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com"
    }
  }
}
```

OAuth handles authentication automatically. Your agent can now search Actors, run them, and retrieve results.

:::tip Try it
Ask your agent: "Use Apify to scrape the homepage of example.com and return the text content."
:::

## Alternative: API client

For programmatic integration, use the `apify-client` package:

<Tabs>
<TabItem value="javascript" label="JavaScript">

```javascript
import { ApifyClient } from 'apify-client';
const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('apify/web-scraper').call({
    startUrls: [{ url: 'https://example.com' }],
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

</TabItem>
<TabItem value="python" label="Python">

```python
from apify_client import ApifyClient
client = ApifyClient(token=os.environ["APIFY_TOKEN"])
run = client.actor("apify/web-scraper").call(
    run_input={"startUrls": [{"url": "https://example.com"}]}
)
items = client.dataset(run["defaultDatasetId"]).list_items().items
```

</TabItem>
</Tabs>

## Next steps

<CardGrid>
    <Card
        title="Full integration guide"
        desc="All connection methods: MCP, Agent Skills, API client, CLI, and REST API with FAQ."
        to="/platform/integrations/apify-for-ai-agents"
    />
    <Card
        title="MCP server docs"
        desc="Advanced configuration, tool customization, and client-specific setup."
        to="/platform/integrations/mcp"
    />
    <Card
        title="Framework guides"
        desc="Step-by-step setup for LangChain, CrewAI, OpenAI Agents, and more."
        to="/platform/integrations"
    />
</CardGrid>
