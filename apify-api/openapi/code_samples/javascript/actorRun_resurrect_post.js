import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const resurrectedRun = await apifyClient
    .run('<RUN ID>')
    .resurrect();

console.log(resurrectedRun);
