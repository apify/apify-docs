import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedTask = await apifyClient
    .task('<TASK ID>')
    .update({
        title: 'New title',
    });

console.log(updatedTask);
