import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const actorCollectionClient = apifyClient.actors();

const myActor = await actorCollectionClient.create({ name: 'my-actor' });

console.log(myActor);
