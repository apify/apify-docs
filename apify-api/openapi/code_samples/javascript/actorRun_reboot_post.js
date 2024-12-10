import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const rebootedRun = await apifyClient.run('my-run-ID').reboot();

console.log(rebootedRun);
