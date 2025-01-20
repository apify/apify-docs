import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedLimits = await apifyClient
    .user('me')
    .updateLimits({
        dataRetentionDays: 5,
    });

console.log(updatedLimits);
