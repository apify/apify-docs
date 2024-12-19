import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedStore = await apifyClient
    .keyValueStore('<STORE ID>')
    .update({
        title: 'New title',
    });

console.log(updatedStore);
