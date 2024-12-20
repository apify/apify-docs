import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const user = await apifyClient
    .user('me')
    .get();

console.log(user);
