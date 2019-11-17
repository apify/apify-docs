---
title: ApifyClient.acts
description: Documentation of ApifyClient.acts
menuWeight: 1
---

## ApifyClient.acts

### Basic usage

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
     userId: 'jklnDMNKLekk',
     token: 'SNjkeiuoeD443lpod68dk',
    });

    // Awaited promise
    try {
         const crawler = await apifyClient.acts.listActs({});
         // Do something acts list ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    apifyClient.acts.listActs({})
    .then((actsList) => {
         // Do something actsList ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    apifyClient.acts.listActs({}, (err, actsList) => {
         // Do something with error or actsList ...
    });

### Methods (21)

#### abortBuild (options, callback  opt)  → {ActBuild}

Abort act build.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`buildId`** ( String ) - Unique build ID

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActBuild )

#### abortRun (options, callback  opt)  → {ActRun}

Abort act run.


##### Parameters:

*   **`options`** ( Object )

    *   **`actId`** ( String ) - Unique act ID
    *   **`runId`** ( String ) - Unique run ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActRun )

#### buildAct (options, callback  opt)  → {ActBuild}

Builds given act and returns object of that build.

##### Parameters:

*   **`options`** ( Object )
    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`version`** ( String ) - Version of the act to build.
    *   **`betaPackages`** ( Boolean ) <optional> - If true, the Docker container will be rebuild using layer cache. This is to enable quick rebuild during development.
    *   **`useCache`** ( Boolean ) <optional> - If true, Docker build uses beta versions of 'apify-client' and 'apify' NPM packages, to test new features.
    *   **`tag`** ( String ) <optional> - Tag that is applied to the build on success. It enables callers of acts to specify which version of act to run. betaPackages useCache tag
    *   **`waitForFinish`** ( Number ) <optional> - Number of seconds to wait for act to finish. Maximum value is 120s. If act doesn't finish in time then act run in RUNNING state is returned.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActBuild )

#### createAct (options, callback  opt)  → {Act}

Creates a new act.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`act`** ( Object )

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( Act )

#### createActVersion (options)  → {ActVersion}

Creates an act version.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`actVersion`** ( Object ) - Act version

##### Returns:

*   ( ActVersion )

#### deleteAct (options, callback  opt) 

Deletes act.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID

*   **`callback`** ( function ) <optional> - Callback function

#### deleteActVersion (options) 

Deletes an act version.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`versionNumber`** ( String ) - Version number of act version

##### Returns:

#### getAct (options, callback  opt)  → {Act}

Gets act object.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( Act )

#### getActVersion (options)  → {ActVersion}

Gets an act version.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`versionNumber`** ( String ) - Version number of act version

##### Returns:

*   ( ActVersion )

#### getBuild (options, callback  opt)  → {ActBuild}

Gets act build.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`buildId`** ( String ) - Unique build ID
    *   **`waitForFinish`** ( Number ) <optional> - Number of seconds to wait for act to finish. Maximum value is 120s. If act doesn't finish in time then act run in RUNNING state is returned.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActBuild )

#### getRun (options, callback  opt)  → {ActRun}

Gets act run.

##### Parameters:

*   **`options`** ( Object )

    *   **`actId`** ( String ) - Unique act ID
    *   **`runId`** ( String ) - Unique run ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`waitForFinish`** ( Number ) <optional> - Number of seconds to wait for act to finish. Maximum value is 120s. If act doesn't finish in time then act run in RUNNING state is returned.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActRun )

#### listActs (options, callback  opt)  → {PaginationList}

By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all acts while new ones are still being created. To sort them in descending order, use desc: `true` parameter. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( PaginationList )

#### listActVersions (options)  → {PaginationList}

Gets the list of versions of a specific act.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID

##### Returns:

*   ( PaginationList )

#### listBuilds (options, callback  opt)  → {PaginationList}

Gets list of act builds.

By default, the objects are sorted by the startedAt field in ascending order, therefore you can use pagination to incrementally fetch all builds while new ones are still being created. To sort them in descending order, use desc: `true` parameter.

The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( PaginationList )

#### listRuns (options, callback  opt)  → {PaginationList}

Gets list of act runs.

By default, the objects are sorted by the startedAt field in ascending order, therefore you can use pagination to incrementally fetch all builds while new ones are still being created. To sort them in descending order, use desc: `true` parameter.

The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( PaginationList )

#### listWebhooks (options, callback  opt)  → {PaginationList}

Gets list of webhooks for given actor.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( PaginationList )

#### listWebhooks (options, callback  opt)  → {PaginationList}

Gets list of webhooks for given actor task.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( PaginationList )

#### metamorphRun (options, callback  opt)  → {ActRun}

Transforms the actor run to an actor run of a given actor.

##### Parameters:

*   **`options`** ( Object )

    *   **`actId`** ( String ) - Unique act ID
    *   **`token`** ( String ) - Your API token at apify.com
    *   **`runId`** ( String ) - ID a an actor run to metamorph.
    *   **`targetActorId`** ( String ) - ID of an actor to which run should metamorph.
    *   **`body`** ( String | Buffer ) <optional> - Act input, passed as HTTP POST payload
    *   **`contentType`** ( String ) <optional> - Content type of act input e.g 'application/json'
    *   **`build`** ( String ) <optional> - Tag or number of the build to run (e.g. `latest` or `1.2.34`).

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActRun )

#### runAct (options, callback  opt)  → {ActRun}

Runs the latest build of given act.

##### Parameters:

*   **`options`** ( Object )

    *   **`actId`** ( String ) - Unique act ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`body`** ( String | Buffer ) <optional> - Act input, passed as HTTP POST payload
    *   **`contentType`** ( String ) <optional> - Content type of act input e.g 'application/json'
    *   **`waitForFinish`** ( Number ) <optional> - Number of seconds to wait for act to finish. Maximum value is 120s. If act doesn't finish in time then act run in RUNNING state is returned.
    *   **`timeout`** ( Number ) <optional> - Timeout for the act run in seconds. Zero value means there is no timeout.
    *   **`memory`** ( Number ) <optional> - Amount of memory allocated for the act run, in megabytes.
    *   **`build`** ( String ) <optional> - Tag or number of the build to run (e.g. `latest` or `1.2.34`).
    *   **`webhooks`** ( Array ) <optional> - Specifies optional webhooks associated with the actor run, which can be used to receive a notification e.g. when the actor finished or failed, see [ad hook webhooks documentation](https://apify.com/docs/webhooks#adhoc) for detailed description.

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( ActRun )

#### updateAct (options, callback  opt)  → {Act}

Updates act.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`act`** ( Object )

*   **`callback`** ( function ) <optional> - Callback function

##### Returns:

*   ( Act )

#### updateActVersion (options) → {ActVersion}

Updates an act version.

##### Parameters:

*   **`options`** ( Object )

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`actId`** ( String ) - Unique act ID
    *   **`versionNumber`** ( String ) - Version number of act version
    *   **`actVersion`** ( Object ) - Act version

##### Returns:

*   ( ActVersion )
