---
title: Continuous integration
description: Learn how to set up automated builds and deploys for your actors or projects that consist of multiple actors.
paths:
    - actors/development/continuous-integration
---

# Continuous integration (CI) for actors

If you have a project consisting of several actors, or even one actor that requires frequent updates, you may want to automate some of the development process. Instead of manually pushing your code, **build**ing each actor, then testing it, you could perform the whole process whenever you run `git push`.

To automate your actor's builds and test runs, you can use your Git repository's automated workflows. For example, [GitHub Actions](https://github.com/features/actions) or [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines).

This article will focus on GitHub, however [we have a Bitbucket guide here](https://help.apify.com/en/articles/1861038-setting-up-continuous-integration-for-apify-actors-on-bitbucket).

## TL;DR

Below is an example GitHub Actions workflow that will automate the testing and building of your actor every time you push your code to GitHub. The code should go in **separate files** in your actor directory's `github` folder: e.g. `.github/workflows/main.yml` and `.github/workflows/beta.yml`.

```marked-tabs
<marked-tab header="main.yml" lang="yaml">
name: Test and build latest version
on:
  push:
    branches:
      - master
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # Install dependencies and run tests
      - uses: actions/checkout@v2
      - run: npm install && npm run test
      # Build latest version
      - uses: distributhor/workflow-webhook@v1
        env:
          webhook_url: ${{ secrets.LATEST_BUILD_URL }}
          webhook_secret: ${{ secrets.APIFY_TOKEN }}
</marked-tab>


<marked-tab header="beta.yml" lang="yaml">
name: Test and build beta version
on:
  push:
    branches:
      - develop
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # Install dependencies and run tests
      - uses: actions/checkout@v2
      - run: npm install && npm run test
      # Build latest version
      - uses: distributhor/workflow-webhook@v1
        env:
          webhook_url: ${{ secrets.BETA_BUILD_URL }}
          webhook_secret: ${{ secrets.APIFY_TOKEN }}
</marked-tab>
```

[Find the Bitbucket version here](https://help.apify.com/en/articles/1861038-setting-up-continuous-integration-for-apify-actors-on-bitbucket).

## Prerequisites

You will need an actor, a GitHub repo for it, and an Apify token.

[Create an actor]({{@link tutorials/quick_start.md#create-an-actor}}).

[Find your Apify token in the Apify app](https://my.apify.com/account#/integrations).

![Apify token in app]({{@assets actors/development/images/c-i-token.png}})

[Add the token to GitHub secrets](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Go to **your repo > Settings > Secrets > New repository secret**.

Add the [**build actor** API endpoint URL](/api/v2#/reference/actors/build-collection/build-actor) to GitHub secrets. Configure it to use your actor's ID and your token.

![Add build actor URL to secrets]({{@assets actors/development/images/c-i-add-build-url.png}})

## Set up automatic builds

Once you have your [prerequisites](#prerequisites) sorted, you can start automating your builds. There are two ways to do this: using [webhooks](https://en.wikipedia.org/wiki/Webhook) or the [Apify CLI]({{@link cli.md}}). [See the Apify CLI approach](https://help.apify.com/en/articles/1861038-setting-up-continuous-integration-for-apify-actors-on-bitbucket) in our Bitbucket CI guide.

To start you actor's build using webhooks, send a [POST HTTP request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) to the Apify API's [**build actor** endpoint](/api/v2#/reference/actors/build-collection/build-actor) from your GitHub Actions workflow.

```yaml
name: Build actor
  - uses: distributhor/workflow-webhook@v1
    env:
      webhook_url: ${{ secrets.LATEST_BUILD_URL }}
      webhook_secret: ${{ secrets.APIFY_TOKEN }}
```

## Automate tests

Depending on your needs, you can [test your actors on push to Git](#run-tests-on-push-to-git) (using frameworks like [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/)) or [set up ongoing monitoring of your actors' performance](#monitoring).

### Run tests on push to Git

[See our Bitbucket guide](https://help.apify.com/en/articles/1861038-setting-up-continuous-integration-for-apify-actors-on-bitbucket) for an introduction on running tests when you push your code.

### Monitoring

For most ongoing monitoring scenarios, we recommend using the [Apify monitoring suite](https://apify.com/apify/monitoring). It allows you to check your actor's run statuses, validate your results, and [receive notifications via email or Slack](https://apify.com/apify/monitoring#notifications).

We have [text and video tutorials]({{@link monitoring.md#how-can-i-set-up-monitoring}}) for various monitoring use cases to make setup easy for you.

### Ongoing testing

If you have advanced and specific requirements, you can create your own test actors, which you can [schedule]({{@link schedules.md}}) to regularly run and validate your actors' results. For this, you can use our **Actor Testing** ([pocesar/actor-testing](https://apify.com/pocesar/actor-testing)) actor.

If using this approach, you can set up notifications using the **Send Mail** ([apify/send-mail](https://apify.com/apify/send-mail)) and **Send Slack Message** ([katerinahronik/slack-message](https://apify.com/katerinahronik/slack-message)) actors.

<!-- Uncomment after the Public actor guide is released -->
<!-- See our [Maintenance and testing] (link later) article.-->
