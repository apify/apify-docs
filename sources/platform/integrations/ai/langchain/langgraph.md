---
title: 🦜🔘➡️ LangGraph integration
sidebar_label: LangGraph
description: Learn how to build stateful multi-agent AI workflows with LangGraph and Apify Actors to search, extract, and analyze real-time web data at scale.
slug: /integrations/langgraph
---

import ThirdPartyDisclaimer from '@site/sources/_partials/_third-party-integration.mdx';

[LangGraph](https://www.langchain.com/langgraph) is a framework for constructing stateful, multi-agent applications with large language models (LLMs). Developers use it to build multi-step agent workflows that call tools, APIs, and databases. For more details, check out the [LangGraph documentation](https://docs.langchain.com/oss/python/langgraph/overview).

<ThirdPartyDisclaimer />

LangGraph support comes from the same `langchain-apify` package as the [LangChain integration](/integrations/langchain). This page covers binding Apify tools to a LangGraph agent. See the LangChain page for the [full tool reference](/integrations/langchain#tool-reference), tool set selection, and non-agent uses such as document loading and retrieval.

## Quick start

Install the packages:

```bash
pip install langgraph langchain-apify langchain-openai
```

Then give a model one Apify tool and let it answer from live web data:

```python
import os

from langchain_apify import ApifyRAGWebBrowserTool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

os.environ["APIFY_TOKEN"] = "Your Apify API token"
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"

agent = create_react_agent(ChatOpenAI(model="gpt-5.4-mini"), [ApifyRAGWebBrowserTool()])
result = agent.invoke({"messages": [("human", "Search the web and tell me what Apify is.")]})
print(result["messages"][-1].content)
```

The rest of this page builds on that: [several tools with streamed steps](#build-the-tiktok-profile-search-and-analysis-agent), [a whole tool set at once](#bind-a-whole-tool-set), and [any other Actor](#run-any-other-actor).

## How to use Apify with LangGraph

This guide shows how to use Apify Actors with LangGraph by building a ReAct agent that searches the web for TikTok profiles and extracts data from them, using two dedicated Apify tools: `ApifyRAGWebBrowserTool`, which wraps [RAG Web Browser](https://apify.com/apify/rag-web-browser), for the search and `ApifyTikTokScraperTool`, which wraps [TikTok Scraper](https://apify.com/clockworks/tiktok-scraper), for the profile data.

### Prerequisites

- **Apify API token**: To use Apify Actors in LangGraph, you need an Apify API token. If you don't have one, you can learn how to obtain it in the [Apify documentation](/integrations/api).

- **OpenAI API key**: In order to work with agents in LangGraph, you need an OpenAI API key. If you don't have one, you can get it from the [OpenAI platform](https://platform.openai.com/account/api-keys).

- **Python packages**: You need to install the following Python packages:

    ```bash
    pip install langgraph langchain-apify langchain-openai
    ```

### Build the TikTok profile search and analysis agent

First, import all required packages:

```python
import os

from langchain_apify import ApifyRAGWebBrowserTool, ApifyTikTokScraperTool
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
```

Next, set the environment variables for the Apify API token and OpenAI API key:

```python
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_TOKEN"] = "Your Apify API token"
```

Instantiate the LLM and the Apify tools:

```python
llm = ChatOpenAI(model="gpt-5.4-mini")

browser = ApifyRAGWebBrowserTool()
tiktok = ApifyTikTokScraperTool()
```

Each tool wraps one Actor behind a simplified input schema, so the model calls it without knowing Actor IDs or Actor input schemas.

:::tip Register only the tools you need

The `langchain-apify` package ships 19 tools grouped into three sets. Every tool you register widens the model's decision space, which can cause wrong tool selection, slower responses, and higher token usage. See [choosing the right tool set](/integrations/langchain#choose-the-right-tool-set) for the full list and the tool set imports.

:::

Create the ReAct agent with the LLM and Apify tools:

```python
tools = [browser, tiktok]
agent_executor = create_react_agent(llm, tools)
```

Finally, run the agent and stream the messages:

```python
for state in agent_executor.stream(
    stream_mode="values",
    input={
        "messages": [
            HumanMessage(content="Search the web for OpenAI TikTok profile and analyze their profile.")
        ]
    }):
    state["messages"][-1].pretty_print()
```

:::note Search and analysis may take some time

Each tool call runs a real Actor on the Apify platform, so the agent may take from seconds to minutes to finish.

:::

You will see the agent's messages in the console, which will show each step of the agent's workflow. The output below is abbreviated:

```text
================================ Human Message =================================

Search the web for OpenAI TikTok profile and analyze their profile.
================================== AI Message ==================================
Tool Calls:
  apify_rag_web_browser (call_y2rbmQ6gYJYC2lHzWJAoKDaq)
 Call ID: call_y2rbmQ6gYJYC2lHzWJAoKDaq
  Args:
    query: OpenAI TikTok profile
    max_results: 1

...

================================== AI Message ==================================
Tool Calls:
  apify_tiktok_scraper (call_yQ0mLqXvRp8bT3nZKcWuHsAe)
 Call ID: call_yQ0mLqXvRp8bT3nZKcWuHsAe
  Args:
    search_query: https://www.tiktok.com/@openai
    search_type: user
    max_results: 5

...

================================== AI Message ==================================

The OpenAI TikTok profile is "OpenAI (@openai) Official". Here are some key details
about the profile:

- **Description**: The profile features "low key research previews" and includes
  videos that showcase their various projects and research developments.
- **Content focus**: The posts primarily involve previews of OpenAI's research and
  various AI-related innovations.

...

```

If you want to test the whole example, you can simply create a new file, `langgraph_integration.py`, and copy the whole code into it.

```python
import os

from langchain_apify import ApifyRAGWebBrowserTool, ApifyTikTokScraperTool
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_TOKEN"] = "Your Apify API token"

llm = ChatOpenAI(model="gpt-5.4-mini")

browser = ApifyRAGWebBrowserTool()
tiktok = ApifyTikTokScraperTool()

tools = [browser, tiktok]
agent_executor = create_react_agent(llm, tools)

for state in agent_executor.stream(
    stream_mode="values",
    input={
        "messages": [
            HumanMessage(content="Search the web for OpenAI TikTok profile and analyze their profile.")
        ]
    }):
    state["messages"][-1].pretty_print()
```

### Bind a whole tool set

Instead of importing tools one by one, you can give the agent an entire category. Each list holds tool *classes*, so instantiate them before passing them to the agent:

```python
from langchain_apify import APIFY_SEARCH_TOOLS, APIFY_SOCIAL_TOOLS

tools = [tool_cls() for tool_cls in APIFY_SEARCH_TOOLS + APIFY_SOCIAL_TOOLS]
agent_executor = create_react_agent(llm, tools)
```

### Run any other Actor

Actors without a dedicated tool go through [`ApifyActorsTool`](/integrations/langchain#run-any-other-actor), which binds to an agent the same way:

```python
from langchain_apify import ApifyActorsTool

trends = ApifyActorsTool("apify/google-trends-scraper")
agent_executor = create_react_agent(llm, [trends])
```

## Resources

- [Apify Actors](/actors)
- [LangChain integration](/integrations/langchain) - installation, full tool reference, loaders, and retrievers
- [LangGraph documentation](https://docs.langchain.com/oss/python/langgraph/overview)
- [LangChain Apify provider page](https://docs.langchain.com/oss/python/integrations/providers/apify)
