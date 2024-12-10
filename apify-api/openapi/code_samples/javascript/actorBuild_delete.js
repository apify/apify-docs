import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
await apifyClient.build('my-build-ID').delete();
