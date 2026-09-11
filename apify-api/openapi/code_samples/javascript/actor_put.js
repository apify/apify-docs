import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedActor = await apifyClient
    .actor('<ACTOR ID>')
    .update({
        title: 'New title',
    });

console.log(updatedActor);
