import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const abortedBuild = await apifyClient.build('my-build-ID').abort();

console.log(abortedBuild);
