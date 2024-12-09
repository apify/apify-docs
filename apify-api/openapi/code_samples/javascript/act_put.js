import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify/my-sample-actor with your Actor's ID or technical name
const actor = await apifyClient.actor('apify/my-sample-actor').update({
    title: 'New title',
});

console.log(actor);
