import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .prolongRequestLock(
        '<REQUEST ID>',
        {
            lockSecs: 3600,
        },
    );

console.log(result);
