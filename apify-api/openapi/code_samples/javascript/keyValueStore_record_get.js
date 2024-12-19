import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const record = await apifyClient
    .keyValueStore('<STORE ID>')
    .getRecord('<RECORD KEY>');

console.log(record);
