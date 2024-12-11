import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedInput = await apifyClient
    .task('<TASK ID>')
    .updateInput({ /** NEW INPUT */ });

console.log(updatedInput);
