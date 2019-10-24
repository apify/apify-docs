---
title: CLI
description: Apify command line interface (CLI) helps you to create, develop, run and deploy Apify Actor acts from your local computer.
menuWeight: 11
---

# [](./SDK)SDK

# [](#apify-command-line-client--apify-cli-)Apify command-line client (apify-cli)

[![npm version](https://badge.fury.io/js/apify-cli.svg)](http://badge.fury.io/js/apify-cli) [![Build Status](https://travis-ci.org/apifytech/apify-cli.svg?branch=master)](https://travis-ci.org/apifytech/apify-cli?branch=master)

Apify command-line client (CLI) helps you create, develop, build and run [Apify actors](https://www.apify.com/docs/actor), and manage the Apify cloud platform from any computer.

Apify actors are cloud programs that can perform arbitrary web scraping, automation or data processing job. They accept input, perform their job and generate output. While you can develop actors in an online IDE directly in the [Apify web application](https://my.apify.com/), for complex projects it is more convenient to develop actors locally on your computer using [Apify SDK](https://github.com/apifytech/apify-js) and only push the actors to the Apify cloud during deployment. This is where the Apify CLI comes in.

Note that actors running on the Apify platform are executed in Docker containers, so with an appropriate `Dockerfile` you can build your actors in any programming language. However, we recommend using JavaScript / Node.js, for which we provide most libraries and support.

## [](#installation)Installation

First, make sure you have [Node.js](https://nodejs.org) version 8 or higher installed on your computer:

    node --version

Install or upgrade Apify CLI by running:

    npm -g install apify-cli

Finally, you can test that the CLI was installed correctly:

    apify info

## [](#basic-usage)Basic usage

The following examples demonstrate the basic usage of Apify CLI.

### [](#create-a-new-actor-from-scratch)Create a new actor from scratch

    apify create my-hello-world

First, you will be prompted to select a template with the boilerplate for the actor, to help you get started quickly. The command will create a directory called `my-hello-world` that contains a Node.js project for the actor and a few configuration files.

### [](#create-a-new-actor-from-existing-project)Create a new actor from existing project

    cd ./my/awesome/project
    apify init

This command will only set up local actor development environment in an existing directory, i.e. it will create the `apify.json` file and `apify_storage` directory.

Before you can run your project using `apify run`, you have to set up the right start command in `package.json` under scripts.start. For example:

    {
        ...
        "scripts": {
            "start": "node your_main_file.js",
        },
        ...
    }

You can find more information about by running `apify help run`.

### [](#run-the-actor-locally)Run the actor locally

    cd my-hello-world
    apify run

This command runs the actor on your local machine. Now's your chance to develop the logic - or magic :smirk:

### [](#login-with-your-apify-account)Login with your Apify account

    apify login

Before you can interact with the Apify cloud, you need to [create an Apify account](https://my.apify.com/) and log in to it using the above command. You will be prompted for your [Apify API token](https://my.apify.com/account#/integrations). Note that the command will store the API token and other sensitive information to `~/.apify`.

### [](#push-the-actor-to-the-apify-cloud)Push the actor to the Apify cloud

    apify push

This command creates a ZIP archive with your project, uploads it to the Apify cloud and builds an actor from it.

### [](#run-an-actor-on-the-apify-cloud)Run an actor on the Apify cloud

    apify call

Runs the actor corresponding to the current directory on the Apify platform.

This command can also be used to run other actors, for example:

    apify call apify/hello-world

### [](#so-what--39-s-in-this--code-apify-json--code--file-)So what's in this `apify.json` file?

This file associates your local development project with an actor on the Apify platform. It contains information such as actor name, version, build tag and environment variables. Make sure you commit this file to the Git repository.

For example, `apify.json` file can look as follows:

    {
        "name": "dataset-to-mysql",
        "version": "0.1",
        "buildTag": "latest",
        "env": {
          "MYSQL_USER": "my_username",
          "MYSQL_PASSWORD": "@mySecretPassword"
        },
        "template": "basic"
    }

## [](#environment-variables)Environment variables

There are two options how you can set up environment variables for actors.

### [](#1--set-up-environment-variables-in--code-apify-json--code-)1\. Set up environment variables in `apify.json`

All keys from `env` will be set as environment variables into Apify platform after you push actor to Apify. Current values on Apify will be overridden.

    {
        "name": "dataset-to-mysql",
        "version": "0.1",
        "buildTag": "latest",
        "env": {
          "MYSQL_USER": "my_username",
          "MYSQL_PASSWORD": "@mySecretPassword"
        },
        "template": "basic"
    }

### [](#2--set-up-environment-variables-in-apify-app)2\. Set up environment variables in Apify app

In [Apify app](https://my.apify.com/actors) select your actor, you can set up variables into Source tab. After setting up variables in the app, set up `env` to `null` apify.json. Otherwise, variables from `apify.json` will override variables in the app.

    {
        "name": "dataset-to-mysql",
        "version": "0.1",
        "buildTag": "latest",
        "env": null,
        "template": "basic"
    }

#### [](#how-to-set-secret-environment-variables-in--code-apify-json--code-)How to set secret environment variables in `apify.json`

CLI provides commands to manage secrets environment variables. Secrets are stored to the ~/.apify directory. Adds a new secret using command:

    apify secrets:add mySecretPassword pwd1234

After adding a new secret you can use the secret in apify.json

    {
        "name": "dataset-to-mysql",
        ...
        "env": {
          "MYSQL_PASSWORD": "@mySecretPassword"
        },
        ...
    }

### [](#need-help-)Need help?

To see all CLI commands simply run:

    apify help

To get information about a specific command run:

    apify help COMMAND

Still haven't found what you were looking for? Please go to [Apify Help center](https://www.apify.com/help) or [contact us](https://www.apify.com/contact).

## [](#command-reference)Command reference

This section contains printouts of `apify help` for all commands.

*   [`apify call [ACTID]`](#apify-call-actid)
*   [`apify create [ACTORNAME]`](#apify-create-actorname)
*   [`apify info`](#apify-info)
*   [`apify init [ACTORNAME]`](#apify-init-actorname)
*   [`apify login`](#apify-login)
*   [`apify logout`](#apify-logout)
*   [`apify push [ACTORID]`](#apify-push-actorid)
*   [`apify run`](#apify-run)
*   [`apify secrets`](#apify-secrets)
*   [`apify secrets:add NAME VALUE`](#apify-secretsadd-name-value)
*   [`apify secrets:rm NAME`](#apify-secretsrm-name)
*   [`apify vis [PATH]`](#apify-vis-path)

## [](#-code-apify-call--actid---code-)`apify call [ACTID]`

Runs a specific actor remotely on the Apify cloud platform.

    USAGE
      $ apify call [ACTID]

    ARGUMENTS
      ACTID  Name or ID of the actor to run (e.g. "apify/hello-world" or "E2jjCZBezvAZnX8Rb"). If not provided, the command
             runs the remote actor specified in the "apify.json" file.

    OPTIONS
      -b, --build=build                      Tag or number of the build to run (e.g. "latest" or "1.2.34").
      -m, --memory=memory                    Amount of memory allocated for the actor run, in megabytes.
      -t, --timeout=timeout                  Timeout for the actor run in seconds. Zero value means there is no timeout.
      -w, --wait-for-finish=wait-for-finish  Seconds for waiting to run to finish, if no value passed, it waits forever.

    DESCRIPTION
      The actor is run under your current Apify account, therefore you need to be logged in by calling "apify login". It 
      takes input for the actor from the default local key-value store by default.

_See code: [src/commands/call.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/call.js)_

## [](#-code-apify-create--actorname---code-)`apify create [ACTORNAME]`

Creates a new actor project directory from a selected boilerplate template.

    USAGE
      $ apify create [ACTORNAME]

    ARGUMENTS
      ACTORNAME  Name of the actor and its directory

    OPTIONS
      -t, --template=hello_world|puppeteer_crawler|puppeteer_single_page|cheerio_crawler|basic_crawler  Boilerplate template
                                                                                                        for the actor. If
                                                                                                        not provided, the
                                                                                                        command will prompt
                                                                                                        for it.

_See code: [src/commands/create.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/create.js)_

## [](#-code-apify-info--code-)`apify info`

Displays information about the currently active Apify account.

    USAGE
      $ apify info

    DESCRIPTION
      The information is printed to the console.

_See code: [src/commands/info.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/info.js)_

## [](#-code-apify-init--actorname---code-)`apify init [ACTORNAME]`

Initializes a new actor project in an existing directory.

    USAGE
      $ apify init [ACTORNAME]

    ARGUMENTS
      ACTORNAME  Name of the actor. If not provided, you will be prompted for it.

    DESCRIPTION
      The command only creates the "apify.json" file and the "apify_storage" directory in the current directory, but will 
      not touch anything else.

      WARNING: The directory at "apify_storage" will be overwritten if it already exists.

_See code: [src/commands/init.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/init.js)_

## [](#-code-apify-login--code-)`apify login`

Logs in to your Apify account using a provided API token.

    USAGE
      $ apify login

    OPTIONS
      -t, --token=token  [Optional] Apify API token

    DESCRIPTION
      The API token and other account information is stored in the ~/.apify directory, from where it is read by all other 
      "apify" commands. To log out, call "apify logout".

_See code: [src/commands/login.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/login.js)_

## [](#-code-apify-logout--code-)`apify logout`

Logs out of your Apify account.

    USAGE
      $ apify logout

    DESCRIPTION
      The command deletes the API token and all other account information stored in the ~/.apify directory. To log in again, 
      call "apify login".

_See code: [src/commands/logout.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/logout.js)_

## [](#-code-apify-push--actorid---code-)`apify push [ACTORID]`

Uploads the actor to the Apify platform and builds it there.

    USAGE
      $ apify push [ACTORID]

    ARGUMENTS
      ACTORID  ID of an existing actor on the Apify platform where the files will be pushed. If not provided, the command
               will create or modify the actor with the name specified in "apify.json" file.

    OPTIONS
      -b, --build-tag=build-tag              Build tag to be applied to the successful actor build. By default, it is taken
                                             from the "apify.json" file

      -v, --version=version                  Actor version number to which the files should be pushed. By default, it is
                                             taken from the "apify.json" file.

      -w, --wait-for-finish=wait-for-finish  Seconds for waiting to build to finish, if no value passed, it waits forever.

      --version-number=version-number        DEPRECATED: Use flag version instead. Actor version number to which the files
                                             should be pushed. By default, it is taken from the "apify.json" file.

    DESCRIPTION
      The actor settings are read from the "apify.json" file in the current directory, but they can be overridden using 
      command-line options.
      NOTE: If the source files are smaller than 3 MB then they are uploaded as 
      "Multiple source files", otherwise they are uploaded as "Zip file".

      WARNING: If the target actor already exists in your Apify account, it will be overwritten!

_See code: [src/commands/push.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/push.js)_

## [](#-code-apify-run--code-)`apify run`

Runs the actor locally in the current directory by executing "npm start".

    USAGE
      $ apify run

    OPTIONS
      -p, --purge              Shortcut that combines the --purge-queue, --purge-dataset and --purge-key-value-store
                               options.

      --purge-dataset          Deletes the local directory containing the default dataset before the run starts.

      --purge-key-value-store  Deletes all records from the default key-value store in the local directory before the run
                               starts, except for the "INPUT" key.

      --purge-queue            Deletes the local directory containing the default request queue before the run starts.

    DESCRIPTION
      It sets various APIFY_XYZ environment variables in order to provide a working execution environment for the actor. For 
      example, this causes the actor input, as well as all other data in key-value stores, datasets or request queues to be 
      stored in the "apify_storage" directory, rather than on the Apify platform.

      NOTE: You can override the default behaviour of command overriding npm start script value in a package.json file. You 
      can set up your own main file or environment variables by changing it.

_See code: [src/commands/run.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/run.js)_

## [](#-code-apify-secrets--code-)`apify secrets`

Manages secret values for actor environment variables.

    USAGE
      $ apify secrets

    DESCRIPTION
      Example:
      $ apify secrets:add mySecret TopSecretValue123

      Now the "mySecret" value can be used in an environment variable defined in "apify.json" file by adding the "@" prefix:

      {
         "name": "my_actor",
         "env": { "SECRET_ENV_VAR": "@mySecret" },
         "version": "0.1
      }

      When the actor is pushed to Apify cloud, the "SECRET_ENV_VAR" and its value is stored as a secret environment variable 
      of the actor.

_See code: [src/commands/secrets/index.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/secrets/index.js)_

## [](#-code-apify-secrets-add-name-value--code-)`apify secrets:add NAME VALUE`

Adds a new secret value.

    USAGE
      $ apify secrets:add NAME VALUE

    ARGUMENTS
      NAME   Name of the secret
      VALUE  Value of the secret

    DESCRIPTION
      The secrets are stored to a file at ~/.apify

_See code: [src/commands/secrets/add.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/secrets/add.js)_

## [](#-code-apify-secrets-rm-name--code-)`apify secrets:rm NAME`

Removes the secret.

    USAGE
      $ apify secrets:rm NAME

    ARGUMENTS
      NAME  Name of the secret

_See code: [src/commands/secrets/rm.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/secrets/rm.js)_

## [](#-code-apify-vis--path---code-)`apify vis [PATH]`

Validates INPUT_SCHEMA.json file and prints errors found.

    USAGE
      $ apify vis [PATH]

    ARGUMENTS
      PATH  Optional path to your INPUT_SCHEMA.json file. If not provided ./INPUT_SCHEMA.json is used.

_See code: [src/commands/vis.js](https://github.com/apifytech/apify-cli/blob/v0.4.0/src/commands/vis.js)_
