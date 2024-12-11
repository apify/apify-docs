import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify/my-sample-actor with your Actor's ID or technical name
const updatedVersion = await apifyClient.actor('apify/my-sample-actor')
    .version('0.1')
    .update({
        gitRepoUrl: 'https://github.com/my-github-account/new-actor-repo',
    });

console.log(updatedVersion);
