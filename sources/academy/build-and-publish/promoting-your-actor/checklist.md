---
title: Marketing checklist
description: Follow this actionable checklist to promote your Actor and reach more users through social media, content marketing, and community engagement.
sidebar_position: 0
category: build-and-publish
slug: /actor-marketing-playbook/promote-your-actor/checklist
---

You're a developer, not a marketer. You built something awesome, and now you need people to find it. This checklist breaks down the marketing process into simple, actionable steps.

Complete many tasks using AI prompts that generate content in minutes. Each completed task brings you closer to your goals.

:::tip Tag Apify for broader reach

Tag @apify when you share content on X.com (Twitter) or LinkedIn to potentially reach thousands of additional users through Apify's social channels.

:::

---

import PromptButton from "@site/src/components/PromptButton";
import { TWITTER_POST_PROMPT } from "@site/src/utils/twitter-post-prompt";
import { LINKEDIN_POST_PROMPT } from "@site/src/utils/linkedin-post-prompt";
import { MEDIUM_ARTICLE_PROMPT } from "@site/src/utils/medium-article-prompt";
import { DEVTO_ARTICLE_PROMPT } from "@site/src/utils/devto-article-prompt";
import { HASHNODE_ARTICLE_PROMPT } from "@site/src/utils/hashnode-article-prompt";
import { LINKEDIN_ARTICLE_PROMPT } from "@site/src/utils/linkedin-article-prompt";
import { DEVTO_TUTORIAL_PROMPT } from "@site/src/utils/devto-tutorial-prompt";
import { HASHNODE_TUTORIAL_PROMPT } from "@site/src/utils/hashnode-tutorial-prompt";
import { MEDIUM_TUTORIAL_PROMPT } from "@site/src/utils/medium-tutorial-prompt";
import { LINKEDIN_TUTORIAL_PROMPT } from "@site/src/utils/linkedin-tutorial-prompt";
import { REDDIT_COMMENT_PROMPT } from "@site/src/utils/reddit-comment-prompt";
import { GITHUB_README_PROMPT } from "@site/src/utils/github-readme-prompt";
import { QUORA_ANSWER_PROMPT } from "@site/src/utils/quora-answer-prompt";

## Social media promotion

### Share on Twitter/X with a demo

Twitter's developer community is active and engaged. A well-crafted tweet with a video demo can reach thousands of potential users.

Create a 30-60-second demo video or gif showing your Actor in action. Include relevant hashtags like #webscraping, #API, #automation, and #buildinpublic.

<PromptButton prompt={TWITTER_POST_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Share on LinkedIn with a demo

LinkedIn reaches professionals, decision-makers, and business users with purchasing power. The platform's algorithm favors native video content, giving it 5x more reach than link posts.

Create a 30-90-second demo video showing your Actor delivering business value. Upload the video directly to LinkedIn (native videos perform better than YouTube links). Focus your post on the business problem solved, not technical features. Use 3-5 relevant hashtags like #BusinessAutomation, #Productivity, #DataIntelligence, #Efficiency, or #MarketResearch.

<PromptButton prompt={LINKEDIN_POST_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Post in relevant Discord and Slack communities

Developer communities on Discord and Slack are where your target users spend time. These platforms enable deeper conversations and direct feedback.

Join communities related to data for AI, web scraping, automation, data science, or your specific niche. Share your Actor in relevant channels, but always check the community rules first. Consider Apify Discord, web scraping communities, automation groups, and data engineering Slacks.

---

## Video content creation

### Create a tutorial video or walkthrough

Video content ranks well on YouTube and Google. It's perfect for developers who prefer visual learning. Videos get embedded and shared, multiplying your reach.

Record a 5-10-minute screen recording showing your Actor in action. Use Loom, OBS, or your computer's built-in recorder. Distribute your video across multiple channels:

- YouTube
- LinkedIn
- Twitter/X
- Your README and articles

**Video structure:**

1. **Introduction (30-45 seconds)** - Greet viewers, explain the problem you're solving, what they'll learn, and time estimate
2. **Outcome preview (30-45 seconds)** - Show the result first, preview the final output
3. **Step-by-step walkthrough (4-7 minutes)** - Navigate to the Actor, set up configuration, show optional features, run the Actor, review results, export the data
4. **Pro tips (30-60 seconds)** - Share 2-3 quick tips you've learned
5. **Wrap up (30-45 seconds)** - Recap, call-to-action, engagement prompt

**Recording tips:** Close unnecessary tabs, use a clean browser profile, speak clearly at a moderate pace, pause briefly between steps for easier editing, and use your natural voice.

### Create short-form videos (TikTok, YouTube Shorts, Instagram Reels)

Short-form video is one of the fastest-growing content formats with incredible organic reach. Even accounts with zero followers can get thousands of views. These videos showcase your Actor's value in 15-60 seconds and appear in AI-generated answers and search results.

Focus on the "wow factor": show the problem (manual work taking forever) versus the solution (your Actor doing it in seconds). Use trending sounds when possible, add text overlays explaining what's happening (most people watch without sound), and include a clear call-to-action at the end. Post the same video across all three platforms to maximize reach.

:::tip Best practices for short-form videos

- Hook viewers in the first 3 seconds (show the result or problem immediately)
- Keep it fast-paced
- Add captions and text overlays (essential for silent viewing)
- Record in portrait mode (9:16 aspect ratio)
- End with a clear next step: "Link in bio" or "Search [Actor Name] on Apify"

:::

---

## Launch and community engagement

### Create a Product Hunt launch

Product Hunt drives significant traffic and visibility. A successful launch brings hundreds of users and valuable feedback.

Create a Product Hunt listing for your Actor. Schedule it for a weekday morning (Tuesday through Thursday works best). Prepare assets: logo, screenshots, and demo video.

Learn more in the [Product Hunt guide](/academy/actor-marketing-playbook/promote-your-actor/product-hunt).

### Submit to Hacker News

Hacker News drives significant developer traffic and has high domain authority. A front-page post brings thousands of visitors and generates discussions that lead to improvements and feature ideas.

Submit your "How I Built This" post, tutorial, or Actor launch with a descriptive title. Post between 8-10 AM EST on weekdays for best results. Engage authentically in comments. The HN community values substance over promotion.

### Promote your Actor on Reddit

Reddit ranks highly for almost all keywords and topics. You can get your product mentioned in LLMs by engaging in popular threads.

1. Search `site:reddit.com [ACTOR NAME]` in Google
2. Find relevant Reddit threads
3. Comment authentically and mention your product naturally without being salesy

Craft comments that genuinely address the thread topic, naturally mention your Actor as a solution, and add real value to the conversation. Use casual Reddit tone, not corporate speak.

### Cross-post to relevant subreddits

Original posts in relevant subreddits (r/webdev, r/datascience, r/SideProject, r/programming, r/automation) drive significant traffic when done thoughtfully.

Write a Reddit-native post that explains the problem, your solution, and invites feedback. Use titles like "I built X to solve Y" instead of "Check out my new tool." Follow subreddit self-promotion rules (many require you to be an active community member first). Share both challenges and successes to foster authentic engagement.

### Answer Stack Overflow questions

Stack Overflow answers rank well in search and are frequently referenced by AI systems. Providing helpful answers that mention your Actor creates lasting SEO value.

Search for questions related to your Actor's use case (e.g. "web scraping", "API integration"). Provide genuinely helpful answers that solve the problem, and mention your Actor as one potential solution.

### Contribute to Quora discussions

Quora answers rank well in Google and are often featured in AI-generated answers. People actively seek solutions to problems on this platform.

1. Search `site:quora.com [ACTOR NAME]` or related keywords in Google
2. Find relevant Quora threads
3. Write comprehensive, helpful answers and mention your product naturally without being salesy

Write 300-500 word answers that open with a direct response, provide context, offer 2-3 different approaches, mention your Actor as one option, and include personal experience. Use subheadings for readability. Keep tone expert but approachable.

---

## Content marketing

### Write a technical "How I built this" blog post

Developers love reading about other developers' journeys. This positions you as an expert, builds trust, and naturally promotes your Actor while providing educational value. It's great for SEO and getting indexed by AI search engines.

Share your development process, challenges you faced, and how you solved them. Post on dev.to, Medium, Hashnode, or your personal blog.

Learn more in the [Blogs and blog resources guide](/academy/actor-marketing-playbook/promote-your-actor/blogs-and-blog-resources).

### Create a "Best X" article for Medium

Medium has excellent SEO and a massive audience of professionals and developers. Publishing on Medium and submitting to relevant publications like "Better Programming" or "The Startup" can reach thousands of readers. Medium articles frequently appear in Google search results and AI-generated answers.

Write a comprehensive "Best [CATEGORY]" roundup article (1,800-2,500 words) featuring 6-8 solutions with your Actor prominently positioned. Create a Medium account if you don't have one, and publish it. Use all 5 available tags strategically (e.g. "web scraping", "APIs", "automation", "developer tools", "[your specific niche]"). Submit your article to relevant Medium publications to multiply your reach by 10x or more.

Write in first person with a conversational yet professional tone. Include pros and cons for each solution, add a comparison table, and share your genuine perspective.

<PromptButton prompt={MEDIUM_ARTICLE_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "Best X" article for dev.to

dev.to is the go-to platform for developers seeking tools and tutorials. It has a highly engaged community and strong domain authority, so your articles rank well in search engines. The community actively comments and shares, boosting visibility. dev.to content is frequently referenced by AI tools.

Write a developer-focused "Best [CATEGORY] for Developers" article (1,500-2,000 words) featuring 6-8 solutions. Create a dev.to account if needed and publish your article. Add relevant tags (up to 4 tags, e.g. #webdev, #api, #productivity, #tools). Engage with comments. The dev.to community values authentic interaction.

Write like you're advising a fellow developer: casual and helpful. Be genuinely objective about all tools, include code examples or API snippets where relevant, and use markdown formatting with H2/H3 headers.

<PromptButton prompt={DEVTO_ARTICLE_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "Best X" article for Hashnode

Hashnode is a rapidly growing developer blogging platform with excellent SEO and a clean reading experience. It's perfect for technical content with features built for developers (code highlighting, series, custom domains). Articles rank well in search results and are frequently discovered by developers. High-quality content often gets featured on Hashnode's homepage, dramatically increasing visibility.

Write a technical "Best [CATEGORY] for [SPECIFIC USE CASE]: A Developer's Guide" article (1,500-2,000 words). Create a Hashnode account if you don't have one (you can use a custom domain). Publish your article and add it to relevant Hashnode tags and communities.

Include a TL;DR section at the top, use proper heading hierarchy for auto-generated table of contents, and add code examples with proper syntax highlighting. Write with technical authority but remain accessible.

<PromptButton prompt={HASHNODE_ARTICLE_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "Best X" article for LinkedIn

LinkedIn reaches a professional, business-oriented audience including decision-makers, CTOs, product managers, and team leads who have budget and purchasing authority. LinkedIn articles have strong SEO and are shared within professional networks, multiplying your reach. Content on LinkedIn is frequently indexed by AI systems.

Write a business-focused "Best [CATEGORY] for [BUSINESS OUTCOME]" article (1,200-1,800 words) featuring 5-7 solutions. Publish it as a LinkedIn Article (use the "Write article" feature, not just a post). After publishing, share the article link in a regular LinkedIn post with a compelling intro to drive traffic.

Use a professional, authoritative but accessible tone. Focus on business impact like time savings, cost efficiency, ROI, and productivity gains rather than technical features. Include comparison tables with business-relevant metrics.

<PromptButton prompt={LINKEDIN_ARTICLE_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "How to use [Actor]" tutorial for dev.to

dev.to is the platform for developer tutorials. It has a massive, engaged community that actively searches for and shares how-to content. Tutorials rank exceptionally well in Google and are frequently referenced by AI systems when developers ask "how to" questions.

Write a step-by-step tutorial (1,200-2,000 words) showing developers how to use your Actor to achieve a specific outcome. Create a dev.to account if you don't have one, then publish your article with up to 4 relevant tags (e.g. #tutorial, #webdev, #api, #automation).

Structure: Introduction with hook, prerequisites, what they'll achieve, step-by-step guide (access the Actor, configure inputs, run it, view results, download data), understanding results, pro tips, troubleshooting, and next steps. Write like you're helping a friend get started.

<PromptButton prompt={DEVTO_TUTORIAL_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "How to use [Actor]" tutorial for Hashnode

Hashnode is perfect for comprehensive technical tutorials with a clean reading experience. It has excellent SEO, strong domain authority, and a growing developer community. The platform is built for technical writing with great code formatting and features like table of contents auto-generation.

Write a comprehensive "Complete Guide: How to [ACHIEVE OUTCOME] Using [YOUR ACTOR NAME]" tutorial (1,800-2,500 words). Sign up for Hashnode if you haven't already. Publish your article and add it to relevant tags.

Include a TL;DR section, detailed step-by-step walkthrough with screenshots, API integration examples with code blocks, advanced usage patterns, troubleshooting guide, and best practices. Write with technical authority, but be thorough and maintain clarity.

<PromptButton prompt={HASHNODE_TUTORIAL_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "How to use [Actor]" tutorial for Medium

Medium reaches a broader, less technical audience. It's perfect for tutorials that appeal to marketers, entrepreneurs, product managers, no-code users, or less technical users. Medium's strong SEO means your tutorial can rank for years. Submitting to publications like "Better Programming", "The Startup", or "UX Collective" can reach tens of thousands of readers.

Write an accessible, engaging tutorial "How I [ACHIEVED OUTCOME] in Minutes Using [YOUR ACTOR] (Step-by-Step)" (1,500-2,200 words). Create or log into your Medium account, then publish the article. Use all 5 available tags strategically.

Take a story-driven approach with personal context. Write in first person, use simple jargon-free language, and make readers feel "I can do this too." Focus on the outcome and value, not technical complexity.

<PromptButton prompt={MEDIUM_TUTORIAL_PROMPT} title="Use pre-built prompt for your AI assistant" />

### Create a "How to use [Actor]" tutorial for LinkedIn

LinkedIn tutorials reach professionals, decision-makers, and business users who value productivity and efficiency. LinkedIn articles have strong SEO and professional credibility. They're perfect for tutorials focused on business outcomes, time-saving, or solving professional challenges.

Write a professional "How to [ACHIEVE BUSINESS OUTCOME] in [TIME] Using [YOUR ACTOR]: A Professional Guide" tutorial (1,400-2,000 words). Publish it as a LinkedIn Article using the "Write article" feature. After publishing, share the article in a regular LinkedIn post with an engaging business-focused intro.

Use professional, consultative tone focused on business value. Emphasize time savings, efficiency, and ROI. Include sections on business case, measuring success, professional best practices, and real-world business applications. Address common professional questions about security, cost, reliability, and team adoption.

<PromptButton prompt={LINKEDIN_TUTORIAL_PROMPT} title="Use pre-built prompt for your AI assistant" />

---

## GitHub and developer resources

### Create a GitHub repository with examples

GitHub repos rank well in search and are developer-friendly. A repo with usage examples, tutorials, or integration guides makes it easier for others to adopt and reference your Actor.

Create a GitHub repo with code examples, integration guides, or sample projects using your Actor. Include a comprehensive README with use cases, code snippets, and links to your Actor.

Your README should include: project title with badges, short description, key features, quick start guide, installation and setup instructions, usage examples with code snippets, use cases section, configuration options, common questions and troubleshooting, links to Apify Store and documentation, contributing guidelines, and license.

<PromptButton prompt={GITHUB_README_PROMPT} title="Use pre-built prompt for your AI assistant" />

---

## Quick wins

Simple actions you can take right now with minimal effort but immediate impact:

- Share your launch on your personal social media accounts (Twitter, LinkedIn, Facebook)
- Post about your new Actor on your personal website or blog
- Ask friends and colleagues to share
- Update your email signature to mention your Actor
- Add the Actor to your portfolio if you're a freelancer on UpWork or Fiverr

### Create a content hub

Create a free Notion page or GitHub README that lists all your Actors and content with links. Share this hub in your Actor description, social profiles, and email signature. This becomes your content portfolio and makes it easy for people to find all your work.
