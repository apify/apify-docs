import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const log = await apifyClient
    .log('<BUILD OR RUN ID>')
    .get();

console.log(log);
