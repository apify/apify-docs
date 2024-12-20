import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const log = await apifyClient
    .schedule('<SCHEDULE ID>')
    .getLog();

console.log(log);
