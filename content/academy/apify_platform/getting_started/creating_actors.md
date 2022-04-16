---
title: Creating actors
description: Build and run your very first actor right on the Apify platform from a template. This lesson provides a hands-on experience with building and running an actor.
menuWeight: 2
paths:
- apify-platform/getting-started/creating-actors
---

# [](#creating-actors) Creating actors

Creating an actor is so easy to do, we'll show you right in this lesson how to get one up and running in 5 minutes or less. There is no need to install any special software, as everything can be done right on the Apify platform with an Apify account!

## [](#choose-your-template) Choose your template

On the [Apify Console](https://console.apify.com), click on the **Actors** tab we visited in the previous lesson. In the top right-hand corner, you should see a **Create new** button.

![Create new button]({{@asset apify_platform/getting_started/images/create-new-actor.webp}})

Click it, then choose the **Basic Node.js actor** template and click on **Use template**.

> Also feel free to give the actor a custom name instead of the default name. For this lesson though, we'll keep it as **my-actor**.

![Choosing a template]({{@asset apify_platform/getting_started/images/choose-template.webp}})

## [](#hello-world) Hello World!

After clicking on **Use template**, you should be brought to a page that looks like this:

![Multifile editor]({{@asset apify_platform/getting_started/images/multifile-editor.webp}})

The area where you can see some code and files is the called the **multifile editor**, and it is your gateway to writing actor directly on the Apify platform.

> It is also possible to deploy code to the platform from a Github repo or from your local environment, which we will be getting into in some of this course's future lessons

Go ahead and delete the three lines of code in the **main.js**  file that look like this:

```JavaScript
const input = await Apify.getInput();
console.log('Input:');
console.dir(input);
```

> Feel free to also remove all of the comments

And replace them with this:

```JavaScript
console.log('Hello World!')
```

The final code should look like this:

```JavaScript
const Apify = require('apify');

Apify.main(async () => {
    console.log('Hello World!')
});
```

To save your changes, click on the blue **Save** button.

## [](#build-an-actor) Build an actor

In order to run the actor, you've gotta build it. Luckily, that's only a button press away.

![Build the actor]({{@asset apify_platform/getting_started/images/build-actor.webp}})

After you've clicked the **Build** button, it'll take around 5-10 seconds to complete the build. You'll know it's finished when you see a green **Start** button.

![Start button]({{@asset apify_platform/getting_started/images/start.webp}})

This beautiful button's presence means we can now run the actor!

## [](#run-an-actor) Run an actor

Click **Start** and wait a few seconds... Do you see something that looks like this?:

![Actor run logs]({{@asset apify_platform/getting_started/images/hello-world-run.webp}})

If so, it worked! 🥳

Later on, we'll be working on some more complex actors - this was just a fun and quick exercise to get your toes wet.

## [](#next) Next up

So we've created an actor, but how can we give it some input, then make it do stuff based on that input? This is exactly what we'll be discussing in the [next lesson]({{@link apify_platform/getting_started/inputs_outputs.md}})'s activity.
