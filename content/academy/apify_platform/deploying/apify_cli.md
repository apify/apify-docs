---
title: Apify CLI
description: Learn about and install an important tool for communicating with your Apify projects and the Apify platform from your terminal - the Apify CLI.
menuWeight: 2
paths:
- apify-platform/deploying/apify-cli
---

# [](#the-cli) Apify CLI

At this point, our project has three files:

- **index.js**
- **package.json**
- **Dockerfile**

There is one other file we need to make it work, and that is the **apify.json** file. We could write this by hand; however, it can be automated by using the Apify CLI, which is a tool we'll be using later on for other purposes. Therefore, it's good to get it installed on our machines now so we don't have to worry about it later.

The [Apify CLI](https://docs.apify.com/cli) helps you create, develop, build and run Apify actors, and manage the Apify cloud platform from any computer. It can be used to automatically generate the boilerplate for different types of projects, initialize projects, remotely call actors on the platform, and run your own projects. The Apify CLI will become your best friend while developing for the Apify platform.

## [](#installing) Installing

To install the Apfiy CLI, you'll first need NPM, which comes preinstalled with Node.js. If you haven't yet installed Node, learn how to do that [here]({{@link web_scraping_for_beginners/data_collection/computer_preparation.md}}). Additionally, make sure you've got an Apify account, as you will need to log in to the CLI to gain access to its full potential.

Open up a terminal instance and run the following command:

```shell
npm i -g apify-cli
```

This will install the CLI via NPM.

## [](#logging-in) Logging in

After the CLI has finished installing, navigate to the [Apify Console](https://console.apify.com) and click on **Settings**. Then, within your account settings, click **Integrations**. The page should look like this:

![Integrations tab on the Apify Platform]({{@asset apify_platform/deploying/images/settings-integrations.webp}})

> We've censored out the **User ID** in the image because it is private information which should not be shared with anyone who is not trusted. The same goes for your **Personal API Token**.

Copy the **Personal API Token** and return to your terminal, entering this command:

```shell
apify login -t YOUR_TOKEN_HERE
```

If you see a log which looks like this,

```text
Success: You are logged in to Apify as YOUR_USERNAME!
```

If you see a log which looks like **Success: You are logged in to Apify as YOUR_USERNAME!**, you're in and ready to get developing!

## [](#initializing) Initializing your project

Now that we've got the CLI set up, let's run this command within the directory of our project:

```shell
apify init adding-actor
```

It should look like this:

```JSON
{
    "name": "adding-actor",
    "version": "0.0",
    "buildTag": "latest",
    "env": null
}
```

You might notice that two other files have been generated as well: a **.gitignore** file and an **apify_storage** folder. The **apify_storage** folder is where all of our new actor's outputs will be stored.

![New project file structure]({{@asset apify_platform/deploying/images/filestructure.webp}})

## [](#quick-note) Quick note

When you're locally test-running your code in the next lessons, always be sure to use the `apify run` command with the `-p` flag. This `-p` stands for **purge**, which will automatically purge all storages before running the actor again. Now that you have the Apify CLI, you should no longer be using `node FILENAME.js` to run your projects with Apify.

## [](#next) Next up

[Next up]({{@link apify_platform/deploying/inputs_outputs.md}}), you'll be learning how to accept input into your actor, as well as return output.
