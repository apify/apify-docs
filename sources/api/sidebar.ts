import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: 'doc',
            id: 'apify-api',
        },
        {
            type: 'category',
            label: 'Actor collection',
            items: [
                {
                    type: 'doc',
                    id: 'acts-get',
                    label: 'Get list of actors',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'acts-post',
                    label: 'Create actor',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Actor object',
            items: [
                {
                    type: 'doc',
                    id: 'act-get',
                    label: 'Get actor',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-put',
                    label: 'Update actor',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'act-delete',
                    label: 'Delete actor',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Version collection',
            items: [
                {
                    type: 'doc',
                    id: 'act-versions-get',
                    label: 'Get list of versions',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-versions-post',
                    label: 'Create version',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Version object',
            items: [
                {
                    type: 'doc',
                    id: 'act-version-get',
                    label: 'Get version',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-version-put',
                    label: 'Update version',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'act-version-delete',
                    label: 'Delete version',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Environment variable collection',
            items: [
                {
                    type: 'doc',
                    id: 'act-version-env-vars-get',
                    label: 'Get list of environment variables',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-version-env-vars-post',
                    label: 'Create environment variable',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Environment variable object',
            items: [
                {
                    type: 'doc',
                    id: 'act-version-env-var-get',
                    label: 'Get environment variable',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-version-env-var-put',
                    label: 'Update environment variable',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'act-version-env-var-delete',
                    label: 'Delete environment variable',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook collection',
            items: [
                {
                    type: 'doc',
                    id: 'act-webhooks-get',
                    label: 'Get list of webhooks',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Build collection',
            items: [
                {
                    type: 'doc',
                    id: 'act-builds-get',
                    label: 'Get list of builds',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-builds-post',
                    label: 'Build actor',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Build object',
            items: [
                {
                    type: 'doc',
                    id: 'act-build-get',
                    label: 'Get build',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Abort build',
            items: [
                {
                    type: 'doc',
                    id: 'act-build-abort-post',
                    label: 'Abort build',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run collection',
            items: [
                {
                    type: 'doc',
                    id: 'act-runs-get',
                    label: 'Get list of runs',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'act-runs-post',
                    label: 'Run actor',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run actor synchronously',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-sync-post',
                    label: 'With input',
                    className: 'api-method post',
                },
                {
                    type: 'doc',
                    id: 'act-run-sync-get',
                    label: 'Without input',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run Actor synchronously and get dataset items',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-sync-get-dataset-items-post',
                    label: 'Run actor synchronously with input and get dataset items',
                    className: 'api-method post',
                },
                {
                    type: 'doc',
                    id: 'act-run-sync-get-dataset-items-get',
                    label: 'Run actor synchronously without input and get dataset items',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run object',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-get',
                    label: 'Get run',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Abort run',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-abort-post',
                    label: 'Abort run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Metamorph run',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-metamorph-post',
                    label: 'Metamorph run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Resurrect run',
            items: [
                {
                    type: 'doc',
                    id: 'act-run-resurrect-post',
                    label: 'Resurrect run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Last run object and its storages',
            items: [
                {
                    type: 'doc',
                    id: 'act-runs-last-get',
                    label: 'Get last run',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Task collection',
            items: [
                {
                    type: 'doc',
                    id: 'actor-tasks-get',
                    label: 'Get list of tasks',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'actor-tasks-post',
                    label: 'Create task',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Task object',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-get',
                    label: 'Get task',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'actor-task-put',
                    label: 'Update task',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'actor-task-delete',
                    label: 'Delete task',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Task input object',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-input-get',
                    label: 'Get task input',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'actor-task-input-put',
                    label: 'Update task input',
                    className: 'api-method put',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook collection',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-webhooks-get',
                    label: 'Get list of webhooks',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run collection',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-runs-get',
                    label: 'Get list of task runs',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'actor-task-runs-post',
                    label: 'Run task',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run task synchronously',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-run-sync-post',
                    label: 'Run task synchronously (POST)',
                    className: 'api-method post',
                },
                {
                    type: 'doc',
                    id: 'actor-task-run-sync-get',
                    label: 'Run task synchronously (GET)',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run task synchronously and get dataset items',
            items: [
                {
                    type: 'doc',
                    id: 'actor-task-run-sync-get-dataset-items-post',
                    label: 'Run task synchronously and get dataset items (POST)',
                    className: 'api-method post',
                },
                {
                    type: 'doc',
                    id: 'actor-task-run-sync-get-dataset-items-get',
                    label: 'Run task synchronously and get dataset items (GET)',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run collection',
            items: [
                {
                    type: 'doc',
                    id: 'actor-runs-get',
                    label: 'Get user runs list',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Run object and its storages',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-get',
                    label: 'Get run',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Delete run',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-delete',
                    label: 'Delete run',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Abort run',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-abort-post',
                    label: 'Abort run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Metamorph run',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-metamorph-post',
                    label: 'Metamorph run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Reboot run',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-reboot-post',
                    label: 'Reboot run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Resurrect run',
            items: [
                {
                    type: 'doc',
                    id: 'post-resurrect-run',
                    label: 'Resurrect run',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Update status message',
            items: [
                {
                    type: 'doc',
                    id: 'actor-run-put',
                    label: 'Update status message',
                    className: 'api-method put',
                },
            ],
        },
        {
            type: 'category',
            label: 'Actor builds',
            items: [
                {
                    type: 'doc',
                    id: 'actor-build-delete',
                    label: 'Delete build',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Build collection',
            items: [
                {
                    type: 'doc',
                    id: 'actor-builds-get',
                    label: 'Get user builds list',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Build object',
            items: [
                {
                    type: 'doc',
                    id: 'actor-build-get',
                    label: 'Get build',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Abort build',
            items: [
                {
                    type: 'doc',
                    id: 'actor-build-abort-post',
                    label: 'Abort build',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Build log',
            items: [
                {
                    type: 'doc',
                    id: 'actor-build-log-get',
                    label: 'Get log',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Store collection',
            items: [
                {
                    type: 'doc',
                    id: 'key-value-stores-get',
                    label: 'Get list of key-value stores',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'key-value-stores-post',
                    label: 'Create key-value store',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Store object',
            items: [
                {
                    type: 'doc',
                    id: 'key-value-store-get',
                    label: 'Get store',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'key-value-store-put',
                    label: 'Update store',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'key-value-store-delete',
                    label: 'Delete store',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Key collection',
            items: [
                {
                    type: 'doc',
                    id: 'key-value-store-keys-get',
                    label: 'Get list of keys',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Record',
            items: [
                {
                    type: 'doc',
                    id: 'key-value-store-record-get',
                    label: 'Get record',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'key-value-store-record-put',
                    label: 'Put record',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'key-value-store-record-delete',
                    label: 'Delete record',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Dataset collection',
            items: [
                {
                    type: 'doc',
                    id: 'datasets-get',
                    label: 'Get list of datasets',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'datasets-post',
                    label: 'Create dataset',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Dataset',
            items: [
                {
                    type: 'doc',
                    id: 'dataset-get',
                    label: 'Get dataset',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'dataset-put',
                    label: 'Update dataset',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'dataset-delete',
                    label: 'Delete dataset',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Item collection',
            items: [
                {
                    type: 'doc',
                    id: 'dataset-items-get',
                    label: 'Get items',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'dataset-items-post',
                    label: 'Put items',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Queue collection',
            items: [
                {
                    type: 'doc',
                    id: 'request-queues-get',
                    label: 'Get list of request queues',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'request-queues-post',
                    label: 'Create request queue',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Queue',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-get',
                    label: 'Get request queue',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'request-queue-put',
                    label: 'Update request queue',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'request-queue-delete',
                    label: 'Delete request queue',
                    className: 'api-method delete',
                },
                {
                    type: 'doc',
                    id: 'request-queue-request-get',
                    label: 'Get request',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'request-queue-request-put',
                    label: 'Update request',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'request-queue-request-delete',
                    label: 'Delete request',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Request collection',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-requests-get',
                    label: 'List requests',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'request-queue-requests-post',
                    label: 'Add request',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Request lock',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-request-lock-put',
                    label: 'Prolong request lock',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'request-queue-request-lock-delete',
                    label: 'Delete request lock',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Queue head',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-head-get',
                    label: 'Get head',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Queue head with locks',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-head-lock-post',
                    label: 'Get head and lock',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Batch request operations',
            items: [
                {
                    type: 'doc',
                    id: 'request-queue-requests-batch-post',
                    label: 'Add requests',
                    className: 'api-method post',
                },
                {
                    type: 'doc',
                    id: 'request-queue-requests-batch-delete',
                    label: 'Delete requests',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook collection',
            items: [
                {
                    type: 'doc',
                    id: 'webhooks-get',
                    label: 'Get list of webhooks',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'webhooks-post',
                    label: 'Create webhook',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook object',
            items: [
                {
                    type: 'doc',
                    id: 'webhook-get',
                    label: 'Get webhook',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'webhook-put',
                    label: 'Update webhook',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'webhook-delete',
                    label: 'Delete webhook',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook test',
            items: [
                {
                    type: 'doc',
                    id: 'webhook-test-post',
                    label: 'Test webhook',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Dispatches collection',
            items: [
                {
                    type: 'doc',
                    id: 'webhook-dispatches-get',
                    label: 'Get collection',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook dispatches collection',
            items: [
                {
                    type: 'doc',
                    id: 'webhook-dispatches-get',
                    label: 'Get list of webhook dispatches',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Webhook dispatch object',
            items: [
                {
                    type: 'doc',
                    id: 'webhook-dispatch-get',
                    label: 'Get webhook dispatch',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Schedules collection',
            items: [
                {
                    type: 'doc',
                    id: 'schedules-get',
                    label: 'Get list of schedules',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'schedules-post',
                    label: 'Create schedule',
                    className: 'api-method post',
                },
            ],
        },
        {
            type: 'category',
            label: 'Schedule object',
            items: [
                {
                    type: 'doc',
                    id: 'schedule-get',
                    label: 'Get schedule',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'schedule-put',
                    label: 'Update schedule',
                    className: 'api-method put',
                },
                {
                    type: 'doc',
                    id: 'schedule-delete',
                    label: 'Delete schedule',
                    className: 'api-method delete',
                },
            ],
        },
        {
            type: 'category',
            label: 'Schedule log',
            items: [
                {
                    type: 'doc',
                    id: 'schedule-log-get',
                    label: 'Get schedule log',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Store Actors collection',
            items: [
                {
                    type: 'doc',
                    id: 'store-get',
                    label: 'Get list of Actors in store',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Log',
            items: [
                {
                    type: 'doc',
                    id: 'log-get',
                    label: 'Get log',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Public data',
            items: [
                {
                    type: 'doc',
                    id: 'user-get',
                    label: 'Get public user data',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Private data',
            items: [
                {
                    type: 'doc',
                    id: 'users-me-get',
                    label: 'Get private user data',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Monthly usage',
            items: [
                {
                    type: 'doc',
                    id: 'users-me-usage-monthly-get',
                    label: 'Get monthly usage',
                    className: 'api-method get',
                },
            ],
        },
        {
            type: 'category',
            label: 'Account and usage limits',
            items: [
                {
                    type: 'doc',
                    id: 'users-me-limits-get',
                    label: 'Get limits',
                    className: 'api-method get',
                },
                {
                    type: 'doc',
                    id: 'users-me-limits-put',
                    label: 'Update limits',
                    className: 'api-method put',
                },
            ],
        },
    ],
};

export default sidebar.apisidebar;
