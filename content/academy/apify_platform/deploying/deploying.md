---
title: Deploying
description: Push your code from your local environment to the platform, or create a new actor on the console and integrate it with a Github repository to automatically rebuild any new changes.
menuWeight: 4
paths:
- apify-platform/deploying/deploying
---

# [](#deploying) Deploying

Once you've **actorified** your code, there are two ways to deploy your it to the Apify platform. You can either push the code directly from your local machine onto the platform, or you can create a blank actor in the web-interface, then integrate its source code with a Github repository.

## [](#with-git-repository) With a Github repository

Before we deploy our project onto the Apify platform, let's ensure that we've pushed the changes we made in the last 3 lessons into our remote Github repository.

> The benefit of using this method is that any time you push to the Github repo, the code on the platform is also updated and the actor is automatically rebuilt.

### Creating the actor

Before anything can be integrated, we've gotta create a new actor. Luckily, this is super easy to do. Let's head over to our [Apify Console](https://console.apify.com) and click on the **New** button, then select the **Empty** template.

![Create new button]({{@asset apify_platform/getting_started/images/create-new-actor.webp}})

Easy peasy!

### Changing source code location

In the **Source** tab on the new actor's page, we'll click the dropdown menu under **Source code** and select **Git repository**. By default, this is set to **Multiple source files**.

![Select source code location]({{@asset expert_scraping_with_apify/images/select-source-location.webp}})

Now we'll paste the link to our Github repository into the **Git URL** text field and click **Save**.

### Adding the webhook to the repository

The final step is to click on **API** in the top right corner of our actor's page:

![API button]({{@asset expert_scraping_with_apify/images/api-button.webp}})

And scroll through all of the links until we find the **Build actor** API endpoint. Now we'll copy this endpoint's URL, head back over to our Github repository and navigate to **Settings > Webhooks > Add webhook**. The final thing to do is to paste the URL and save the webhook.

![Adding a webhook to your Github repo]({{@asset expert_scraping_with_apify/images/github-integration.webp}})

That's it! the actor should now pull its source code from the repo and automatically build.

## [](#with-apify-cli) Without a Github repository (using the Apify CLI)

The [Apify CLI](https://docs.apify.com/cli) helps you create, develop, build and run Apify actors, and manage the Apify cloud platform from any computer. It can be used to automatically generate the boilerplate for different types of projects, initialize projects, remotely call actors on the platform, and run your own projects.

### Installing

To install the Apfiy CLI, you'll first need NPM, which comes preinstalled with Node.js. If you haven't yet installed Node, learn how to do that [here]({{@link web_scraping_for_beginners/data_collection/computer_preparation.md}}). Additionally, make sure you've got an Apify account, as you will need to log in to the CLI to gain access to its full potential.

Open up a terminal instance and run the following command:

```shell
npm i -g apify-cli
```

This will install the CLI via NPM.

### Logging in

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

If you see a log which looks like **Success: You are logged in to Apify as YOUR_USERNAME!**, you're in!

## [](#push-command) The push command

If you're logged in, the `apify push` command can be used to push the code straight onto the Apify platform from your local machine (no Github repository required), where it will automatically be built for you. Prior to running this command, make sure that you have an **apify.json** file at the root of the project. If you don't already have one, you can use `apify init PROJECT_NAME` to automatically generate one for you.

## [](#next) Next up

We release new lessons as we write them, so keep your eyes peeled for new content coming very soon!
