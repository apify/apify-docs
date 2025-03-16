---
title: 🤖🚀 CrewAI integration
sidebar_label: CrewAI
description: Learn how to build AI Agents with Apify and CrewAI 🤖🚀.
sidebar_position: 1
slug: /integrations/crewai
---

**Learn how to build AI Agents with Apify and CrewAI.**

---

## What is CrewAI

[CrewAI](https://www.crewai.com/) is an open-source Python framework designed to orchestrate autonomous, role-playing AI agents that collaborate as a "crew" to tackle complex tasks. It enables developers to define agents with specific roles, assign tasks, and integrate tools—like Apify Actors—for real-world data retrieval and automation.

:::note Explore CrewAI

For more in-depth details on CrewAI, check out its [official documentation](https://docs.crewai.com/).

:::

## How to use Apify with CrewAI

This guide demonstrates how to integrate Apify Actors with CrewAI by building a crew of agents that uses the [RAG Web Browser](https://apify.com/apify/rag-web-browser) Actor to search Google for TikTok profiles and the [TikTok Data Extractor](https://apify.com/clockworks/free-tiktok-scraper) Actor to extract and analyze data from the TikTok profiles.

### Prerequisites

- **Apify API token**: To use Apify Actors in CrewAI, you need an Apify API token. Learn how to obtain it in the [Apify documentation](https://docs.apify.com/platform/integrations/api).
- **OpenAI API key**: To power the agents in CrewAI, you need an OpenAI API key. Get one from the [OpenAI platform](https://platform.openai.com/account/api-keys).
- **Python packages**: Install the following Python packages:

    ```bash
    pip install 'crewai[tools]' langchain-apify langchain-openai
    ```

### Building the TikTok profile search and analysis crew

First, import all required packages:

```python
import os
from crewai import Agent, Task, Crew
from crewai_tools import ApifyActorsTool
from langchain_openai import ChatOpenAI
```

Next, set the environment variables for the Apify API token and OpenAI API key:

```python
os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"
```

Instantiate the LLM and Apify Actors tools:

```python
llm = ChatOpenAI(model="gpt-4o-mini")

browser_tool = ApifyActorsTool(actor_name="apify/rag-web-browser")
tiktok_tool = ApifyActorsTool(actor_name="clockworks/free-tiktok-scraper")
```

Define the agents with roles, goals, and tools:

```python
search_agent = Agent(
    role="Web Search Specialist",
    goal="Find the TikTok profile URL on the web",
    backstory="Expert in web searching and data retrieval",
    tools=[browser_tool],
    llm=llm,
    verbose=True
)

analysis_agent = Agent(
    role="TikTok Profile Analyst",
    goal="Extract and analyze data from the TikTok profile",
    backstory="Skilled in social media data extraction and analysis",
    tools=[tiktok_tool],
    llm=llm,
    verbose=True
)
```

Define the tasks for the agents:

```python
search_task = Task(
    description="Search the web for the OpenAI TikTok profile URL.",
    agent=search_agent,
    expected_output="A URL linking to the OpenAI TikTok profile."
)

analysis_task = Task(
    description="Extract data from the OpenAI TikTok profile URL and provide a profile summary and details about the latest post.",
    agent=analysis_agent,
    context=[search_task],
    expected_output="A summary of the OpenAI TikTok profile including followers and likes, plus details about their most recent post."
)
```

Create and run the crew:

```python
crew = Crew(
    agents=[search_agent, analysis_agent],
    tasks=[search_task, analysis_task],
    process="sequential"
)

result = crew.kickoff()
print(result)
```

:::note Search and analysis may take some time

The agent tasks may take some time as they search the web for the OpenAI TikTok profile and extract data from it.

:::

You will see the crew’s output in the console, showing the results of the search and analysis.

```text
Profile Summary:
- Username: OpenAI
- Profile URL: [OpenAI TikTok Profile](https://www.tiktok.com/@openai)
- Followers: 605,000
- Likes: 3,400,000
- Number of Videos: 152
- Verified: Yes
- Signature: low key research previews
- Bio Link: [OpenAI Website](https://openai.com/)

Latest Post Details:
- Post ID: 7474019216346287406
- Post Text: "@Adeline Mai is a photographer..."
- Creation Time: February 21, 2025
- Number of Likes: 863
- Number of Shares: 26
- Number of Comments: 33
- Number of Plays: 20,400
- Number of Collects: 88
- Music Used: Original Sound by OpenAI
- Web Video URL: [Watch Here](https://www.tiktok.com/@openai/video/7474019216346287406)
```

If you want to test the whole example, create a new file, `crewai_integration.py`, and copy the full code into it:

```python
import os
from crewai import Agent, Task, Crew
from crewai_tools import ApifyActorsTool
from langchain_openai import ChatOpenAI

os.environ["OPENAI_API_KEY"] = "Your OpenAI API key"
os.environ["APIFY_API_TOKEN"] = "Your Apify API token"

llm = ChatOpenAI(model="gpt-4o-mini")

browser_tool = ApifyActorsTool(actor_name="apify/rag-web-browser")
tiktok_tool = ApifyActorsTool(actor_name="clockworks/free-tiktok-scraper")

search_agent = Agent(
    role="Web Search Specialist",
    goal="Find the TikTok profile URL on the web",
    backstory="Expert in web searching and data retrieval",
    tools=[browser_tool],
    llm=llm,
    verbose=True
)

analysis_agent = Agent(
    role="TikTok Profile Analyst",
    goal="Extract and analyze data from the TikTok profile",
    backstory="Skilled in social media data extraction and analysis",
    tools=[tiktok_tool],
    llm=llm,
    verbose=True
)

search_task = Task(
    description="Search the web for the OpenAI TikTok profile URL.",
    agent=search_agent,
    expected_output="A URL linking to the OpenAI TikTok profile."
)
analysis_task = Task(
    description="Extract data from the OpenAI TikTok profile URL and provide a profile summary and details about the latest post.",
    agent=analysis_agent,
    context=[search_task],
    expected_output="A summary of the OpenAI TikTok profile including followers and likes, plus details about their most recent post."
)

crew = Crew(
    agents=[search_agent, analysis_agent],
    tasks=[search_task, analysis_task],
    process="sequential"
)

result = crew.kickoff()
print(result)
```

## Resources

- [Apify Actors](https://docs.apify.com/platform/actors)
- [CrewAI Documentation](https://docs.crewai.com/)
- [What are AI agents?](https://blog.apify.com/what-are-ai-agents/)
- [How to build an AI agent](https://blog.apify.com/how-to-build-an-ai-agent/)
