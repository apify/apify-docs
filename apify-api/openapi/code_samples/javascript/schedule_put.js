import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedSchedule = await apifyClient
    .schedule('<SCHEDULE ID>')
    .update({
        title: 'New title',
    });

console.log(updatedSchedule);
