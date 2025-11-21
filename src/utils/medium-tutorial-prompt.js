export const MEDIUM_TUTORIAL_PROMPT = `Create an accessible, engaging tutorial showing readers how to use my Apify Actor to achieve [SPECIFIC OUTCOME], optimized for Medium's broader audience.

Tutorial requirements:
- Title: "How I [ACHIEVED OUTCOME] in Minutes Using [YOUR ACTOR] (Step-by-Step)" (personal, outcome-focused)
- Word count: 1,500-2,200 words (Medium readers prefer narrative, engaging content)
- Story-driven approach with personal context
- Clear, visual step-by-step instructions anyone can follow
- Focus on the outcome and value, not technical complexity
- Conversational, warm, and encouraging tone
- Emphasize "no coding required" if applicable
- Include real results and tangible benefits

Your Actor details:
- Actor name: [YOUR ACTOR NAME]
- Actor URL: [YOUR APIFY STORE URL]
- Actor README: [PASTE RELEVANT SECTIONS OF YOUR README]
- What it does in simple terms: [NON-TECHNICAL DESCRIPTION]
- Main benefit/outcome: [WHAT USERS ACHIEVE]
- Who it's for: [TARGET USERS - BE BROAD]
- Real-world use case: [RELATABLE PROBLEM IT SOLVES]

Content structure:
1. Compelling introduction with a hook (200-300 words):
   - Start with a relatable problem or personal story
   - Your experience facing this challenge
   - Traditional approaches and why they fail
   - The "aha moment" discovering this solution
   - What readers will learn and achieve
   - Make it personal and engaging

2. "Why I needed this solution" (150-200 words):
   - Paint the picture of your challenge
   - Time wasted with manual approaches
   - Impact on your work or business
   - What you were looking for in a solution
   - Why this Actor was the answer

3. "What you'll need" (100-150 words):
   - Free Apify account (very simple to create)
   - Time required (be specific: "about 10 minutes")
   - No technical skills required (reassure them)
   - Optional: What you'll do with the data afterward
   - Total cost: Free tier or pricing info

4. "What you'll accomplish" (100-150 words):
   - Clear picture of the end result
   - What data or outcome they'll get
   - Real-world value of this outcome
   - Personal example of how you used it

5. Step-by-step guide (1,000-1,300 words):
   Format as a clear journey with personal insights:

   Step 1: Get started with [YOUR ACTOR NAME]
   - "First, head over to the [Actor Name] page..."
   - Creating your free account (use email or GitHub - super easy)
   - What Apify Console is (explain simply: "your workspace")
   - What you'll see when you land there
   - Personal note: "Don't worry, it's much simpler than it looks!"
   - Screenshot description: Actor page, sign-up flow

   Step 2: Tell the tool what you want
   - Explain the main input in simple, non-technical terms
   - Provide a real example you used (from README)
   - "For example, I entered '[YOUR EXAMPLE]' and here's why..."
   - Explain what the Actor will do with this information
   - Different approaches if Actor has multiple input options
   - Keep it conversational: "Think of it like telling a smart assistant..."
   - Screenshot description: Input form with your example filled in
   - Personal tip: What worked best for you

   Step 3: Fine-tune your settings (optional)
   - "Here's where you can get more specific..."
   - Explain optional settings in plain language
   - When and why you might use them
   - Your personal configuration and why
   - "Honestly, the defaults work great for most people"
   - Screenshot description: Advanced settings (if applicable)

   Step 4: Add extra features (if you want)
   - Explain any enrichment features from README in simple terms
   - What additional information they provide
   - Real-world example of how this helps
   - "I added [feature] because..."
   - When it's worth the extra cost (if applicable)

   Step 5: Hit the Start button
   - "This is the exciting part..."
   - What happens when you click Start
   - How long to expect (be specific)
   - You can close your browser and come back
   - What's happening behind the scenes (simple explanation)
   - Personal note: "I grabbed a coffee while it worked its magic"
   - Screenshot description: Run status page

   Step 6: Check out your results
   - "Once it's done, here's how to see your data..."
   - Navigate to Results or Storage tab
   - What the data looks like
   - "I was amazed at how much information I got"
   - Explain what the key information means
   - Personal reaction to first seeing results
   - Screenshot description: Results page with data preview

   Step 7: Download and use your data
   - Different formats available (CSV, Excel, JSON)
   - Which format to choose and why
   - "I downloaded mine as Excel because..."
   - How to select just what you need
   - What you can do with this data now
   - Screenshot description: Export options

   Each step should:
   - Feel conversational and supportive
   - Include your personal experience or tip
   - Anticipate questions or concerns
   - Be encouraging: "You've got this!"
   - Use analogies to explain technical concepts

6. "The results that surprised me" (200-250 words):
   - What you actually got (specific examples)
   - Time saved compared to manual work
   - Quality or completeness of data
   - Unexpected benefits you discovered
   - How you used the data
   - Real impact on your work/project
   - Specific metrics: "It would have taken me 8 hours manually"

7. "Tips I learned along the way" (150-200 words):
   - 3-5 practical tips from your experience
   - Mistakes you made so readers can avoid them
   - How to get even better results
   - Creative uses you discovered
   - Time-saving shortcuts

8. "What I built with this data" (100-150 words):
   - How you actually used the results
   - The outcome or project you created
   - Why it mattered for your goal
   - Inspiration for readers' use cases

9. Conclusion (100-150 words):
   - Recap the transformation (before/after)
   - Encourage readers to try it themselves
   - It's easier than they think
   - What they could accomplish
   - Clear call-to-action
   - Invitation to share their results

Writing guidelines:
- Write in first person - tell YOUR story
- Use "you" to directly address and encourage readers
- Be warm, personable, and supportive
- Share genuine reactions and emotions
- Use simple, jargon-free language
- When technical terms are necessary, explain them simply
- Short paragraphs (2-3 sentences) for mobile reading
- Use subheadings liberally for scannability
- Include transitional phrases
- Write like you're helping a friend
- Show enthusiasm without being salesy

Storytelling elements:
- Include your personal "why"
- Share the before/after transformation
- Use specific details and examples
- Create emotional connection
- Show vulnerability (challenges you faced)
- Celebrate the win at the end
- Make readers feel "I can do this too"

Accessibility:
- Assume zero technical background
- Explain every acronym or technical term
- Use analogies: "It's like having a research assistant"
- Break down complex steps into micro-steps
- Anticipate anxiety: "Don't worry if you've never..."
- Be reassuring throughout
- Emphasize simplicity and ease

Visual guidance:
- Suggest 5-7 screenshots with detailed descriptions
- Describe what readers should look for in each image
- Include arrows or highlights (in description)
- Show the complete visual journey
- Before/after comparisons if possible

Actor-specific details:
- Use actual field names but explain them simply
- Reference features from README in accessible language
- Include your real configuration as an example
- Show real output/results (anonymized if needed)
- Mention pricing honestly and simply
- Link to Actor naturally in the text

SEO optimization:
- Use "how to [achieve outcome]" or "how I [achieved outcome]" 5-7 times
- Include related terms: "step by step," "tutorial," "guide," "easy way"
- Use Actor name 5-8 times naturally
- Include outcome keywords: "automate," "extract data," "save time"
- Front-load keywords in title and opening paragraphs

Medium-specific elements:
- Suggest 5 strategic tags (e.g., "productivity," "automation," "tutorial," "data," "entrepreneurship")
- Write compelling subtitle (under 140 characters) for under the title
- Create hook opening sentence that grabs attention
- Use bold text sparingly for key takeaways or important points
- Suggest 2-3 Medium publications to submit to (Better Programming, The Startup, etc.)
- Add ending note: "👏 If this helped you, please clap and follow for more tutorials!"
- Include brief author bio at end (2-3 sentences, personal and relatable)

Engagement elements:
- Ask rhetorical questions to maintain engagement
- Use "Pro tip:" or "Note:" callouts
- Add personality and light humor where natural
- Share honest reactions: "I couldn't believe how fast..."
- Encourage readers: "You're doing great!"
- End with inspiring call-to-action

Please generate the complete tutorial now with engaging narrative structure, clear visual steps, and personal voice that makes Medium readers feel confident they can achieve the same results.`;
