---
title: Configure
description: Documentation of Apify Task - a way to set up configuration of your Apify Actor for simplified usage.
menuWeight: 4.2
redirectPaths:
    - tasks/configure
---

# [](#configuring-the-task)Configuring the task

Once you create the task, you can configure its name and set up options and input for the actor. If you leave the options configuration empty, or partially empty, when you run the task, the missing options configuration will be prefilled with values from the actor's configuration.

![Apify task options]({{@asset tasks/images/options.png}})*Options configuration*

A Task's input configuration works like an actor's, you can either set up raw input with a configured content type, or, if the actor has a defined input schema, a visual input UI will be visible.

![Apify task raw input]({{@asset tasks/images/raw-input.png}})*Raw input UI*

![Apify task visual input]({{@asset tasks/images/visual-input.png}})*Visual input UI*

