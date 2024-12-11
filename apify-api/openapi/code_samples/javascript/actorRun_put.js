import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedRun = await apifyClient
    .run('<RUN ID>')
    .update({
        statusMessage: 'Actor has finished',
    });

console.log(updatedRun);
