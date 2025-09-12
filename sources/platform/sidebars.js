module.exports = {
    platform: [
        // Apify platform (main page)
        'index',

        // 👋 Get Started
        {
            type: 'category',
            label: '👋 Get Started',
            collapsible: false,
            className: 'section-header',
            items: [
                'actors/index',
                {
                    type: 'category',
                    label: 'Quickstart',
                    link: {
                        type: 'doc',
                        id: 'actors/development/quick_start/index',
                    },
                    items: [
                        'actors/running/store',
                        'actors/development/quick_start/start_locally',
                        'actors/development/quick_start/start_web_ide',
                    ],
                },
            ],
        },

        // 🛠️ Develop Actors
        {
            type: 'category',
            label: '🛠️ Develop Actors',
            collapsible: false,
            className: 'section-header',
            link: {
                type: 'doc',
                id: 'actors/development/index',
            },
            items: [
                {
                    type: 'category',
                    label: 'Actor Definition',
                    link: {
                        type: 'doc',
                        id: 'actors/development/actor_definition/index',
                    },
                    items: [
                        'actors/development/actor_definition/actor_json',
                        'actors/development/actor_definition/source_code',
                        'actors/development/actor_definition/docker',
                    ],
                },
                {
                    type: 'category',
                    label: 'Input & Output Schemas',
                    items: [
                        'actors/development/actor_definition/input_schema/index',
                        'actors/development/actor_definition/dataset_schema/index',
                        'actors/development/actor_definition/key_value_store_schema/index',
                    ],
                },
                {
                    type: 'category',
                    label: 'Programming & Interface',
                    link: {
                        type: 'doc',
                        id: 'actors/development/programming_interface/index',
                    },
                    items: [
                        'actors/development/programming_interface/basic_commands',
                        'actors/development/programming_interface/environment_variables',
                        'actors/development/builds_and_runs/state_persistence',
                        'actors/development/programming_interface/metamorph',
                    ],
                },
                {
                    type: 'category',
                    label: 'Testing, Deployment & Performance',
                    items: [
                        'actors/development/builds_and_runs/index',
                        'actors/development/automated_tests',
                        'actors/development/deployment/index',
                        'actors/development/deployment/continuous_integration',
                        'actors/development/performance',
                    ],
                },
            ],
        },

        // ▶️ Run & Automate
        {
            type: 'category',
            label: '▶️ Run & Automate',
            collapsible: false,
            className: 'section-header',
            items: [
                {
                    type: 'category',
                    label: 'Running & Scheduling',
                    link: {
                        type: 'doc',
                        id: 'actors/running/index',
                    },
                    items: [
                        'actors/running/tasks',
                        'schedules',
                        'actors/running/input_and_output',
                        'actors/running/usage_and_resources',
                    ],
                },
                {
                    type: 'category',
                    label: 'Integrations',
                    link: {
                        type: 'doc',
                        id: 'integrations/index',
                    },
                    items: [
                        'integrations/integrate_with_apify',
                        {
                            type: 'category',
                            label: 'Programming',
                            items: [
                                'integrations/programming/api',
                                'integrations/programming/github',
                                {
                                    type: 'category',
                                    label: 'Webhook integration',
                                    link: { type: 'doc', id: 'integrations/programming/webhooks/index' },
                                    items: [
                                        'integrations/programming/webhooks/events',
                                        'integrations/programming/webhooks/actions',
                                        'integrations/programming/webhooks/ad_hoc_webhooks',
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Actor-to-Actor',
                            link: { type: 'doc', id: 'integrations/actors/index' },
                            items: [
                                'integrations/actors/integration_ready_actors',
                                'integrations/actors/integrating_actors_via_api',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Workflows & notifications',
                            items: [
                                'integrations/workflows-and-notifications/gmail',
                                'integrations/workflows-and-notifications/ifttt',
                                {
                                    type: 'category',
                                    label: 'Make integration',
                                    link: { type: 'doc', id: 'integrations/workflows-and-notifications/make/index' },
                                    items: [
                                        'integrations/workflows-and-notifications/make/ai-crawling',
                                        'integrations/workflows-and-notifications/make/amazon',
                                        'integrations/workflows-and-notifications/make/facebook',
                                        'integrations/workflows-and-notifications/make/instagram',
                                        'integrations/workflows-and-notifications/make/maps',
                                        'integrations/workflows-and-notifications/make/search',
                                        'integrations/workflows-and-notifications/make/tiktok',
                                        'integrations/workflows-and-notifications/make/youtube',
                                    ],
                                },
                                'integrations/workflows-and-notifications/n8n',
                                'integrations/workflows-and-notifications/slack',
                                'integrations/workflows-and-notifications/telegram',
                                'integrations/workflows-and-notifications/zapier',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Data storage',
                            items: [
                                'integrations/data-storage/airbyte',
                                'integrations/data-storage/airtable',
                                'integrations/data-storage/drive',
                                'integrations/data-storage/keboola',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'AI',
                            items: [
                                'integrations/ai/agno',
                                'integrations/ai/aws_bedrock',
                                'integrations/ai/crewai',
                                'integrations/ai/flowise',
                                'integrations/ai/haystack',
                                'integrations/ai/langchain',
                                'integrations/ai/langflow',
                                'integrations/ai/langgraph',
                                'integrations/ai/lindy',
                                'integrations/ai/llama',
                                'integrations/ai/mastra',
                                'integrations/ai/mcp',
                                'integrations/ai/milvus',
                                'integrations/ai/openai_assistants',
                                'integrations/ai/pinecone',
                                'integrations/ai/qdrant',
                            ],
                        },
                    ],
                },
            ],
        },

        // 📢 Publish to Store
        {
            type: 'category',
            label: '📢 Publish to Store',
            collapsible: false,
            className: 'section-header',
            link: {
                type: 'doc',
                id: 'actors/publishing/index',
            },
            items: [
                'actors/publishing/publish',
                'actors/publishing/monetize',
                'actors/publishing/testing',
                'actors/publishing/badge',
            ],
        },

        // ⚙️ Platform & Account
        {
            type: 'category',
            label: '⚙️ Platform & Account',
            collapsible: false,
            className: 'section-header',
            items: [
                {
                    type: 'category',
                    label: 'Apify Console',
                    link: {
                        type: 'doc',
                        id: 'console/index',
                    },
                    items: [], // This category only has an overview page per the IA.
                },
                {
                    type: 'category',
                    label: 'Core Services',
                    items: [
                        'storage/index',
                        'proxy/index',
                    ],
                },
                {
                    type: 'category',
                    label: 'Account & Collaboration',
                    items: [
                        'console/billing',
                        'collaboration/index',
                        'collaboration/organization_account/index',
                        'console/two-factor-authentication',
                    ],
                },
                {
                    type: 'category',
                    label: 'Policies & Limits',
                    items: [
                        'security',
                        'limits',
                        'monitoring/index',
                    ],
                },
            ],
        },
    ],
};