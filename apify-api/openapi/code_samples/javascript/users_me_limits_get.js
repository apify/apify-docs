import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const limits = await apifyClient
    .user('me')
    .limits();

console.log(limits);
