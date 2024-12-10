import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const run = await apifyClient.run('my-run-ID').delete();

console.log(run);
