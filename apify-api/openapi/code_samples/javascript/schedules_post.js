import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const schedule = await apifyClient
    .schedules()
    .create({
        name: '<SCHEDULE NAME>',
    });

console.log(schedule);
