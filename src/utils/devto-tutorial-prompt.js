export const DEVTO_TUTORIAL_PROMPT = `Create a step-by-step tutorial showing developers how to use my Apify Actor to achieve [SPECIFIC OUTCOME], optimized for dev.to.

Tutorial Requirements:
- Title: "How to [ACHIEVE SPECIFIC OUTCOME] with [YOUR ACTOR NAME]" (clear, action-oriented)
- Word count: 1,200-2,000 words (thorough but scannable)
- Step-by-step format walking through using the Actor
- Include screenshots suggestions and what users will see
- Conversational, developer-to-developer tone
- Focus on practical usage and configuration
- Include tips and optional features

Your Actor details:
- Actor name: [YOUR ACTOR NAME]
- Actor URL: [YOUR APIFY STORE URL]
- Actor README: [PASTE YOUR ACTOR'S README OR KEY SECTIONS]
- Main use case: [WHAT PROBLEM IT SOLVES]
- Key features: [LIST 3-5 MAIN FEATURES]
- Output format: [WHAT DATA/RESULTS USERS GET]

Content structure:
1. Introduction (100-150 words):
   - Hook: Start with what readers will accomplish
   - Why this Actor is useful/who it's for
   - What they'll learn by the end
   - Time estimate (e.g., "⏱️ This takes about 10 minutes")

2. Prerequisites (50-100 words):
   - Free Apify account (mention you can sign up with email or GitHub)
   - Any other requirements
   - No coding required (if applicable)

3. "What you'll achieve" overview (100-150 words):
   - Brief description of the end result
   - What data or outcome they'll get
   - Example use case

4. Step-by-step tutorial using the Actor:

   Step 1: Access [YOUR ACTOR NAME]
   - Instructions: "Go to the [Actor Name] page on Apify Store to try it for free."
   - Mention account creation (email or GitHub)
   - Explain they'll be redirected to Apify Console
   - What to expect: "You'll see the Actor's input configuration page"
   - Screenshot suggestion: Actor page or Console view

   Step 2: Configure [Primary Input/Settings]
   - Explain the main input field(s) based on your README
   - Provide specific examples (like "bagel" and "New York")
   - Explain what the Actor will do with this input
   - Show different options if your Actor has multiple input methods
   - Tips for getting better results
   - Screenshot suggestion: Input configuration

   Step 3: [Additional Configuration - if applicable]
   - Explain optional settings or advanced features
   - When and why to use each option
   - Examples of different configurations
   - Best practices from your experience
   - Screenshot suggestion: Advanced settings panel

   Step 4: Run the Actor
   - Click "Start" or "Run" button
   - What happens: Status changes to "Running"
   - How long it typically takes
   - What's happening behind the scenes (briefly)
   - "⚠️ Tip: You can leave the page and come back - the run will continue"

   Step 5: View and download results
   - Navigate to Storage tab or Results
   - Preview the data
   - Explain the data structure/fields
   - Available export formats (JSON, CSV, Excel, etc.)
   - How to filter or select specific data
   - Screenshot suggestion: Results page with data

   [Add more steps if your Actor has additional features]

5. "Understanding your results" (150-200 words):
   - Explain what each key field means
   - How to interpret the data
   - Example of actual output
   - Common questions about results

6. "Pro tips and advanced usage" (150-200 words):
   - 3-5 tips for getting better results
   - How to optimize for speed or cost
   - Advanced configuration options
   - Integration possibilities (API, webhooks, etc.)
   - Common use cases from users

7. "Troubleshooting common issues" (100-150 words):
   - 2-3 common problems and solutions
   - Where to check for errors
   - How to get support

8. "Next steps" (50-100 words):
   - How to automate or schedule runs
   - Integration ideas
   - Link to documentation
   - Encouragement to experiment

Writing guidelines:
- Write like you're helping a friend get started
- Use "we" and "let's" language
- Be encouraging and supportive
- Explain what users will see at each step
- Use bullet points for options or lists
- Include emoji sparingly for visual breaks (✅, 🚀, ⚠️, 💡)
- Format Actor/button names in bold
- Use > quote blocks for important notes
- Keep paragraphs short and scannable

Screenshot guidance:
- Suggest specific screenshots for each major step
- Describe what should be visible in each screenshot
- Example: "Screenshot showing the input form with 'bagel' entered in search field"
- Mention UI elements to highlight (buttons, fields, tabs)

Actor-specific details:
- Use actual field names from your Actor's input schema
- Reference specific features from your README
- Include real example inputs that work well
- Mention any enrichment features or add-ons
- Explain pricing tier differences if relevant
- Link to Actor documentation for deep dives

SEO optimization:
- Use "how to [achieve outcome]" in title and 3-5 times in content
- Include "[Actor name] tutorial", "[Actor name] guide"
- Use problem-related keywords (what your Actor solves)
- Mention "Apify" 3-5 times naturally

dev.to-specific elements:
- Suggest 4 tags (e.g., #tutorial, #automation, #webscraping, #api)
- Write a compelling first paragraph for feed preview
- Include a discussion prompt at end: "What are you planning to scrape? Drop a comment! 💬"
- Suggest a cover image concept (your Actor in action or logo)
- Add liquid tag suggestions if relevant ({% link %}, {% github %})

Please generate the complete tutorial now in markdown format, based on the Actor's README, with clear steps that walk users through the entire process from accessing the Actor to downloading results.`;
