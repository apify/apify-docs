---
title: Continuous integration for Actors
sidebar_label: Continuous integration
description: Learn how to automate your development process. Configure automated builds, CI pipelines, or webhooks to push code, build Actors, and run tests.
slug: /actors/development/deployment/continuous-integration
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Automating your Actor development process can save time and reduce errors, especially for projects with multiple Actors or frequent updates. Instead of manually pushing code, building Actors, and running tests, you can automate these steps to run whenever you push code to your repository.

The following methods are available:

- [Automated builds](#automatic-builds). Apify rebuilds the Actor on every push to a repository.
- [Apify CLI in a pipeline](#ci-pipeline). A CI job runs tests and deploys the Actor.
- [Build webhook](#api-webhook). On every push to a repository, a webhook triggers the [Build Actor](/api/v2/actors-builds-post) API endpoint.

## Automated builds {#automatic-builds}

You can configure automated builds for Actors whose source code is hosted in a GitHub, GitLab, or Bitbucket repository.

Apify registers a push webhook on the repository, so that every push triggers a build. You don't need to create a workflow file or configure a webhook yourself.

### Before you start

To enable automated builds, you need:

- Permission to administer the repository if you don't own it: Maintain on GitHub, Maintainer on GitLab, or Admin on Bitbucket. Apify registers the webhook through your account.
- An Actor version whose source is hosted by a Git provider. Self-managed instances aren't supported.
- For a private repository, a Git URL and Apify's [deployment key](/actors/development/deployment/source-types#private-repositories) added to the repository.

### Enable automated builds

You configure the build settings for each Actor version separately:

1. Log in to [Apify Console](https://console.apify.com/actors).
1. In the left-side panel, go to **Development** > **My Actors**.
1. From the table, select the Actor to configure.
1. Go to the **Source** tab.
1. In **Version**, select the Actor version you want to build automatically.
1. In the **Code** tab, expand the **Build settings** section.
1. Select **Automatic builds**.

With the automated builds on, you can still start builds manually from Apify Console, the Apify CLI, or with the [Build Actor](/api/v2/actors-builds-post) API endpoint.

### Define the branch

Each Actor version points at one branch. If version `0.1` uses `develop` and version `1.0` uses `main`, pushing to `develop` rebuilds `0.1`, and pushing to `main` rebuilds `1.0`.

To define the branch for the Actor version:

1. On your Actor's page, go to the **Source** tab.
1. In **Version**, select the Actor version to configure.
1. In the **Branch** field, enter the branch name. To use the default branch, leave the field empty.

### New Actors with Git source

Automatic builds are on by default if during the Actor creation process you set the code source to a Git repository or link an existing Git repository.

If your connected account can't administer the repository, the Actor is created with manual builds on.

## Deploy with a CI pipeline {#ci-pipeline}

You can configure a CI pipeline to deploy and rebuild your Actor on every push to a branch. Choose this method when your pipeline has to run tests before the build, or if you can't give Apify access to your repository.

### Before you start

To configure a CI pipeline, you need:

- Actor source code in a Git repository, with a valid [`.actor/actor.json`](/actors/development/actor-definition/actor-json) file.
- Node.js 22 or later on the CI runner.

### Add Apify token to your CI provider

Keep the token in your CI provider's protected storage and never commit it to a repository:

- In GitHub, add a [repository secret](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).
- In GitLab, add a masked CI/CD variable.
- In Bitbucket, add a secured repository variable.

<details>
<summary>Get your Apify API token</summary>

1. Log in to [Apify Console](https://console.apify.com/actors).
1. In the left-side panel, go to **Settings**.
1. Go to the **API & Integrations** tab.

</details>

### Deploy with GitHub Actions {#github-actions}

The official [`apify/push-actor-action`](https://github.com/apify/push-actor-action) GitHub Action works similarly to running `apify push` with the Apify CLI. It gives you full control over your CI pipeline: you can run tests, manage multiple branches, and customize the workflow.

In your repository, create a `.github/workflows` directory and add a workflow file:

- To deploy the Actor code to the Apify platform and build the Actor on every push to `main` or `master`, use:

    ```yaml title="latest.yml"
    name: Push and build latest version
    on:
      push:
        branches:
          - master
          - main
    jobs:
      push-actor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4

          - name: Push Actor to Apify
            uses: apify/push-actor-action@v1
            with:
              token: ${{ secrets.APIFY_TOKEN }}
    ```

- To deploy the Actor code to the Apify platform, build the Actor, and add the `beta` tag to the build on every push to `develop`, use:

    ```yaml title="beta.yml"
    name: Push and build beta version
    on:
      push:
        branches:
          - develop
    jobs:
      push-actor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4

          - name: Push Actor to Apify
            uses: apify/push-actor-action@v1
            with:
              token: ${{ secrets.APIFY_TOKEN }}
              build-tag: beta
    ```

For the full list of inputs and outputs, see the [`apify/push-actor-action` README](https://github.com/apify/push-actor-action).

### Deploy with GitLab CI, Bitbucket Pipelines, or another runner

To deploy your Actor with GitLab CI, Bitbucket Pipelines, or another runner, use the following commands:

```bash
npm install -g apify-cli
apify login --token "$APIFY_TOKEN"
apify push
```

For example, with Bitbucket Pipelines, to deploy your Actor on every push to the `main` branch, use:

```yaml title="bitbucket-pipelines.yml"
image: node:22
pipelines:
  branches:
    main:
      - step:
          name: Push Actor to Apify
          script:
            - npm install -g apify-cli
            - apify login --token "$APIFY_TOKEN"
            - apify push
```

### Run tests before the push

Steps in a job run in order, and the job stops at the first step that fails. To prevent the deployment if the tests fail, run your test suite before the push step.

For example, with GitHub Actions, you can use:

```yaml title="latest.yml"
name: Test and push latest version
on:
  push:
    branches:
      - master
      - main
jobs:
  test-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies and run tests
        run: npm install && npm run test

      - name: Push Actor to Apify
        id: push
        uses: apify/push-actor-action@v1
        with:
          token: ${{ secrets.APIFY_TOKEN }}

      - name: Print build details
        run: |
          echo "Build ${{ steps.push.outputs.build-id }} finished with status ${{ steps.push.outputs.build-status }}"
```

### Exit codes

`apify push` waits for the build to finish and reports its outcome with the exit code, so a failed build fails the pipeline step on its own.

The following exit codes are possible:

| Exit code | Description |
| --- | --- |
| `0` | Build succeeded, or the command returned before the build finished. |
| `1` | Build failed, or the CLI is not logged in. |
| `2` | Build timed out. |
| `3` | Build was aborted. |
| `4` | No Actor files found in the directory. |
| `5` | The `.actor/actor.json` file is missing or invalid. |

## Trigger builds with a webhook {#api-webhook}

If your Git provider has no Apify integration, you can trigger builds by calling the [Build Actor](/api/v2/actors-builds-post) API endpoint on every push.

You can configure a webhook only for an Actor version that has its source set to a [Git repository](/actors/development/deployment/source-types#git-repository). The webhook only triggers a build, and the build uses the source that is already configured on the platform.

### Configure the webhook

To configure the webhook:

1. Log in to [Apify Console](https://console.apify.com/actors).
1. In the left-side panel, go to **Development** > **My Actors**.
1. From the table, select the Actor to configure.
1. Select **API** and from the drop-down, select **API endpoints**.
1. Copy the **Build Actor** API endpoint URL:

    ```text
    https://api.apify.com/v2/actors/YOUR-ACTOR-NAME/builds?token=YOUR-TOKEN-HERE&version=0.0&tag=latest&waitForFinish=60
    ```

1. In your repository hosting provider, add a webhook that fires on push events and set the URL to the build API endpoint you copied.

For example, in GitHub, go to **Settings** > **Webhooks** > **Add webhook** and paste the URL into the **Payload URL** field.
