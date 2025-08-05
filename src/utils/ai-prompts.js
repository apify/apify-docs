export const QUICK_START_PROMPT = `Follow this step-by-step workflow::

**Step 1: Verify Prerequisites**

First, verify the user's environment by running these commands:

\`\`\`bash
node --version # Requires Node.js 16 or higher
npm --version
apify --version # Check if Apify CLI is already installed
\`\`\`

If any prerequisites are missing, guide the user through installation before proceeding.

**Step 2: Install/Update Apify CLI**
\`\`\`bash
npm install -g apify-cli
\`\`\`

**Step 3: Create a New Actor**

Explain that this will prompt for actor name and template selection.

\`\`\`bash
apify create
\`\`\`

Direct users to explore templates at https://apify.com/templates.

**Step 4: Navigate to the Actor Directory**

\`\`\`bash
cd [actor-name] # Use the actual name they chose in step 3
\`\`\`

**Step 5: Run the Actor Locally**

Explain that this will run the actor locally.

\`\`\`bash
apify run
\`\`\`

**Step 6: Next Steps**

Explain that the user can deploy the actor to Apify, but they first need to log in to Apify:

\`\`\`bash
apify login
\`\`\`

After logging in, you can deploy the actor to Apify:

\`\`\`bash
apify push
\`\`\`
`;

export const RULES_AND_INSTRUCTIONS_PROMPT = `Using the Apify documentation as reference, create a comprehensive rules file for [PLACEHOLDER (Cursor, Windsurf, GitHub Copilot, etc.)] focused on developing Apify Actors.

Follow these best practices for creating effective rules:
- Keep rules simple, concise, and specific (avoid vague or generic advice)
- Use bullet points, numbered lists, and clear markdown formatting
- Focus on actionable guidelines rather than explanations

Create the rules file in the appropriate location:
- For Cursor: Save as \`.cursor/rules/apify-development.md\`
- For Windsurf: Save as \`.windsurf/rules/apify-development.md\`
- For GitHub Copilot: Save as \`.github/copilot-instructions.md\`

The rules should be:
- Clear and specific for Apify platform development
- Formatted as bullet points with section headers
- Create rules based on existing code in the project

Include sections for:
- Actor development & structure
- Apify SDK usage patterns

Reference Apify documentation at https://docs.apify.com/llms-full.txt for accurate patterns and recommendations. Keep each rule concise and practical for actor development. Format as markdown with # headers and - bullet points.`;