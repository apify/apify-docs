import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const { items } = await apifyClient.tasks().create({
    /**
     * Replace apify~my-sample-actor with the ID or technical name
     * of the Actor this task will be based on
     */
    actId: 'apify~my-sample-actor',
    name: 'my-sample-task',
});

console.log(items);
