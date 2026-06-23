import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedVersion = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .update({
        buildTag: 'latest',
    });

console.log(updatedVersion);
