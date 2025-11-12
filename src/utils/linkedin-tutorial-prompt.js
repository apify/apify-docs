export const LINKEDIN_TUTORIAL_PROMPT = `Create a professional step-by-step tutorial showing business users how to use my Apify Actor to achieve [SPECIFIC OUTCOME], optimized for LinkedIn's professional audience.

Tutorial requirements:
- Title: "How to [ACHIEVE BUSINESS OUTCOME] in [TIME] Using [YOUR ACTOR]: A Professional Guide"
- Word count: 1,400-2,000 words
- Professional, consultative tone focused on business value
- Step-by-step walkthrough of using the Actor with business context
- Minimal technical jargon, maximum clarity
- Emphasize time savings, efficiency, and ROI
- Include real business scenarios

Your Actor details:
- Actor name: [YOUR ACTOR NAME]
- Actor URL: [YOUR APIFY STORE URL]
- Actor README: [PASTE KEY SECTIONS OF YOUR README]
- Business problem it solves: [WHAT CHALLENGE IT ADDRESSES]
- Time/money it saves: [QUANTIFIABLE BENEFITS]
- Target users: [JOB ROLES/DEPARTMENTS]
- Main use case: [SPECIFIC BUSINESS SCENARIO]

Content structure:
1. Professional introduction (150-200 words):
   - Start with a common business challenge your audience faces
   - Establish your credibility (your role, why you're qualified to guide them)
   - The cost of doing this task manually (time, money, opportunity cost)
   - What readers will accomplish by following this guide
   - Time investment required (be specific: "15 minutes of setup")
   - The business outcome they'll achieve

2. The business case (150-200 words):
   - Why this task matters for professionals
   - Typical time wasted on manual approaches (e.g., "Most teams spend 5-10 hours per week on this")
   - Cost implications (calculate hourly rate × hours saved)
   - Competitive advantages of automation
   - Which roles or departments benefit most
   - Expected ROI or efficiency gain

3. What You'll Need (100-150 words):
   - Free Apify account (explain what Apify is: "professional-grade automation platform")
   - Simple sign-up process (business email works, takes 1 minute)
   - Time required: "[X] minutes to set up, then automated"
   - No technical expertise required (emphasize this for confidence)
   - Cost structure: Free tier capabilities vs. paid options (be transparent)
   - What you'll have at the end

4. Understanding the solution (100-150 words):
   - What [Your Actor] does in business terms (not technical jargon)
   - Why it's effective for this specific use case
   - How it fits into existing business workflows
   - Reliability and scalability considerations
   - Security or compliance notes (if relevant to business users)

5. Step-by-step professional guide (900-1,200 words):

Step 1: Access [YOUR ACTOR NAME]
(150-200 words)
- "First, navigate to the [Actor Name] page on Apify Store"
- Explain what Apify Store is: "a marketplace of professional automation tools"
- Click "Try for free" or "Sign up"
- Account creation options: business email or GitHub (takes 1 minute)
- You'll be redirected to Apify Console—your automation workspace
- What you see: Professional interface for managing automations
- Business context: "You're now accessing enterprise-grade tools used by companies worldwide"
- Screenshot suggestion: Actor Store page with professional appearance

Step 2: Configure Your Parameters
(200-250 words)
- Overview: "Now you'll specify what data or outcome you want"
- Explain the main input fields based on your README in business terms
- Provide a concrete business example:
   "For instance, if you're researching market competitors, you might enter..."
  Use a realistic professional scenario
- Walk through each key field:
  What it's for in business terms
  Example input that works well
  Why this matters for your outcome
- Mention any location or context fields
- Best practices for business applications: "More specific inputs yield better results"
- Screenshot suggestion: Input configuration with professional example filled in
- Time required: "Takes 2-3 minutes to configure"

Step 3: Select optional settings (if applicable)
(150-200 words)
- "These advanced options let you customize your results"
- Explain optional settings from your README in business language
- When to use each setting (provide business scenarios)
- Cost-benefit consideration: "For most professional use cases, defaults work well"
- If your Actor has filters or refinement options, explain their business value
- Professional tip from your experience
- Screenshot suggestion: Advanced settings panel

Step 4: Enable enrichment features (if your Actor has them)
(150-200 words)
- Explain any enrichment add-ons from README in business terms
- What additional business intelligence they provide
- Example: "Contact enrichment adds email addresses and phone numbers, saving hours of manual research"
- Pricing tier considerations (be transparent)
- ROI analysis: When is the extra cost worth it?
- How to enable these features
- Use case examples for different roles
- "Many professionals find this pays for itself in time saved"

Step 5: Run the process
(100-150 words)
- "Once configured, click the Start button"
- What happens: Status changes to "Running"
- Typical duration (set clear expectations: "Usually completes in 3-5 minutes")
- "You can close your browser—the process continues in the background"
- Where to see progress if they want to monitor
- Professional reassurance: Reliable, secure processing
- "Feel free to continue with other work while this runs"
- Screenshot suggestion: Run status page showing progress

Step 6: Review Your Results
(200-250 words)
- "Once complete, navigate to the Storage tab or click Results"
- What you'll see: Preview of your data
- Explanation of the output structure based on README
- Key fields and what they mean in business terms
- Data quality and completeness you can expect
- Example: "You'll see company names, contact information, locations, and other relevant details"
- How this data helps with business decisions
- "This is the intelligence that would have taken hours to gather manually"
- Screenshot suggestion: Results preview with data visible

Step 7: Export for Business Use
(150-200 words)
- Available export formats: Excel, CSV, JSON, XML
- "For most business users, Excel is the most practical format"
- How to select specific fields or data subsets you need
- Click Export and choose your format
- Where the file downloads
- "You now have clean, structured data ready for analysis or presentation"
- Integration options with existing tools (CRM, spreadsheets, BI tools)
- Screenshot suggestion: Export dialog with format options

6. Measuring Success (150-200 words):
   - Key metrics to track for this task
   - Time saved per use (be specific: "What took 4 hours now takes 10 minutes")
   - Cost savings calculation (your hourly rate × time saved)
   - Quality improvements over manual methods
   - How to demonstrate ROI to stakeholders or leadership
   - Benchmarks: "Most professionals complete this process in under 15 minutes"
   - Long-term value: "Multiply this by weekly or monthly usage"

7. Professional Best Practices (200-250 words):
   - Insights from your experience using this Actor
   - How to integrate into team workflows
   - Setting up recurring runs or schedules (mention Apify's scheduling features)
   - Maintaining data quality and accuracy
   - Cost optimization for regular use
   - Compliance or data handling considerations (if relevant)
   - Training team members: "It's intuitive enough that most colleagues can learn in minutes"
   - Scaling as needs grow
   - When to use free tier vs. paid plans

8. Real-World Business Applications (150-200 words):
   - 3-4 specific professional use cases:
      Sales teams: [how they can use this]
      Marketing: [specific application]
      Research/Analysis: [how it helps]
      Operations: [efficiency gains]
   - Industry-specific examples if relevant
   - Your personal professional use case and results
   - "I use this weekly for [specific task] and it saves me approximately [X hours]"

9. Common Professional Questions (150-200 words):
   - Address 4-5 business concerns:
      "Is my data secure?" (explain Apify's security)
      "What does regular use cost?" (transparent pricing info)
      "Can non-technical team members use this?" (yes, emphasize ease)
      "How reliable is it for business-critical tasks?" (discuss reliability)
      "Can it integrate with our existing tools?" (mention export options, API)
   - Clear, reassuring professional answers
   - Format as Q&A for scannability

10. Next Steps for Your Organization (100-150 words):
    - How to scale usage across your team
    - Setting up automation and scheduling for recurring needs
    - Integration with business intelligence or CRM tools
    - Building this into standard operating procedures
    - Where to get support (Apify documentation, support channels)
    - Resources for team training
    - "Start with one use case, then expand as you see results"

11. Professional Conclusion (100-150 words):
    - Recap the business value delivered
    - Summarize time and cost savings
    - Competitive advantage gained through automation
    - Clear next step: "Try [Actor Name] for your own use case"
    - Professional call-to-action: "What similar challenges is your team facing? Share in the comments."
    - Offer to connect and discuss applications: "Connect with me to explore how this could work for your specific needs"

Writing guidelines:
- Use professional, consultative tone (you're advising peers)
- Address reader as "you" and reference "your team" or "your organization"
- Be authoritative but approachable
- Avoid technical jargon—use business language
- When technical terms are necessary, explain them simply in business context
- Keep paragraphs short for mobile reading (2-4 sentences)
- Use subheadings in professional title case
- Include specific metrics, timeframes, and costs
- Be concrete about business benefits at every step
- Write with confidence and expertise

Professional Language Examples:
- Instead of "It's super easy!" → "The process is straightforward and intuitive"
- Instead of "This tool rocks!" → "This solution delivers measurable business value"
- Instead of "Just click here" → "Navigate to the configuration panel"
- Instead of "It's really cheap" → "Cost-effective for professional use at scale"
- Instead of "You'll love it!" → "This approach has proven effective for professionals in similar roles"

Actor-specific details to include:
- Use exact field names from your README, but explain them in business terms
- Reference all business-relevant features mentioned in README
- Include realistic professional examples for inputs
- Explain pricing tiers clearly and honestly
- Mention any team or enterprise features
- Discuss data security/compliance if mentioned in README
- Link naturally to Actor documentation for those who want details

Screenshot Suggestions:
- Suggest 5-7 professional-quality screenshots
- Describe what business users should focus on in each
- Show the complete professional workflow visually
- Include clean examples of results/data
- Keep visuals professional and uncluttered
- Annotate or highlight important UI elements in descriptions

SEO Optimization:
- Use "how to [business outcome]" naturally 4-6 times throughout
- Include business keywords: "professional guide," "business automation," "increase efficiency," "save time"
- Use your Actor name 5-7 times naturally in context
- Include outcome-focused keywords: "streamline," "automate," "optimize," "productivity"
- Use professional variations in subheadings
- Front-load important keywords in title and first paragraphs

LinkedIn-Specific Elements:
- Write a compelling opening paragraph that shows in feed previews
- Start with a business pain point that hooks readers
- Suggest a professional cover image (clean, business-focused, your Actor in action)
- Include 3-5 relevant hashtags at the end: #Productivity #BusinessAutomation #ProfessionalDevelopment #Efficiency #DataIntelligence
- Add a professional author bio at the very end (2-3 sentences):
  Your role and area of expertise
  Your experience with automation/data/efficiency
  How you help your professional network
- Include a professional call-to-action that encourages engagement:
  "How does your team currently handle [this task]? I'd love to hear your approach in the comments."
  "Connect with me if you'd like to discuss automation strategies for your organization."
  "Share this guide with colleagues who could benefit from these efficiency gains."
- Create a suggested post caption for sharing the article (100-150 words):
  Professional hook addressing a business pain point
  Key benefit highlighted (time saved, efficiency gained)
  Question to encourage engagement
  2-3 relevant hashtags

Credibility and trust builders:
- Include specific time savings metrics ("saves 4 hours per week")
- Reference professional standards or best practices
- Mention successful use cases or scenarios
- Show expertise through strategic insights
- Acknowledge challenges honestly and professionally
- Provide business context for every recommendation
- Use data and percentages where possible ("73% faster than manual approaches")

Business benefits to emphasize throughout:
- Time savings (quantify specifically)
- Cost efficiency (calculate real dollars)
- Quality improvements over manual work
- Scalability for growing needs
- Reliability for business-critical tasks
- Integration with existing tools and workflows
- Professional support and documentation available
- Security and compliance (if relevant)
- Team adoption ease (no technical training needed)

Please generate the complete professional tutorial now, based on the Actor's README. Translate all technical features into clear business benefits. Walk readers through each step of using the Actor with professional context, business examples, and clear value at every stage. Make it feel like expert professional guidance from a trusted colleague.`;
