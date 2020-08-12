---
title: Quick start
description: Documentation of Apify actors - serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.1
paths:
# NOTE: IF ADDING A NEW PATH, LEAVE THE OLD ONES FOR REDIRECTS
    - actor/quick-start
    - actors/quick-start
---

# Quick start

Go to the [Actor](https://my.apify.com/actors) section in the app, create a new actor and go to *Source* tab. Paste the following Node.js code into the *Source code* editor:

    const Apify = require('apify');

    Apify.main(async () => {
       console.log('Hello world from Actor!');
    });

Click *▷ Run* to build and run your actor. After the run is finished you should see something like:

![Apify actor run log]({{@asset actors/images/run-log.png}})

Congratulations, you have successfully created and run your first actor!

Let's try something little more complicated. We will change the actor to accept input and generate output (see [Input and output]({{@link actors/running/input.md}}) for more details):

    const Apify = require('apify');

    Apify.main(async () => {
        // Get input and print it
        const input = await Apify.getInput();
        console.log('My input:');
        console.dir(input);

        // Save output
        const output = { message: 'Hello world!' };
        await Apify.setValue('OUTPUT', output);
    });

Save your actor by clicking **Save** and then rebuild it by clicking **Build**\. After the build is finished, go to **Console** and set **Input** to:

    { "hello": 123 }

Then set **Content type** to `application/json; charset=utf-8` and click **Run**. You will see something like:

![Apify actor run log]({{@asset actors/images/run-log-2.png}})

Excellent, you have just created your first actor to accept input and store output! Now you can start adding some magic.

The above actor is also available in the store as [apify/hello-world](https://apify.com/apify/hello-world). It uses the `apify` [NPM package](https://sdk.apify.com/), which provides various helper functions to simplify the development of actors. For example, the `Apify.main()` function invokes the main [user function]((https://sdk.apify.com/docs/api/apify#apifymainuserfunc)) and waits for its finish, logs exception details, etc. Note that the `apify` package is optional and actors do not need to use it at all.

For more complicated actors, you'll probably prefer to host the source code on Git. To do that, follow these steps:

1.  Create a new Git repository.
2.  Copy the boilerplate actor code from the [apify/quick-start](https://github.com/apifytech/actor-quick-start) actor.
3.  Set **Source type** to **Git repository** for your actor in the app.
4.  Paste the Git repo link to **Git URL**, save changes and build your actor.
5.  That's it, now you can develop your actor locally on your computer and run it in the Apify cloud!

For more information, go to the [Git repository]({{@link actors/development/source_code.md#git-repository}}) section.

