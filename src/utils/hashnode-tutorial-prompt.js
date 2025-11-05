export const HASHNODE_TUTORIAL_PROMPT = `Create a comprehensive technical tutorial showing developers how to use my Apify Actor to achieve [SPECIFIC OUTCOME], optimized for Hashnode's technical audience.

Tutorial requirements:
- Title: "Complete Guide: How to [ACHIEVE OUTCOME] Using [YOUR ACTOR NAME]" (comprehensive angle)
- Word count: 1,800-2,500 words (Hashnode readers appreciate thorough, detailed content)
- Detailed step-by-step walkthrough of using the Actor
- Include technical explanations and best practices
- Multiple screenshots and visual guidance
- Professional, technical but accessible tone
- Include advanced usage and API integration examples

Your Actor details:
- Actor name: [YOUR ACTOR NAME]
- Actor URL: [YOUR APIFY STORE URL]
- Actor README: [PASTE YOUR ACTOR'S README OR KEY SECTIONS]
- Technical capabilities: [WHAT IT DOES TECHNICALLY]
- Main use case: [PRIMARY PROBLEM IT SOLVES]
- Output format and structure: [DATA FORMAT DETAILS]

Content structure:
1. Introduction (150-200 words):
   - What this tutorial covers
   - The use case and why it matters
   - What readers will accomplish
   - Technical prerequisites (minimal)
   - Estimated time to complete

2. TL;DR section (100 words):
   - Quick summary: "In this tutorial, you'll learn to..."
   - Key steps overview
   - Link to Actor
   - Expected outcome

3. Prerequisites and setup (100-150 words):
   - Apify account (free tier works)
   - How to sign up (email or GitHub)
   - What is Apify Console (brief explanation)
   - Any other requirements
   - Link to Apify documentation

4. Understanding [YOUR ACTOR] (150-200 words):
   - What the Actor does (technical overview)
   - How it works behind the scenes
   - Key capabilities and features
   - Use cases and applications
   - Advantages over alternatives
   - Limitations to be aware of

5. Step-by-step guide to using [YOUR ACTOR]:

   Step 1: Accessing the Actor
   - Navigate to the [Actor Name] page on Apify Store
   - Create account or sign in
   - Understanding the Actor page (features, pricing, reviews)
   - Click the "Try for free" button
   - What happens: Redirect to Apify Console
   - Screenshot: Actor Store page and Console

   Step 2: Configuring input parameters
   - Overview of the input form/configuration
   - Explanation of each input field based on README:
     Primary input field (purpose, format, examples)
     Location or context fields (if applicable)
     Optional parameters and when to use them
   - Provide 2-3 complete example configurations
   - Screenshot: Input configuration with examples filled in
   - Best practices for input configuration

   Step 3: Advanced configuration (if applicable)
   - Advanced settings and options from README
   - When and why to use advanced features
   - Performance vs. thoroughness trade-offs
   - Cost optimization tips
   - Example: Different configurations for different use cases
   - Screenshot: Advanced settings panel

   Step 4: Optional enrichment features
   - Explanation of any enrichment add-ons (from README)
   - What additional data they provide
   - Pricing tier considerations
   - When to use enrichment features
   - How to enable and configure them
   - Example use cases for enriched data

   Step 5: Running the Actor
   - Click "Start" or "Run" button
   - Understanding the run lifecycle (Running → Succeeded/Failed)
   - What to expect: timing, resource usage
   - How to monitor the run (logs, status)
   - Can you close the browser? (Yes, runs continue)
   - Screenshot: Run status page

   Step 6: Examining the results
   - Navigate to Storage or Results tab
   - Understanding the data structure
   - Explanation of output fields (from README)
   - Preview the dataset in Console
   - How data is organized
   - Data quality and completeness
   - Screenshot: Results preview with annotations

   Step 7: Downloading and exporting data
   - Export options (JSON, CSV, Excel, XML, RSS)
   - How to select specific fields or data subsets
   - Download vs. API access
   - Best format for your use case
   - Screenshot: Export options dialog

   [Add more steps if your Actor has additional features or workflows]

6. Working with the API (200-300 words):
   - How to run the Actor via API
   - Code example: Starting a run (JavaScript/Python)
   - Code example: Retrieving results
   - Authentication and API tokens
   - Webhook integration possibilities
   - Scheduling and automation
   - Error handling
   - Rate limits and best practices

7. Advanced usage patterns (200-250 words):
   - Batch processing multiple queries
   - Integrating with other tools (Zapier, Make, etc.)
   - Setting up scheduled runs
   - Monitoring and alerting
   - Cost optimization strategies
   - Scaling considerations

8. Understanding your data (150-200 words):
   - Detailed explanation of output fields
   - How to interpret the results
   - Data quality indicators
   - Common data patterns
   - Example analysis or use case

9. Troubleshooting guide (150-200 words):
   - Common errors and solutions
   - How to read logs
   - Performance issues
   - Data quality problems
   - Where to get help (Apify Discord, support)

10. Best practices (100-150 words):
    - Configuration tips
    - Cost efficiency
    - Data freshness considerations
    - Rate limiting and politeness
    - Error handling

11. Conclusion and next steps (100 words):
    - Recap what was accomplished
    - Additional resources
    - Link to Actor documentation
    - Invitation to connect or ask questions

Writing guidelines:
- Write with technical authority
- Be thorough but maintain clarity
- Use proper H2 (##) and H3 (###) markdown headers
- Include inline code formatting for field names and buttons
- Use code blocks for API examples with proper syntax highlighting
- Keep paragraphs focused (4-6 sentences)
- Add visual suggestions throughout
- Link to relevant Apify documentation

Actor-specific details:
- Use exact field names from your Actor's input schema
- Reference all features mentioned in README
- Include actual example inputs with expected outputs
- Explain any technical constraints or limitations
- Mention supported data sources or formats
- Discuss performance characteristics
- Include pricing considerations if relevant

Screenshot guidance:
- Suggest 6-8 specific screenshots with descriptions
- Annotate what users should focus on
- Show the complete workflow visually
- Include before/after or input/output examples
- Suggest callouts or highlights for important UI elements

Code examples (if including API usage):
- Provide working code samples
- Include error handling
- Add comments explaining key parts
- Show both async and sync patterns if applicable
- Use realistic variable names
- Format: \`\`\`javascript or \`\`\`python

SEO optimization:
- Use "how to [achieve outcome]" naturally 4-6 times
- Include "[Actor name] tutorial", "complete guide to [Actor]"
- Use technical keywords related to your domain
- Include "Apify Actor" 4-6 times naturally
- Use semantic keywords in subheadings

Hashnode-specific elements:
- Suggest 5-6 relevant tags (technical and general)
- Write compelling subtitle/meta description (under 160 characters)
- Suggest professional cover image concept
- Note: "Use H2/H3 headers for auto-generated table of contents"
- Include author bio at end (your expertise with Apify/this domain)
- Add call-to-action: "Try [Actor Name] yourself and let me know what you build!"
- Suggest if this could be part of a series

Additional elements:
- Include a "Resources" section with relevant links
- Link to Actor documentation, Apify docs, related tutorials
- Consider adding a "What's next?" section with related topics
- Mention community resources (Apify Discord, forum)

Please generate the complete tutorial now in markdown format, based on the Actor's README, with comprehensive steps that guide users through the entire process including basic usage, advanced features, and API integration.`;
