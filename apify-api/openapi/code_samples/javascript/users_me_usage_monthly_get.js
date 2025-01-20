import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const usage = await apifyClient
    .user('me')
    .monthlyUsage();

console.log(usage);
