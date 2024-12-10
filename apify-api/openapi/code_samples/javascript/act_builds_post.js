import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify~my-sample-actor with your Actor's ID or technical name
const build = await apifyClient.actor('apify~my-sample-actor').build('0.0');

console.log(build);
