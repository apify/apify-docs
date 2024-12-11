import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const myActor = await apifyClient.actors().create({ name: 'my-sample-actor' });

console.log(myActor);
