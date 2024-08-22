---
title: Continuous integration
description: Learn how to integrate your Actors by setting up automated builds, deploys, and testing for your Actors using GitHub Actions or Bitbucket Pipelines.
slug: /actors/development/deployment/continuous-integration
sidebar_position: 2
---

# Continuous integration for Actors

**Learn how to set up automated builds, deploys, and testing for your Actors using GitHub Actions or Bitbucket Pipelines.**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Automating your Actor development process can save time and reduce errors, especially for projects  with multiple Actors or frequent updates. Instead of manually pushing code, building Actors, and running tests, you can automate these steps to run whenever you push code to your repository.

This guide focuses on using GitHub Actions for continuous integration, if you are interested in BitBucket Pipeline integration, check out [this](https://help.apify.com/en/articles/6988586-setting-up-continuous-integration-for-apify-actors-on-bitbucket) help article.

## Set up automated builds and tests

To set up automated builds and tests for your Actors you need to:

1. Create a GitHub repository for your Actor code.
1. Get your Apify API token from the [Apify Console](https://console.apify.com/account#/integrations)

    ![Apify token in app](./images/ci-token.png)

1. Add your Apify token to GitHub secrets
   1. Go to your repo > Settings > Secrets > New repository secret
   1. Name the secret & paste in your token
1. Add the Builds Actor API endpoint URL to GitHub secrets
   1. Use this format:

      ```cURL
      https://api.apify.com/v2/acts/YOUR-ACTOR-NAME/builds?token=YOUR-TOKEN-HERE&version=0.0&tag=beta&waitForFinish=60
      ```

      ![Add build Actor URL to secrets](./images/ci-add-build-url.png)

   1. Name the secret
1. Create GitHub Actions workflow files:
   1. In your repo, create the `.github/workflows` directory
   2. Add `latest.yml` and `beta.yml` files with the following content

    <Tabs groupId="main">
    <TabItem value="latest.yml" label="latest.yml">

    ```yaml
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

    ```

    </TabItem>

    <TabItem value="beta.yml" label="beta.yml">

    ```yaml
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

    ```

    </TabItem>
    </Tabs>

With this setup, pushing to the `main` or `master` branch builds a new latest version, while pushig to `develop` builds a beta version.

## GitHub integration

To set up automatic builds from GitHub:

1. Go to your Actor's detail page and coy the Build Actor API endpoint URL from the API tab.
1. In your GitHub repository, go to Settings > Webhooks > Add webhook.
1. Paste the API URL into the Payload URL field.

![GitHub integration](./images/ci-github-integration.png)

Now your Actor will automatically rebuild on every push to the GitHub repository.
