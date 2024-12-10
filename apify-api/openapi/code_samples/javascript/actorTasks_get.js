import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const { items } = await apifyClient.tasks().list();

console.log(items);
