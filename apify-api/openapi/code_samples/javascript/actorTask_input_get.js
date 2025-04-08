import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const input = await apifyClient
    .task('<TASK ID>')
    .getInput();

console.log(input);
