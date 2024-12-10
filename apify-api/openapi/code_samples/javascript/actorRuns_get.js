import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const { items } = await apifyClient.runs().list();

console.log(items);
