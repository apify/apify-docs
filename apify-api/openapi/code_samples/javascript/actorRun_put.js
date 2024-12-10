import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const updatedRun = await apifyClient.run('my-run-ID')
    .update({
        statusMessage: 'My status message',
    });

console.log(updatedRun);
