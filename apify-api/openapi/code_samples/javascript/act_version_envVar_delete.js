import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify~my-sample-actor with your Actor's ID or technical name
await apifyClient.actor('apify~my-sample-actor')
    .version('0.1')
    .envVar('MY_ENV_VAR')
    .delete();
