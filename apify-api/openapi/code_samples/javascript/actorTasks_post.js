import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .tasks()
    .create({
        actId: '<ACTOR ID>',
        name: '<TASK NAME>',
    });

console.log(items);
