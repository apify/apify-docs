import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify~my-sample-actor with your Actor's ID or technical name
const run = await apifyClient.actor('apify~my-sample-actor')
    .start(/** Your Actor's input */);

console.log(run);
