---
title: Source code
description: Documentation of Apify actors - a serverless computing jobs that enable execution of long-running web scraping and automation tasks in the cloud.
menuWeight: 3.2
---

# [](#source)Source code

The **Source type** setting determines the location of the source code for the actor. It can have one of the following values: [Single JavaScript file](#hosted-source-file), [Multiple source files](#hosted-source-files), [Git repository](#source-git-repo), [Zip file](#source-tarball) or [GitHub Gist](#source-github-gist).

## [](#hosted-source-file)Single JavaScript file

The source code of the actor can be hosted directly on Apify. All the code needs to be in a single file and written in JavaScript / Node.js. The version of Node.js is determined by the **Base image** setting - see [Base images]({{@link actor/build.md#base-images}}) for the description of possible options.

The hosted source is especially useful for simple actors. The source code can require arbitrary NPM packages. For example:

    const _ = require('underscore');
    const request = require('request');

During the build process, the source code is scanned for occurrences of the `require()` function and the corresponding NPM dependencies are automatically added to the `package.json` file by running:

    npm install underscore request --save --only=prod --no-optional

Note that certain NPM packages need additional tools for their installation, such as a C compiler or Python interpreter. If these tools are not available in the base Docker image, the build will fail. If that happens, try to change the base image to **Node.js 10 + Puppeteer on Debian**, because it contains much more tools than other images. Alternatively, you can use switch to the [multifile editor](#custom-dockerfile) and create your own docker image configuration.

## [](#hosted-source-files)Multiple source files

If the source code of the actor requires the use of multiple files/directories, then it can be hosted on Apify platform with this option. This is particulary useful when you need to add [`INPUT_SCHEMA.json`]({{@link actor/source_code.md#input-schema}}) or `README.md` to your actor, or if you want to create your actor in other language then JavaScript.

The only required file for multifile is `Dockerfile`, all other files depend on your `Dockerfile` settings. By default Apify's custom NodeJS `Dockerfile` is used, which requires `main.js` file containing your source code and `package.json` file, with package configuration for npm.

Unlike the [Single Javascript file](#hosted-source-file) option, `package.json` is not automaticaly generated, and you need to configure it yourself.

See [Custom Dockerfile]({{@link actor/source_code.md#custom-dockerfile}}) and [Base Images]({{@link actor/build.md#base-images}}) for more information about creating your own Dockerfile and using Apify's prepared base images.

## [](#source-git-repo)Git repository

If the source code of the actor is hosted externally in a Git repository, it can consist of multiple files and directories, use its own `Dockerfile` to control the build process (see [Custom Dockerfile]({{@link actor/source_code.md#custom-dockerfile}}) for details) and have a user description in store fetched from the `README.md` file. The location of the repository is specified by the **Git URL** setting, which can be an `https`, `git` or `ssh` URL.

To help you get started quickly, you can use the [apify/quick-start](https://apify.com/apify/quick-start) actor which contains all the boilerplate necessary when creating a new actor hosted on Git. The source code is available on [GitHub](https://github.com/apifytech/actor-quick-start).

To specify a Git branch or tag to check out, add a URL fragment to the URL. For example, to check out the `develop` branch, specify a URL such as `https://github.com/jancurn/act-analyse-pages.git#develop`

Optionally, the second part of the fragment in the Git URL (separated by a colon) specifies the context directory for the Docker build. For example, `https://github.com/jancurn/act-analyse-pages.git#develop:some/dir` will check out the `develop` branch and set `some/dir` as a context directory for the Docker build.

Note that you can easily set up an integration where the actor is automatically rebuilt on every commit to the Git repository. For more details, see [GitHub integration]({{@link actor/source_code.md#github-integration}}).

### [](#source-git-repo-private)Private repositories

If your source code is hosted in a private Git repository then you need to configure deployment key. Deployment key is different for each actor and might be used only once at Git hosting of your choice (Github, Bitbucket, Gitlab, etc.).

To obtain the key click at the **deployment key** link under the **Git URL** text input and follow the instructions there.

## [](#source-tarball)Zip file

The source code for the actor can also be located in a Zip archive hosted on an external URL. This option enables integration with arbitrary source code or continuous integration systems. Similarly as with the [Git repository]({{@link actor/source_code.md#source-git-repo}}), the source code can consist of multiple files and directories, can contain a custom `Dockerfile` and the actor description is taken from `README.md`.

## [](#source-github-gist)GitHub Gist

Sometimes having a full Git repository or a hosted Zip file might be overly complicated for your small project, but you still want to have the source code in multiple files. In this case, you can simply put your source code into a [GitHub Gist](https://gist.github.com/). For example:

[https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7](https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7)

Then set the **Source Type** to **GitHub Gist** and paste the Gist URL as follows:

![GitHub Gist settings]({{@asset actor/images/gist-settings.png}})

Note that the example actor is available in the Apify Store as [apify/example-github-gist](https://apify.com/apify/example-github-gist).

Similarly as with the [Git repository]({{@link actor/source_code.md#source-git-repo}}), the source code can consist of multiple files and directories, it can contain a custom `Dockerfile` and the actor description is taken from `README.md`.

## [](#custom-dockerfile)Custom Dockerfile

Internally, Apify uses Docker to build and run actors. To control the build of the actor, you can create a custom `Dockerfile` in the root of the Git repository or Zip directory. Note that this option is not available for the [Single JavaScript file]({{@link actor/source_code.md#hosted-source-file}}) option. If the `Dockerfile` is missing, the system uses the following default:

    FROM apify/actor-node-basic

    # Copy all files and directories from the directory to the Docker image
    COPY . ./

    # Install NPM packages, skip optional and development dependencies to keep the image small,
    # avoid logging to much and show log the dependency tree
    RUN npm install --quiet --only=prod --no-optional \
     && npm list

For more information about Dockerfile syntax and commands, see the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

Note that `apify/actor-node-basic` is a base Docker image provided by Apify. There are other base images with other features available. However, you can use arbitrary Docker images as the base for your actors, although using the Apify images has some performance advantages. See [Base images]({{@link actor/build.md#base-images}}) for details.

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


## [](#github-integration)GitHub integration

If the source code of an actor is hosted in a [Git repository](#git-repository), it is possible to set up integration so that on every push to the Git repository the actor is automatically rebuilt. For that, you only need to set up a webhook in your Git source control system that will invoke the [Build actor](/docs/api/v2/#/reference/actors/build-collection/build-actor) API endpoint on every push to Git repository.

For example, for repositories on GitHub it can be done using the following steps. First, go to the actor detail page, open the **API** tab and copy the **Build actor** API endpoint URL. It should look something like this:

    https://api.apify.com/v2/acts/apify~hello-world/builds?token=<API_TOKEN>&version=0.1

Then go to your GitHub repository, click **Settings**, select **Webhooks** tab and click **Add webhook**. Paste the API URL to the **Payload URL** as follows:

![GitHub integration]({{@asset actor/images/github-integration.png}})

And that's it! Now your actor should automatically rebuild on every push to the GitHub repository.

## [](#custom-environment-variables)Custom environment variables

The actor owner can specify custom environment variables that are set to the actor's process during the run. Sensitive environment variables such as passwords or API tokens can be protected by setting the **Secret** option. With this option enabled, the value of the environment variable is encrypted and it will not be visible in the app or APIs, and the value is redacted from actor logs to avoid the accidental leakage of sensitive data.

![Custom environment variables]({{@asset actor/images/source-env-vars.png}})

Note that the custom environment variables are fixed during the build of the actor and cannot be changed later. See the [Build]({{@link actor/build.md#build}}) section for details.

To access environment variables in Node.js, use the `process.env` object, for example:

    console.log(process.env.SMTP_HOST);

The actor runtime sets additional environment variables for the actor process during the run. See [Environment variables]({{@link actor/run.md#run-env-vars}}) for details.

## [](#versioning)Versioning

In order to enable active development, the actor can have multiple versions of the source code and associated settings, such as the **Base image** and **Environment**. Each version is denoted by a version number of the form `MAJOR.MINOR`; the version numbers should adhere to the [Semantic Versioning](http://semver.org/) logic.

For example, the actor can have a production version `1.1`, a beta version `1.2` that contains new features but is still backwards compatible, and a development version `2.0` that contains breaking changes.

The versions of the actors are built and run separately. For details, see [Build]({{@link actor/build.md}}) and [Run]({{@link actor/run.md}}).

## [](#local-development)Local development

It is possible to develop actors locally on your computer and then only deploy them to the Apify cloud when they are ready. This is especially useful if you're using Git integration. See [Git repository]({{@link actor/source_code.md#source-git-repo}}) for more details. The boilerplate for creating an actor in a Git repository is available on [GitHub](https://github.com/apifytech/actor-quick-start).

In order to test the input and output of your actors on your local machine, you might define the `APIFY_DEV_KEY_VALUE_STORE_DIR` environment variable, which will cause the `apify` NPM package to emulate the key-value store locally using files in a directory. For more details, please see the [`apify` package documentation](https://sdk.apify.com/).

Unfortunately, not all features of the Apify platform can be emulated locally, therefore you might still need to let the [`apify`](https://apify.com/docs/api/apify-client-js/latest) NPM package use your API token in order to interact with the Apify platform. The simplest way to achieve that is by setting the `APIFY_TOKEN` environment variable on your local development machine.

## [](#input-schema)Input schema

Actor source files may contain an input schema defining the input that actor accepts and the UI components used for input at Apify platform. Using input schema you can provide UI to actor users that is easy to use and also ensure that input of your actor is valid.

For more information on this topic see [input schema documentation](https://apify.com/docs/actor/input-schema) on a separate page.

## [](#metamorph)Metamorph

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
