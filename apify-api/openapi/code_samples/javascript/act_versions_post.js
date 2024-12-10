import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify~my-sample-actor with your Actor's ID or technical name
const version = await apifyClient.actor('apify~my-sample-actor')
    .versions()
    .create({
        versionNumber: '0.1',
        sourceType: 'GIT_REPO',
        gitRepoUrl: 'https://github.com/my-github-account/actor-repo',
    });

console.log(version);
