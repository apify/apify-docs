import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const run = await apifyClient.run('my-run-ID').get();

console.log(run);
