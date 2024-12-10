import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify~my-sample-task with your task's ID or technical name
const { items } = await apifyClient.task('apify~my-sample-task')
    .webhooks()
    .list();

console.log(items);
