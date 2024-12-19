import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .listAndLockHead({
        lockSecs: 300,
    });

console.log(result);
