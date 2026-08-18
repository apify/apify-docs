import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const myActor = await apifyClient
    .actors()
    .create({
        name: '<ACTOR NAME>',
    });

console.log(myActor);
