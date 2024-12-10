import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const build = await apifyClient.build('my-build-ID').get();

console.log(build);
