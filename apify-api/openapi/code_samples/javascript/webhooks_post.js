import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const webhook = await apifyClient
    .webhooks()
    .create({
        eventTypes: ['ACTOR.RUN.SUCCEEDED'],
        condition: {
            actorId: '<ACTOR ID>',
        },
        requestUrl: 'http://example.com/',
    });

console.log(webhook);
