import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const actorCollectionClient = apifyClient.actors();

const { items } = await actorCollectionClient.list();

console.log(items);
