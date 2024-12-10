import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const buildLog = await apifyClient.build('my-build-ID')
    .log()
    .get();

console.log(buildLog);
