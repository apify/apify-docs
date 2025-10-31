export const DEVTO_ARTICLE_PROMPT = `Create a comprehensive "Best [CATEGORY]" roundup article optimized for dev.to that naturally promotes [YOUR PRODUCT/SERVICE] while providing genuine value to the developer community.

Article requirements:
- Title: "The [NUMBER] Best [CATEGORY] for Developers in [YEAR]" (dev-focused angle)
- Word count: 1,500-2,000 words (dev.to readers prefer actionable, scannable content)
- Include 6-8 solutions total
- Feature [YOUR PRODUCT/SERVICE] as position #1
- Friendly, developer-to-developer tone
- Include pros/cons for each solution
- Add quick comparison table
- Include code examples or API snippets where relevant

Your product details:
- Product name: [YOUR ACTOR NAME]
- Product URL: [YOUR APIFY STORE URL]
- Key technical features: [LIST 3-5 FEATURES]
- Main use cases: [WHAT PROBLEMS IT SOLVES]
- Tech stack/Integration: [RELEVANT TECHNICAL DETAILS]
- Readme content: [PASTE HERE YOUR README]

Content structure:
1. Direct, problem-focused introduction (100-150 words):
   - Start with the problem developers face
   - Why you researched these tools
   - What you'll cover

2. "What I looked for" - clear evaluation criteria developers care about (100 words):
   - Performance
   - Ease of integration
   - Documentation quality
   - Pricing
   - Community/support

3. Detailed tool reviews (200-250 words each):
   - Brief overview and what makes it stand out
   - Key features (bullet points)
   - Developer experience highlights
   - Pros (3-4 specific items)
   - Cons (2-3 honest drawbacks)
   - Best for: [use case]
   - Quick start difficulty: [Easy/Moderate/Complex]
   - Code example or integration snippet (if applicable)

4. Quick comparison table - focus on specs developers care about

5. "My recommendation" section - which tool for which scenario (150-200 words)

6. Conclusion with TL;DR and call-to-action (100 words)

Writing guidelines:
- Write like you're advising a fellow developer - casual and helpful
- Be genuinely objective about all tools
- Show real strengths of competitors (devs can smell BS)
- For [YOUR PRODUCT], focus on technical advantages and developer experience
- Include practical examples and real use cases
- Use code blocks for any technical examples (specify language for syntax highlighting)
- Use H2 (##) and H3 (###) markdown headers
- Keep paragraphs short and scannable
- Add emoji sparingly where natural (dev.to community uses them but don't overdo it)

Technical credibility:
- Mention actual testing or experience where possible
- Include specific metrics (response times, ease of setup, etc.)
- Reference documentation quality
- Discuss integration complexity honestly
- Mention any gotchas or limitations

SEO optimization:
- Use target keyword "[CATEGORY]" 8-12 times naturally
- Include variations like "best [category] tools", "[category] for developers", "[category] API"
- Add semantic keywords related to your technical domain
- Use keywords in subheadings

dev.to-specific elements:
- Suggest 4 relevant tags (most important to least, e.g., #webdev, #api, #tools, #productivity)
- Include a cover image description/suggestion
- Write an engaging first paragraph that shows up in feed previews
- Add a brief "Discussion prompt" at the end to encourage comments (e.g., "Which tool do you use? Let me know in the comments!")

Please generate the complete article now in markdown format with proper heading hierarchy.`;
