import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedDataset = await apifyClient
    .dataset('<DATASET ID>')
    .update({
        title: 'New title',
    });

console.log(updatedDataset);
