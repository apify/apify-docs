---
title: X
description: Documentation of 
menuWeight: 7
---

## ApifyClient.tasks

### Basic usage

Every method can be used as either promise or with callback. If your Node version supports await/async then you can await promise result.

    const ApifyClient = require('apify-client');

    const apifyClient = new ApifyClient({
     userId: 'jklnDMNKLekk',
     token: 'SNjkeiuoeD443lpod68dk',
    });

    // Awaited promise
    try {
         const tasksList = await apifyClient.tasks.listTasks({});
         // Do something with the tasksList ...
    } catch (err) {
         // Do something with error ...
    }

    // Promise
    apifyClient.tasks.listTasks({})
    .then((tasksList) => {
         // Do something tasksList ...
    })
    .catch((err) => {
         // Do something with error ...
    });

    // Callback
    apifyClient.tasks.listTasks({}, (err, tasksList) => {
         // Do something with error or tasksList ...
    });

### Methods (9)

#### createTask(options, callback opt) → {Task}



Creates a new task.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`task`** ( Object ) - Object containing configuration of the task

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Task )

#### deleteTask(options, callback opt)



Deletes task.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID

    

*   **`callback`** ( function ) <optional> - Callback function





#### getInput(options, callback opt) → {Object}



Gets the actor task input.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Object )

#### getTask(options, callback opt) → {Task}



Gets task object.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Task )

#### listRuns(options, callback opt) → {PaginationList}



Gets list of task runs.

By default, the objects are sorted by the startedAt field in ascending order, therefore you can use pagination to incrementally fetch all builds while new ones are still being created. To sort them in descending order, use desc: `true` parameter.

The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.



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

#### listTasks(options, callback opt) → {PaginationList}



By default, the objects are sorted by the createdAt field in ascending order, therefore you can use pagination to incrementally fetch all tasks while new ones are still being created. To sort them in descending order, use desc: `true` parameter. The endpoint supports pagination using limit and offset parameters and it will not return more than 1000 array elements.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`offset`** ( Number ) <optional> - Number of array elements that should be skipped at the start. Defaults to `0`.
    *   **`limit`** ( Number ) <optional> - Maximum number of array elements to return. Defaults to `1000`.
    *   **`desc`** ( Boolean ) <optional> - If `true` then the objects are sorted by the createdAt field in descending order.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( PaginationList )

#### runTask(options, callback opt) → {ActRun}



Runs the given task.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`taskId`** ( String ) - Unique task ID
    *   **`token`** ( String ) <optional> - Your API token at apify.com
    *   **`waitForFinish`** ( Number ) <optional> - Number of seconds to wait for task to finish. Maximum value is 120s. If task doesn't finish in time then task run in RUNNING state is returned.
    *   **`input`** ( Object ) <optional> - Actor task input object.
    *   **`timeout`** ( Number ) <optional> - Timeout for the act run in seconds. Zero value means there is no timeout.
    *   **`memory`** ( Number ) <optional> - Amount of memory allocated for the act run, in megabytes.
    *   **`build`** ( String ) <optional> - Tag or number of the build to run (e.g. `latest` or `1.2.34`).
    *   **`webhooks`** ( Array ) <optional> - Specifies optional webhooks associated with the actor run, which can be used to receive a notification e.g. when the actor finished or failed, see [ad hook webhooks documentation](https://apify.com/docs/webhooks#adhoc) for detailed description.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( ActRun )

#### updateInput(options, callback opt) → {Object}



Updates the actor task input.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID
    *   **`input`** ( Object ) - Input object.

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Object )

#### updateTask(options, callback opt) → {Task}



Updates task.



##### Parameters:



*   **`options`** ( Object )

    

    *   **`token`** ( String ) - Your API token at apify.com
    *   **`taskId`** ( String ) - Unique task ID
    *   **`task`** ( Object )

    

*   **`callback`** ( function ) <optional> - Callback function



##### Returns:

*   ( Task )

