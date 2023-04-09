---
title: Source types
description: Learn about Apify Actor source types, how to deploy actor from Github, using CLI, or a Gist.
slug: /actors/development/source-types
sidebar_position: 1
---

**Learn about Apify Actor source types, how to deploy actor from Github, using CLI, or a Gist.**

---

The **Source type** setting determines the location of the source code for the actor. It can have one of the following values: [Multiple source files](#multiple-source-files), [Git repository](#git-repository), [Zip file](#zip-file) or [GitHub Gist](#github-gist).

## Multiple source files {#multiple-source-files}

If the actor's source code requires the use of multiple files/directories, then it can be hosted on the Apify platform using this option. This is particularly useful when you need to add [**INPUT_SCHEMA.json**](../actor_definition/input_schema/index.md) or **README.md** to your actor, or if you want to create your actor in a language other than JavaScript.

The only required file for multi-file is **Dockerfile**, and all other files depend on your Dockerfile settings. By default, Apify's custom NodeJS Dockerfile is used, which requires a **main.js** file containing your source code and a **package.json** file containing package configurations for [NPM](https://www.npmjs.com/).

See [Custom Dockerfile](./source_types.md) and [base Docker images](../actor_definition/dockerfile.md) for more information about creating your own Dockerfile and using Apify's prepared base images.

## [](#git-repository)Git repository

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/NEzT_p_RE1Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

If the actor's source code is hosted externally in a Git repository, it can consist of multiple files and directories, use its own **Dockerfile** to control the build process (see [Custom Dockerfile](./source_types.md) for details) and have a user description in store fetched from the **README.md** file. The location of the repository is specified by the **Git URL** setting, which can be an **https**, **git** or **ssh** URL.

[//]: # (TODO: It's pretty outdated, we should probably update the actor too)
To help you get started quickly, you can use the [apify/quick-start](https://apify.com/apify/quick-start) actor which contains all the boilerplate necessary when creating a new actor hosted on Git. The source code is available on [GitHub](https://github.com/apify/actor-quick-start).

To specify a Git branch or tag to check out, add a URL fragment to the URL. For example, to check out the **develop** branch, specify a URL such as `https://github.com/jancurn/some-actor.git#develop`.

Optionally, the second part of the fragment in the Git URL (separated by a colon) specifies the directory from which the Actor will be built (and where the `.actor`) folder is located. For example, `https://github.com/jancurn/some-actor.git#develop:some/dir` will check out the **develop** branch and set **some/dir** as the root directory of the Actor.

Note that you can easily set up an integration where the actor is automatically rebuilt on every commit to the Git repository. For more details, see [GitHub integration](./source_types.md).

### [](#private-repositories)Private repositories

If your source code is hosted in a private Git repository then you need to configure deployment key. Deployment key is different for each actor and might be used only once at Git hosting of your choice (GitHub, Bitbucket, GitLab, etc.).

To obtain the key click at the **deployment key** link under the **Git URL** text input and follow the instructions there.

### [](#actor-monorepos)Actor monorepos

By default, the context directory for the Docker build is the directory pointed to by the **Git URL** (or the repository root if no directory is specified). If you want to use a different directory for the Docker context, you can use the `dockerContextDir` property in the [Actor definition](../actor_definition/actor_json.md). This is useful for example for sharing code between multiple actors in the same repository.

If you want to have multiple actors in a single repository that use shared code also located in the repository, you can set `dockerContextDir` to the path to the folder which contains the actor's source and the shared code, and then copy both the actor's source and shared code to the Docker image in the Dockerfile.

An example actor monorepo is shown in the [`apify/actor-monorepo-example`](https://github.com/apify/actor-monorepo-example) repository. To build actors from this monorepo, you would set the source URL to `https://github.com/apify/actor-monorepo-example#main:actor_1` and `https://github.com/apify/actor-monorepo-example#main:actor_2` respectively.

## [](#zip-file)Zip file

The source code for the actor can also be located in a Zip archive hosted on an external URL. This option enables integration with arbitrary source code or continuous integration systems. Similarly, as with the [Git repository](#git-repository), the source code can consist of multiple files and directories, can contain a custom **Dockerfile** and the actor description is taken from **README.md**. If you don't use a [custom Dockerfile](#custom-dockerfile), the root file of your application must be named `main.js`.

## [](#github-gist)GitHub Gist

Sometimes having a full Git repository or a hosted Zip file might be overly complicated for your small project, but you still want to have the source code in multiple files. In this case, you can simply put your source code into a [GitHub Gist](https://gist.github.com/). For example:

[//]: # (TODO: It's pretty outdated, we should probably update the actor too)
[https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7](https://gist.github.com/jancurn/2dbe83fea77c439b1119fb3f118513e7)

Then set the **Source Type** to **GitHub Gist** and paste the Gist URL as follows:

![GitHub Gist settings](./images/source-types-gist-settings.png)

Note that the example actor is available in the Apify Store as [apify/example-github-gist](https://apify.com/apify/example-github-gist).

Similarly, as with the [Git repository](./source_types.md), the source code can consist of multiple files and directories, it can contain a custom **Dockerfile** and the actor description is taken from **README.md**. If you don't use a [custom Dockerfile](#custom-dockerfile), the root file of your application must be named `main.js`.
