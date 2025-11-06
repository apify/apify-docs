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

**Note for AI Tools**: If you're an AI assistant that cannot run interactive commands (like the Gemini CLI), inform the user that the \`apify create\` command requires interactive input and cannot be executed automatically. Suggest they run this workflow in tools that support interactive commands like Cursor, or GitHub Copilot.

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
