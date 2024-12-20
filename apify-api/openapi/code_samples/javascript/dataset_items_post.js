import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
await apifyClient
    .dataset('<DATASET ID>')
    .pushItems([
        { foo: 'bar' },
        { fizz: 'buzz' },
    ]);
