import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const myActor = await apifyClient.actors().create({ name: 'my-actor' });

console.log(myActor);
