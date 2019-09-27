---
title: Apify Actors
---

# Apify Actors

Actors run on the Apify serverless computing platform and enable the execution of arbitrary pieces of code. Unlike traditional serverless platforms, the run of an actor is not limited to the lifetime of a single HTTP transaction. It can run for as long as necessary, even forever. The actor can perform anything from a simple action such as filling out a web form or sending an email, to complex operations such as crawling an entire website and removing duplicates from a large dataset.

A single isolated actor consists of source code and various settings. You can think of an actor as a cloud app or service.

## [](#quick-start)Quick start

Go to the [Actor](https://my.apify.com/actors) section in the app, create a new actor and go to **Source** tab. Paste the following Node.js code into the **Source code** editor:

    const Apify = require('apify');
    
    Apify.main(async () => {
       console.log('Hello world from Actor!');
    });

Click **Quick run** to build and run your actor. After the run is finished you should see something like:

![Apify actor run log](/img/docs/actor/run-log.png)

Congratulations, you have successfully created and run your first actor!

Let's try something little more complicated. We will change the actor to accept input and generate output (see [Input and output](#input-output) for more details):

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

Save your actor by clicking **Save** and then rebuild it by clicking **Build**. After the build is finished, go to **Console** and set **Input** to:

    { "hello": 123 }

Then set **Content type** to `application/json; charset=utf-8` and click **Run**. You will see something like:

![Apify actor run log](/img/docs/actor/run-log-2.png)

Excellent, you have just created your first actor to accept input and store output! Now you can start adding some magic.

Note that the above actor is also available in the store as [apify/hello-world](https://apify.com/apify/hello-world). It uses the [`apify`](https://sdk.apify.com/) NPM package, which provides various helper functions to simplify the development of actors. For example, the [`Apify.main()`](https://sdk.apify.com/docs/api/apify#module_Apify.main) function invokes a user function and waits for its finish, it logs exception details, etc. Note that the `apify` package is optional and actors do not need to use it at all.

For more complicated actors, you'll probably prefer to host the source code on Git. To do that, follow these steps:

1.  Create a new Git repository
2.  Copy the boilerplate actor code from the [apify/quick-start](https://github.com/apifytech/actor-quick-start) actor
3.  Set **Source type** to **Git repository** for your actor in the app
4.  Paste the Git repo link to **Git URL**, save changes and build your actor.
5.  That's it, now you can develop your actor locally on your computer and run it in the Apify cloud!

For more information, go to the [Git repository](#source-git-repo) section.

## [](#source)Source code

The **Source type** setting determines the location of the source code for the actor. It can have one of the following values: [Single JavaScript file](#hosted-source-file), [Multiple source files](#hosted-source-files), [Git repository](#source-git-repo), [Zip file](#source-tarball) or [GitHub Gist](#source-github-gist).

### [](#hosted-source-file)Single JavaScript file

The source code of the actor can be hosted directly on Apify. All the code needs to be in a single file and written in JavaScript / Node.js. The version of Node.js is determined by the **Base image** setting - see [Base images](#base-images) for the description of possible options.

The hosted source is especially useful for simple actors. The source code can require arbitrary NPM packages. For example:

    const _ = require('underscore');
    const request = require('request');

During the build process, the source code is scanned for occurrences of the `require()` function and the corresponding NPM dependencies are automatically added to the `package.json` file by running:

    npm install underscore request --save --only=prod --no-optional

Note that certain NPM packages need additional tools for their installation, such as a C compiler or Python interpreter. If these tools are not available in the base Docker image, the build will fail. If that happens, try to change the base image to **Node.js 10 + Puppeteer on Debian**, because it contains much more tools than other images. Alternatively, you can use switch to the [multifile editor](#custom-dockerfile) and create your own docker image configuration.

### [](#hosted-source-files)Multiple source files

If the source code of the actor requires the use of multiple files/directories, then it can be hosted on Apify platform with this option. This is particulary useful when you need to add [`INPUT_SCHEMA.json`](#input-schema) or `README.md` to your actor, or if you want to create your actor in other language then JavaScript.

The only required file for multifile is `Dockerfile`, all other files depend on your `Dockerfile` settings. By default Apify's custom NodeJS `Dockerfile` is used, which requires `main.js` file containing your source code and `package.json` file, with package configuration for npm.

Unlike the [Single Javascript file](#hosted-source-file) option, `package.json` is not automaticaly generated, and you need to configure it yourself.

See [Custom Dockerfile](#custom-dockerfile) and [Base Images](#base-images) for more information about creating your own Dockerfile and using Apify's prepared base images.

### [](#source-git-repo)Git repository

If the source code of the actor is hosted externally in a Git repository, it can consist of multiple files and directories, use its own `Dockerfile` to control the build process (see [Custom Dockerfile](#custom-dockerfile) for details) and have a user description in store fetched from the `README.md` file. The location of the repository is specified by the **Git URL** setting, which can be an `https`, `git` or `ssh` URL.

To help you get started quickly, you can use the [apify/quick-start](https://apify.com/apify/quick-start) actor which contains all the boilerplate necessary when creating a new actor hosted on Git. The source code is available on [GitHub](https://github.com/apifytech/actor-quick-start).

To specify a Git branch or tag to check out, add a URL fragment to the URL. For example, to check out the `develop` branch, specify a URL such as `https://github.com/jancurn/act-analyse-pages.git#develop`

Optionally, the second part of the fragment in the Git URL (separated by a colon) specifies the context directory for the Docker build. For example, `https://github.com/jancurn/act-analyse-pages.git#develop:some/dir` will check out the `develop` branch and set `some/dir` as a context directory for the Docker build.

Note that you can easily set up an integration where the actor is automatically rebuilt on every commit to the Git repository. For more details, see [GitHub integration](#github-integration).

#### [](#source-git-repo-private)Private repositories

If your source code is hosted in a private Git repository then you need to configure deployment key. Deployment key is different for each actor and might be used only once at Git hosting of your choice (Github, Bitbucket, Gitlab, etc.).

To obtain the key click at the **deployment key** link under the **Git URL** text input and follow the instructions there.

### [](#source-tarball)Zip file

The source code for the actor can also be located in a Zip archive hosted on an external URL. This option enables integration with arbitrary source code or continuous integration systems. Similarly as with the [Git repository](#source-git-repo), the source code can consist of multiple files and directories, can contain a custom `Dockerfile` and the actor description is taken from `README.md`.

### [](#source-github-gist)GitHub Gist

Sometimes having a full Git repository or a hosted Zip file might be overly complicated for your small project, but you still want to have the source code in multiple files. In this case, you can simply put your source code into a [GitHub Gist](https://gist.github.com/). For example:

[https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7](https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7)

Then set the **Source Type** to **GitHub Gist** and paste the Gist URL as follows:

![GitHub Gist settings](/img/docs/actor/gist-settings.png)

Note that the example actor is available in the Apify Store as [apify/example-github-gist](https://apify.com/apify/example-github-gist).

Similarly as with the [Git repository](#source-git-repo), the source code can consist of multiple files and directories, it can contain a custom `Dockerfile` and the actor description is taken from `README.md`.

### [](#custom-dockerfile)Custom Dockerfile

Internally, Apify uses Docker to build and run actors. To control the build of the actor, you can create a custom `Dockerfile` in the root of the Git repository or Zip directory. Note that this option is not available for the [Single JavaScript file](#hosted-source-file) option. If the `Dockerfile` is missing, the system uses the following default:

    FROM apify/actor-node-basic

    # Copy all files and directories from the directory to the Docker image
    COPY . ./

    # Install NPM packages, skip optional and development dependencies to keep the image small,
    # avoid logging to much and show log the dependency tree
    RUN npm install --quiet --only=prod --no-optional \
     && npm list

For more information about Dockerfile syntax and commands, see the [Dockerfile reference _open_in_new_](https://docs.docker.com/engine/reference/builder/).

Note that `apify/actor-node-basic` is a base Docker image provided by Apify. There are other base images with other features available. However, you can use arbitrary Docker images as the base for your actors, although using the Apify images has some performance advantages. See [Base images](#base-images) for details.

By default, all Apify base Docker images start your Node.js application same way as `npm start` does, i.e. by running the command specified in the `package.json` file under the `scripts` - `start` key. The default `package.json` file looks similarly to this one:

    {
      "description": "Anonymous actor on the Apify platform",
      "version": "0.0.1",
      "license": "UNLICENSED",
      "main": "main.js",
      "scripts": {
        "start": "node main.js"
      },
      "dependencies": {
        "apify": ">=0.8.15",
        "apify-client": ">=0.3.0",
      },
      "repository": {}
    }

**This means that by default the system expects the source code to be in the `main.js` file.** If you want to override this behavior, use a custom `package.json` and/or `Dockerfile`.


### [](#github-integration)GitHub integration

If the source code of an actor is hosted in a [Git repository](#git-repository), it is possible to set up integration so that on every push to the Git repository the actor is automatically rebuilt. For that, you only need to set up a webhook in your Git source control system that will invoke the [Build actor](/docs/api/v2/#/reference/actors/build-collection/build-actor) API endpoint on every push to Git repository.

For example, for repositories on GitHub it can be done using the following steps. First, go to the actor detail page, open the **API** tab and copy the **Build actor** API endpoint URL. It should look something like this:

    https://api.apify.com/v2/acts/apify~hello-world/builds?token=<API_TOKEN>&version=0.1

Then go to your GitHub repository, click **Settings**, select **Webhooks** tab and click **Add webhook**. Paste the API URL to the **Payload URL** as follows:

![GitHub integration](/img/docs/actor/github-integration.png)

And that's it! Now your actor should automatically rebuild on every push to the GitHub repository.

### [](#source-env-vars)Custom environment variables

The actor owner can specify custom environment variables that are set to the actor's process during the run. Sensitive environment variables such as passwords or API tokens can be protected by setting the **Secret** option. With this option enabled, the value of the environment variable is encrypted and it will not be visible in the app or APIs, and the value is redacted from actor logs to avoid the accidental leakage of sensitive data.

![Custom environment variables](/img/docs/actor/source-env-vars.png)

Note that the custom environment variables are fixed during the build of the actor and cannot be changed later. See the [Build](#build) section for details.

To access environment variables in Node.js, use the `process.env` object, for example:

    console.log(process.env.SMTP_HOST);

The actor runtime sets additional environment variables for the actor process during the run. See [Environment variables](#run-env-vars) for details.

### [](#versioning)Versioning

In order to enable active development, the actor can have multiple versions of the source code and associated settings, such as the **Base image** and **Environment**. Each version is denoted by a version number of the form `MAJOR.MINOR`; the version numbers should adhere to the [Semantic Versioning _open_in_new_](http://semver.org/) logic.

For example, the actor can have a production version `1.1`, a beta version `1.2` that contains new features but is still backwards compatible, and a development version `2.0` that contains breaking changes.

The versions of the actors are built and run separately. For details, see [Build](#build) and [Run](#run).

### [](#local-development)Local development

It is possible to develop actors locally on your computer and then only deploy them to the Apify cloud when they are ready. This is especially useful if you're using Git integration. See [Git repository](#source-git-repo) for more details. The boilerplate for creating an actor in a Git repository is available on [GitHub](https://github.com/apifytech/actor-quick-start).

In order to test the input and output of your actors on your local machine, you might define the `APIFY_DEV_KEY_VALUE_STORE_DIR` environment variable, which will cause the `apify` NPM package to emulate the key-value store locally using files in a directory. For more details, please see the [`apify` package documentation](https://sdk.apify.com/).

Unfortunately, not all features of the Apify platform can be emulated locally, therefore you might still need to let the [`apify`](/docs/api/apify-client-js/latest) NPM package use your API token in order to interact with the Apify platform. The simplest way to achieve that is by setting the `APIFY_TOKEN` environment variable on your local development machine.

### [](#input-schema)Input schema

Actor source files may contain an input schema defining the input that actor accepts and the UI components used for input at Apify platform. Using input schema you can provide UI to actor users that is easy to use and also ensure that input of your actor is valid.

For more information on this topic see [input schema documentation](/docs/actor/input-schema) on a separate page.

### [](#metamorph)Metamorph

The metamorph operation transforms an actor run into a run of another actor with a new input. This feature is useful if you want to use another actor to finish the work of your current actor, instead of internally starting a new actor run and waiting for its finish. With metamorph, you can easily create new actors on top of existing ones, and give your users nicer input structure and user-interface for the final actor. For the users of your actors, the metamorph operation is completely transparent, they will just see your actor got the work done.

Internally, the system stops the Docker container corresponding to the actor run and starts a new container using a different Docker image. All the default storages are preserved and the new input is stored under the `INPUT-METAMORPH-1` key in the same default key-value store.

To make you actor compatible with metamorph operation use `Apify.getInput()` instead of `Apify.getValue('INPUT')`. This method will fetch the input using the right key `INPUT-METAMORPH-1` in a case of metamorphed run.

For example, imagine you have an actor that accepts a hotel URL on input and then internally uses the [apify/web-scraper](https://www.apify.com/apify/web-scraper) actor to scrape all the hotel reviews. The metamorphing code would look as follows:

    const Apify = require('apify');

    Apify.main(async () => {
        // Get input of your actor.
        const { hotelUrl } = await Apify.getInput();

        // Create input for apify/web-scraper
        const newInput = {
            startUrls: [{ url: hotelUrl }],
            pageFunction: () => {
                // Here you pass the page function that scrapes all the reviews ...
            },
            // ... and here would be all the additional input parameters.
        };

        // Transform the actor run to apify/web-scraper with the new input.
        await Apify.metamorph('apify/web-scraper', newInput);

        // The line here will never be reached, because the actor run will be interrupted.
    });

## [](#build)Build

Before the actor can be run, it first needs to be built. The build effectively creates a snapshot of a specific version of the actor's settings such as the [Source code](#source-code) and [Environment variables](#environemnt-variables), and creates a Docker image that contains everything the actor needs for its run, including necessary NPM packages, web browsers, etc.

Each build is assigned a unique build number of the form `MAJOR.MINOR.BUILD` (e.g. `1.2.345`), where `MAJOR.MINOR` corresponds to the actor version number (see [Versions](#versions)) and `BUILD` is an automatically-incremented number starting at `1`.

By default, the build has a timeout of 300 seconds and consumes 1024 MB of memory from the user's memory limit. See the [Resource limits](#resource-limits) section for more details.

### [](#build-tags)Tags

When running the actor, the caller needs to specify which actor build should actually be used. To simplify this process, the builds can be associated with a tag such `latest` or `beta`, which can be used instead of the version number when running the actor. The tags are unique - only one build can be associated with a specific tag.

To set a tag for builds of a specific actor version, set the **Build tag** property. Whenever a new build of the version is successfully finished, it is automatically assigned the tag. By default, the builds are set the `latest` tag.

### [](#base-images)Base images

Apify provides the following Docker images that can be used as a base for user actors:

*   **Node.js 10 on Alpine Linux** ([apify/actor-node-basic _open_in_new_](https://hub.docker.com/r/apify/actor-node-basic/))  
    Slim and efficient image, contains only the most elementary tools. Note that neither Puppeteer nor Selenium Webdriver is available in this image.
*   **Node.js 10 + Chrome on Debian** ([apify/actor-node-chrome _open_in_new_](https://hub.docker.com/r/apify/actor-node-chrome/))  
    Larger image with a bundled both Chromium and Google Chrome browsers, [puppeteer](https://www.npmjs.com/package/puppeteer) and [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) NPM packages. With this image, you can use both [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchPuppeteer) and [`Apify.launchWebDriver()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchWebDriver) functions. Note that Chrome requires quite a lot of resources, therefore the actor should run with at least 1024 MB of memory.
*   **Node.js 10 + Chrome + Xvfb on Debian** ([apify/actor-node-chrome-xvfb _open_in_new_](https://hub.docker.com/r/apify/actor-node-chrome-xvfb/))  
    This image extends `apify/actor-node-chrome` with X virtual framebuffer ([Xvfb](https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml)) in order to support non-headless browsing. Note that with this image the [`Apify.launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchPuppeteer) and [`Apify.launchWebDriver()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchWebDriver) functions open non-headless Chrome by default.
*   **[DEPRECATED] Node.js 10 + Puppeteer on Debian** ([apify/actor-node-puppeteer _open_in_new_](https://hub.docker.com/r/apify/actor-node-puppeteer/))  
    This image is deprecated and will be removed in the future. Use the `apify/actor-node-chrome` image instead.

All images come in two versions: the `latest` tag corresponds to the stable version and `beta` to images where we test new features. Use the beta version at your own risk.

Note that all Apify Docker images are pre-cached on Apify servers in order to speed-up the actor builds and runs. The source code used to generate the images is available in the [apify-actor-docker _open_in_new_](https://github.com/apifytech/apify-actor-docker) GitHub repository.

### [](#build-cache)Cache

By default, the build process pulls latest copies of all necessary Docker images and builds each new layer of Docker image from scratch. To speed up the build process, the user can invoke the build using the **Quick run** option in the **Source** tab, or by passing the `useCache` parameter in the API. See API reference for more details.

### [](#build-lifecycle)Lifecycle

Each build starts with the initial status `READY` and goes through one or more transitional statuses to one of the terminal statuses.

|Status|Type|Description|
|--- |--- |--- |
|`READY`|initial|Started but not allocated to any worker yet|
|`RUNNING`|transitional|Executing on a worker|
|`SUCCEEDED`|terminal|Finished successfully|
|`FAILED`|terminal|Build failed|
|`TIMING-OUT`|transitional|Timing out now|
|`TIMED-OUT`|terminal|Timed out|
|`ABORTING`|transitional|Being aborted by user|
|`ABORTED`|terminal|Aborted by user|

## [](#run)Run

The actor can be invoked in a number of ways. One option is to start the actor manually in **Console** in the app:

![Apify actor run console](/img/docs/actor/run-console.png)

The following table describes the run settings:

|||
|--- |--- |
|**Build**|Tag or number of the build to run (e.g. `latest` or `1.2.34`).|
|**Timeout**|Timeout for the actor run in seconds. Zero value means there is no timeout.|
|**Memory**|Amount of memory allocated for the actor run, in megabytes.|
|**Input**|Input data for the actor. The maximum length is 1M characters.|
|**Content type**|Indicates what kind of data is in the input (e.g. `application/json`).|


The owner of the actor can specify default values for all the above settings in the **Default run configuration** section in the app. If the actor caller does not specify a particular setting, the default value is used.

The actor can also be invoked using the Apify API by sending a HTTP POST request to the [Run actor](/docs/api/v2/#/reference/actors/run-collection/run-actor) API endpoint, such as:

    https://api.apify.com/v2/acts/apify~hello-world/runs?token=<YOUR_API_TOKEN>

The actor's input and its content type can be passed as a payload of the POST request and additional options can be specified using URL query parameters. For more details, see the [Run actor](/docs/api/v2/#/reference/actors/run-collection/run-actor) section in the API reference.

Actors can also be invoked programmatically from other actors using the [`call()`](https://sdk.apify.com/docs/api/apify#module_Apify.call) function provided by the [`apify`](https://sdk.apify.com/) NPM package. For example:

    const run = await Apify.call('apify/hello-world', { message: 'Hello!' });
    console.dir(run.output);

The newly started actor runs under the same user account as the initial actor and therefore all resources consumed are charged to the same user account. This allows more complex actors to be built using simpler actors built and owned by other users.

Internally, the `call()` function takes the user's API token from the `APIFY_TOKEN` environment variable, then it invokes the [Run actor](/docs/api/v2/#/reference/actors/run-collection/run-actor) API endpoint, waits for the actor to finish and reads its output using the [Get record](/docs/api/v2/#/reference/key-value-stores/record/get-record) API endpoint.

### [](#input-output)Input and output

As demonstrated in the hello world example above, actors can accept input and generate output. Both input and output are stored in a key-value store that is created when the actor is started, under the `INPUT` and `OUTPUT` keys, respectively. Note that the actor can store other values under arbitrary keys, for example crawling results or screenshots of web pages.

The key-value store associated with the actor run can be conveniently accessed using the [`getValue()`](https://sdk.apify.com/docs/api/apify#module_Apify.getValue) and [`setValue()`](https://sdk.apify.com/docs/api/apify#module_Apify.setValue) functions provided by the `apify` NPM package. Internally, these functions read the ID of the key-value store from the `APIFY_DEFAULT_KEY_VALUE_STORE_ID` environment variable and then access the store using the Apify API. For more details about the key-value stores, go to the [Storage](#storage) section.

The input can be passed to the actor either manually in the Console or using a POST payload when running the actor using API. See [Run](#run) section for details.

### [](#run-env-vars)Environment variables

Aside from [custom environment variables](#source-env-vars), the actor's process has several environment variables set to provide it with context:

|||
|--- |--- |
|`APIFY_ACTOR_ID`|ID of the actor.|
|`APIFY_ACTOR_RUN_ID`|ID of the actor run.|
|`APIFY_ACTOR_TASK_ID`|ID of the actor task. It's empty if actor is run outside of any task, e.g. directly using the API.|
|`APIFY_ACTOR_EVENTS_WS_URL`|Websocket URL where actor may listen for events from Actor plaform. See [documentation](https://sdk.apify.com/docs/api/apify#module_Apify.events) for more information.|
|`APIFY_DEFAULT_DATASET_ID`|ID of the dataset where you can push the data.|
|`APIFY_DEFAULT_KEY_VALUE_STORE_ID`|ID of the key-value store where the actor's input and output data is stored.|
|`APIFY_DEFAULT_REQUEST_QUEUE_ID`|ID of the request queue that stores and handles requests that you enqueue.|
|`APIFY_INPUT_KEY`|The key of the record in the default key-value store that holds the actor input. Typically it's `INPUT`, but it might be something else.|
|`APIFY_HEADLESS`|If set to `1`, the web browsers inside the actor should run in the headless mode because there is no windowing system available.|
|`APIFY_IS_AT_HOME`|Returns `1` if the act is running on Apify servers.|
|`APIFY_MEMORY_MBYTES`|Indicates the size of memory allocated for the actor run, in megabytes. It can be used by actors to optimize their memory usage.|
|`APIFY_PROXY_PASSWORD`|The [Apify Proxy](/docs/proxy) password of the user who started the actor.|
|`APIFY_STARTED_AT`|Date when the actor was started.|
|`APIFY_TIMEOUT_AT`|Date when the actor will time out.|
|`APIFY_TOKEN`|The API token of the user who started the actor.|
|`APIFY_USER_ID`|ID of the user who started the actor. Note that it might be different than the owner of the actor.|
|`APIFY_CONTAINER_PORT`|TCP port on which the actor can start a HTTP server to receive messages from the outside world. See [Container web server](#container-web-server) section for more details.|
|`APIFY_CONTAINER_URL`|A unique public URL under which the actor run web server is accessible from the outside world. See [Container web server](#container-web-server) section for more details.|


Dates are always in the UTC timezone and are represented in simplified extended ISO format ([ISO 8601 _open_in_new_](https://en.wikipedia.org/wiki/ISO_8601)), e.g. `2017-10-13T14:23:37.281Z`

To access environment variables in Node.js, use the `process.env` object, for example:

    console.log(process.env.APIFY_USER_ID);

### [](#resource-limits)Resource limits

Actors run inside a Docker container whose resources are limited. When invoking the actor, the caller has to specify the amount of memory allocated for the actor. Additionally, each user has a certain total limit of memory for running actors. The sum of memory allocated for all running actors and builds needs to fit into this limit, otherwise the user cannot start a new actor. For more details, see [Limits](#limits).

The share of CPU is computed automatically from the memory as follows: for each 4096 MB of memory, the actor gets 1 full CPU core. For other amounts of memory the number of CPU cores is computed fractionally. For example, an actor with 1024 MB of memory will have a 1/4 share of a CPU core.

The actor has hard disk space limited by twice the amount of memory. For example, an actor with 1024 MB of memory will have 2048 MB of disk available.

### [](#state-persistence)State persistence

Unlike traditional serverless platforms, actors have no limits on the duration of an actor run. However, that means that an actor might need to be restarted from time to time, e.g. when the server it's running on is to be shutdown. Actors need to account for this possibility. For short-running actors, the chance of a restart is quite low and the cost of repeated runs is low, so restarts can be ignored. However, for long-running actors a restart might be very costly and therefore such actors should periodically persist their state, possibly to the key-value store associated with the actor run. On start, actors should first check whether there is some state stored and if so they should continue where they left off.

### [](#run-lifecycle)Lifecycle

Each run starts with the initial status `READY` and goes through one or more transitional statuses to one of the terminal statuses.

|Status|Type|Description|
|--- |--- |--- |
|`READY`|initial|Started but not allocated to any worker yet|
|`RUNNING`|transitional|Executing on a worker|
|`SUCCEEDED`|terminal|Finished successfully|
|`FAILED`|terminal|Run failed|
|`TIMING-OUT`|transitional|Timing out now|
|`TIMED-OUT`|terminal|Timed out|
|`ABORTING`|transitional|Being aborted by user|
|`ABORTED`|terminal|Aborted by user|

### [](#run-resurrect)Resurrection of finished run

Any actor run in terminal state, i.e. run with status `FINISHED`, `FAILED`, `ABORTED` and `TIMED-OUT`, might be resurrected back to a `RUNNING` state. This is helpful in many cases, for example when the timeout for actor run was too low or any a case of an unexpected error.

The whole process of resurrection looks as follows:

*   Run status will be updated to a `RUNNING` and its container will be restarted with the same storages (the same behaviour as when the run gets migrated to the new server).
*   Existing run log will be discarded. If you need to backup it then please download it before you resurrect this run.
*   Updated duration will include the time when actor was not running. This does not affect compute units consumption.
*   Timeout will be counted from the point when this actor run was resurrected.

Resurrection can be peformed in Apify app using the **resurrect** button or via API using the [resurrect run](/docs/api/v2#/reference/actors/resurrect-run) API endpoint.

### [](#container-web-server)Container web server

Each actor run is assigned a unique hard-to-guess URL (e.g. `http://kmdo7wpzlshygi.runs.apify.net`), which enables HTTP access to an optional web server running inside the actor run's Docker container. The URL is available in the following places:

*   In the web application, on the actor run details page as the **Container URL** field.
*   In the API as the `containerUrl` property of the [Run object](./api/v2#/reference/actor/run-object/get-run).
*   In the actor run's container as the `APIFY_CONTAINER_URL` environment variable.

The web server running inside the container must listen at the port defined by the `APIFY_CONTAINER_PORT` environment variable (typically 4321). If you want to use another port, simply define the `APIFY_CONTAINER_PORT` environment variable with the desired port number in your actor version configuration - see [Custom environment variable](#source-env-vars) for details.

The following example demonstrates how to start a simple web server in your actor:

    const Apify = require('apify');
    const express = require('express');

    const app = express()
    const port = process.env.APIFY_CONTAINER_PORT;

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => console.log(`Web server is listening and can be accessed at ${process.env.APIFY_CONTAINER_URL}!`))

    Apify.main(async () => {
        // Let the actor run for an hour.
        await Apify.utils.sleep(60 * 60 * 1000);
    });

### [](#data-retention)Data retention

Actor run gets deleted along with its default storages (key-value store, dataset, request queue) after a data retention period which is based on [subscription plan](/pricing) of a user.

## [](#publishing)Publishing

Actors can be private or public. Private actors can only be accessed and started by their owner, while public actor are shown in the [store](/store) and can be run by anyone. Each public actor has a globally unique identifier that consists of the owner's username and the actor name, e.g. [apify/hello-world](https://apify.com/apify/hello-world).

To publish your actor, go to **Settings → Permissions** on the actor detail page and click the **Publish** button. You'll need to have a username set. This can be done on the [Profile](https://my.apify.com/account#/profile) page.

The short actor description shown in the store is taken from **Settings → Description**. Additionally, if the actor's source code is hosted in a [Git repository](#source-git-repo), [Zip file](#source-tarball) or [GitHub Gist](#source-github-gist), you can add a long description in [Markdown _open_in_new_](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) language to the `README.md` or `README` files in the root of the source code directory. To see an example of how this looks, go to [apify/web-scraper](https://apify.com/apify/web-scraper).

**IMPORTANT:** Note that if your actor is public and used by other people, its usage is not charged towards your account. The user running the actor is always the one who pays for the computational resources consumed by an actor's execution.

## [](#examples)Examples

This section provides examples of actors using various features of the Apify platform. All these examples and many more are also available in the [store](/store?type=acts&search=user%3Aapify%20example).

### [](#examples-puppeteer)Puppeteer

This example demonstrates how to use headless Chrome with Puppeteer to open a web page, determines its dimensions, save a screenshot and print it to PDF. The actor can be found in the Apify store as [apify/example-puppeteer](https://apify.com/apify/example-puppeteer).

    const Apify = require('apify');

    Apify.main(async () => {
       const input = await Apify.getInput();

       if (!input || !input.url) throw new Error('Invalid input, must be a JSON object with the "url" field!');

       console.log('Launching Puppeteer...');
       const browser = await Apify.launchPuppeteer();

       console.log(`Opening URL: ${input.url}`);
       const page = await browser.newPage();
       await page.goto(input.url);

       // Get the "viewport" of the page, as reported by the page.
       console.log('Determining page dimensions...');
       const dimensions = await page.evaluate(() => ({
           width: document.documentElement.clientWidth,
           height: document.documentElement.clientHeight,
           deviceScaleFactor: window.devicePixelRatio
       }));
       console.log(`Dimension: ${JSON.stringify(dimensions)}`);

       // Grab a screenshot
       console.log('Saving screenshot...');
       const screenshotBuffer = await page.screenshot();
       await Apify.setValue('screenshot.png', screenshotBuffer, { contentType: 'image/png' });

       console.log('Saving PDF snapshot...');
       const pdfBuffer = await page.pdf({ format: 'A4'});
       await Apify.setValue('page.pdf', pdfBuffer, { contentType: 'application/pdf' });

       console.log('Closing Puppeteer...');
       await browser.close();

       console.log('Done.');
       console.log('You can check the output in the key-value on the following URLs:');
       const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
       console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/screenshot.png`)
       console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/page.pdf`);
    });

The code above uses the [`launchPuppeteer()`](https://sdk.apify.com/docs/api/apify#module_Apify.launchPuppeteer) function provided by the [`apify`](https://sdk.apify.com/) NPM package. The function launches Puppeteer with several settings that enable it to run in an actor. Note that the actor needs to have **Base image** set to [Node.js 10 + Puppeteer on Debian](#base-images) in order to run Puppeteer.

### [](#examples-dockerfile)Custom Dockerfile

This example demonstrates how to create an actor written in PHP using a custom Dockerfile. For more information, see the [Custom Dockerfile](#custom-dockerfile) section. The Dockerfile is based on the [`php:7.0-cli` _open_in_new_](https://hub.docker.com/_/php/) Docker image that contains everything needed to run PHP in a terminal.

`Dockerfile` contains only two commands. The first copies source code into the container and the second executes `main.php`.

The actor can be found in the Apify store as [apify/example-php](https://apify.com/apify/example-php).

#### Dockerfile

    FROM php:7.0-cli
    COPY ./* ./
    CMD [ "php", "./main.php" ]

#### main.php

    <?php
    print "Starting ...\n";
    print "ENV vars:\n";
    print_r($_ENV);
    print "Fetching http://example.com ...\n";
    $exampleComHtml = file_get_contents('http://example.com');
    print "Searching for <h1> tag contents ...\n";
    preg_match_all('/<h1>(.*?)<\/h1>/', $exampleComHtml, $matches);
    print "Found: " . $matches[1][0] . "\n";
    print "I am done!\n";

### [](#examples-state-persistence)State persistence

This actor demonstrates how to persist a state, so that on restart the actor can continue where it left off. For more information, see the [State persistence](#state-persistence) section. The actor simply counts from one up. In each run it prints one number. Its state (counter position) is stored in a named [key-value store](/docs/storage#key-value-store) called `example-counter`. You will find it in the [Storage](https://my.apify.com/key-value-stores) section of the app after you run the actor.

The actor can be found in the Apify store as [apify/example-counter](https://apify.com/apify/example-counter).

    const Apify = require('apify');

    Apify.main(async () => {
        const keyValueStores = Apify.client.keyValueStores;

        // Get store with name 'example-counter'.
        const store = await keyValueStores.getOrCreateStore({
            storeName: 'example-counter',
        });

        // Get counter state record from store.
        const record = await keyValueStores.getRecord({
            key: 'counter',
            storeId: store.id,
        });

        // If there is no such record then start from zero.
        let counter = record ? record.body : 0;

        // Increase counter, print and set as output.
        counter ++;
        console.log(`Counter: ${counter}`);
        Apify.setValue('OUTPUT', counter);

        // Save increased value back to store.
        await keyValueStores.putRecord({
            storeId: store.id,
            key: 'counter',
            body: counter.toString(), // Record body must be a string or buffer!
        });
    });

## [](#limits)Limits

This section describes various resource limits of the Apify platform. Do you need to increase any of them? Please [contact us](/contact).

|Description|Value|
|--- |--- |
|Build memory size|1024 MB|
|Build timeout|600 secs|
|Build/run disk size|2x job memory limit|
|Run minimum memory|128 MB|
|Run maximum memory|32768 MB|
|Maximum combined memory of all running jobs (free accounts)|8192 MB|
|Maximum combined memory of all running jobs (paid accounts)|65536 MB|
