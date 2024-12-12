import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const { items } = await apifyClient.actors().list();

console.log(items);
