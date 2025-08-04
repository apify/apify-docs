/**
 * Sidebar for the second Information Architecture.
 * Top-level categories are static headers.
 */
module.exports = {
    platform: [
        // 1. Home
        'index',

        // 2. Getting Started
        {
            type: 'category',
            label: 'Getting Started',
            collapsible: false,
            className: 'section-header',
            items: [
                {
                    type: 'category',
                    label: 'Quick start',
                    link: {
                        type: 'doc',
                        id: 'actors/development/quick_start/index',
                    },
                    items: [
                        'actors/development/quick_start/start_locally',
                        'actors/development/quick_start/start_web_ide',
                    ],
                },
            ],
        },

        // 3. Actors
        {
            type: 'category',
            label: 'Actors',
            collapsible: false,
            className: 'section-header',
            link: {
                type: 'doc',
                id: 'actors/index',
            },
            items: [
                {
                    type: 'category',
                    label: 'Actor development',
                    link: {
                        type: 'doc',
                        id: 'actors/development/index',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Actor definition',
                            link: {
                                type: 'doc',
                                id: 'actors/development/actor_definition/index',
                            },
                            items: [
                                'actors/development/actor_definition/actor_json',
                                {
                                    type: 'category',
                                    label: 'Dataset Schema Specification',
                                    link: { type: 'doc', id: 'actors/development/actor_definition/dataset_schema/index' },
                                    items: [
                                        'actors/development/actor_definition/dataset_schema/validation',
                                    ],
                                },
                                'actors/development/actor_definition/docker',
                                {
                                    type: 'category',
                                    label: 'Input schema',
                                    link: { type: 'doc', id: 'actors/development/actor_definition/input_schema/index' },
                                    items: [
                                        'actors/development/actor_definition/input_schema/secret_input',
                                        'actors/development/actor_definition/input_schema/specification',
                                    ],
                                },
                                'actors/development/actor_definition/key_value_store_schema/index',
                                'actors/development/actor_definition/source_code',
                            ],
                        },
                        'actors/development/automated_tests',
                        {
                            type: 'category',
                            label: 'Builds and runs',
                            link: {
                                type: 'doc',
                                id: 'actors/development/builds_and_runs/index',
                            },
                            items: [
                                'actors/development/builds_and_runs/builds',
                                'actors/development/builds_and_runs/runs',
                                'actors/development/builds_and_runs/state_persistence',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Deployment',
                            link: {
                                type: 'doc',
                                id: 'actors/development/deployment/index',
                            },
                            items: [
                                'actors/development/deployment/continuous_integration',
                                'actors/development/deployment/source_types',
                            ],
                        },
                        'actors/development/performance',
                        {
                            type: 'category',
                            label: 'Programming interface',
                            link: {
                                type: 'doc',
                                id: 'actors/development/programming_interface/index',
                            },
                            items: [
                                'actors/development/programming_interface/basic_commands',
                                'actors/development/programming_interface/container_web_server',
                                'actors/development/programming_interface/environment_variables',
                                'actors/development/programming_interface/metamorph',
                                'actors/development/programming_interface/actor_standby',
                                'actors/development/programming_interface/status_messages',
                                'actors/development/programming_interface/system_events',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Publishing and monetization',
                    link: {
                        type: 'doc',
                        id: 'actors/publishing/index',
                    },
                    items: [
                        'actors/publishing/monetize',
                        'actors/publishing/publish',
                        'actors/publishing/badge',
                        'actors/publishing/testing',
                    ],
                },
                {
                    type: 'category',
                    label: 'Running Actors',
                    link: {
                        type: 'doc',
                        id: 'actors/running/index',
                    },
                    items: [
                        'actors/running/store',
                        'actors/running/input_and_output',
                        'actors/running/runs_and_builds',
                        'actors/running/actor_standby',
                        'actors/running/tasks',
                        'actors/running/usage_and_resources',
                    ],
                },
            ],
        },

        // 4. Storage
        {
            type: 'category',
            label: 'Storage',
            collapsible: false,
            className: 'section-header',
            link: { type: 'doc', id: 'storage/index' },
            items: [
                'storage/dataset',
                'storage/key_value_store',
                'storage/request_queue',
                'storage/usage',
            ],
        },

        // 5. Integrations
        {
            type: 'category',
            label: 'Integrations',
            collapsible: false,
            className: 'section-header',
            link: { type: 'doc', id: 'integrations/index' },
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

        // 6. Operations and Management
        {
            type: 'category',
            label: 'Operations and Management',
            collapsible: false,
            className: 'section-header',
            items: [
                {
                    type: 'category',
                    label: 'Collaboration',
                    link: { type: 'doc', id: 'collaboration/index' },
                    items: [
                        'collaboration/access_rights',
                        'collaboration/list_of_permissions',
                        {
                            type: 'category',
                            label: 'Organization account',
                            link: { type: 'doc', id: 'collaboration/organization_account/index' },
                            items: [
                                'collaboration/organization_account/setup',
                                'collaboration/organization_account/how_to_use',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Apify Console',
                    link: { type: 'doc', id: 'console/index' },
                    items: [
                        'console/store',
                        'console/billing',
                        'console/settings',
                        'console/two-factor-authentication',
                    ],
                },
                {
                    type: 'category',
                    label: 'Proxy',
                    link: { type: 'doc', id: 'proxy/index' },
                    items: [
                        'proxy/datacenter_proxy',
                        'proxy/residential_proxy',
                        'proxy/google_serp_proxy',
                        'proxy/your_own_proxies',
                        'storage/usage', // Mapped as "Proxy usage" per IA
                    ],
                },
                'schedules',
                'monitoring/index',
                'limits',
            ],
        },

        // 7. Security
        {
            type: 'category',
            label: 'Security',
            collapsible: false,
            className: 'section-header',
            items: ['security'],
        },
    ],
};