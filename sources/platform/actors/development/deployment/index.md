---
title: Actor deployment
sidebar_label: Deployment
sidebar_position: 6
description: Learn how Actor deployment works. Keep your code on the Apify platform and deploy with the Apify CLI, or host it in Git and build on every push.
slug: /actors/development/deployment
---

Deploying an Actor means defining the [source](/actors/development/deployment/source-types) for one of the Actor versions and [building](/actors/development/builds-and-runs/builds) it into a Docker image on the Apify platform.

Once you deploy your Actor, you can run it in the cloud.

## How deployment works

Every Actor must have at least one version that stores the code the platform builds from, and defines where that code lives. An Actor can have up to 10 versions.

A build turns a version's source into a Docker image with a build number. You can also add a tag. A version must have a successful build for users to run your Actor.

Deployment is always scoped to a version. Your Actor can have multiple versions, and each version can have a different source type. Rebuilding one version doesn't rebuild the rest.

## Choose where your code lives

The platform can store your code or clone it from Git at build time. For the configuration details of each type, see [Source types](/actors/development/deployment/source-types).

| Where the Actor's code lives | Source type | Deployment method |
| --- | --- | --- |
| Apify platform | Web IDE or Zip file | [`apify push`](/cli/docs/reference#actor-deployment) |
| Git repository | Git repository | `git push` |
| GitHub Gist | GitHub Gist | Update the Gist and start a build |

## Deploy code hosted on Apify

To deploy and build your Actor, use the Apify CLI. It uploads your code to an Actor version and builds it on the platform.

To deploy your Actor:

1. Log in to your Apify account:

    ```bash
    apify login
    ```

1. Navigate to your Actor's directory.
1. Upload your Actor's source code and build it on the Apify platform:

    ```bash
    apify push
    ```

The `apify push` command checks if your account has an Actor with the name defined in `.actor/actor.json` and creates it if none exists. Then, it creates or updates the Actor's version, uploads your code as its source, starts a build, and streams the build log.

### Define the version

To choose which Actor version to deploy, use the `--version` flag:

```bash
apify push --version=1.2
```

If you skip the flag, the CLI uses the `version` field in `.actor/actor.json`, and defaults to `0.0`.

To create a new Actor version, use a version number that doesn't exist yet. To replace the source of an existing version, use the number of that version.

### Source type by size

The CLI picks the source type by size:

- If your project is smaller than 3 MB, the CLI uploads it as multiple source files. They stay visible and editable in the [web IDE](/actors/development/quick-start/web-ide).
- If your project is 3 MB or larger, the CLI uploads it as a Zip file. The web IDE can't display it.

## Deploy code hosted in Git

When you host your Actor's code in a Git repository, the platform only stores the repository URL. It clones the repository at build time.

### Git repository

To deploy your Actor, push changes to the repository:

```bash
git push
```

The next step depends on the build settings for the version:

- If automated builds are on, a push to the repository starts a build.
- If manual builds are on, a push only updates your repository. Start the build from Console, with the [Build Actor](/api/v2/actors-builds-post) endpoint, or with the `apify actors build` command.

You can configure different build settings for different versions.

### GitHub Gist

Gists don't support automated builds. To deploy your Actor:

1. Update the Gist.
1. Start a build from Console, with the [Build Actor](/api/v2/actors-builds-post) endpoint, or with the `apify actors build` command.
