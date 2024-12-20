import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const schedule = await apifyClient
    .schedule('<SCHEDULE ID>')
    .get();

console.log(schedule);
