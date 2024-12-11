import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const version = await apifyClient
    .actor('<ACTOR ID>')
    .versions()
    .create({
        versionNumber: '0.1',
        sourceType: 'GIT_REPO',
        gitRepoUrl: 'https://github.com/my/repo',
    });

console.log(version);
