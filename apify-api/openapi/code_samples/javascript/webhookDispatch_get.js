import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const dispatch = await apifyClient
    .webhookDispatch('<DISPATCH ID>')
    .get();

console.log(dispatch);
