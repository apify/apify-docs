import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .webhook('<WEBHOOK ID>')
    .test();

console.log(result);
