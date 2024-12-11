import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const task = await apifyClient
    .task('<TASK ID>')
    .get();

console.log(task);
