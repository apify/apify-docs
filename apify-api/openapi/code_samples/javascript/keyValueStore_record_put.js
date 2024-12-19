import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
await apifyClient
    .keyValueStore('<STORE ID>')
    .setRecord({
        key: '<RECORD KEY>',
        value: 'my value',
    });
