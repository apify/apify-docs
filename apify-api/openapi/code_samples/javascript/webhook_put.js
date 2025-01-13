import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedWebhook = await apifyClient
    .webhook('<WEBHOOK ID>')
    .update({
        eventTypes: ['ACTOR.RUN.FAILED'],
    });

console.log(updatedWebhook);
