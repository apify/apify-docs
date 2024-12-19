import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedQueue = await apifyClient
    .requestQueue('<QUEUE ID>')
    .update({
        title: 'New title',
    });

console.log(updatedQueue);
