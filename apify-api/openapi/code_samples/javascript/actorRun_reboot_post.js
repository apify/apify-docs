import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const rebootedRun = await apifyClient
    .run('<RUN ID>')
    .reboot();

console.log(rebootedRun);
