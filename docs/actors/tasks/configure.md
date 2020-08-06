---
title: Configure
description: Create custom versions of an actor for specific use cases. Set a task's name and input parameters.
paths:
    - tasks/configure
    - actors/tasks/configure
---

# [](#configuring-the-task)Configuring the task

Once you create the task, you can configure its name and set up options and input for the actor. If you leave the options configuration empty, or partially empty, when you run the task, the missing options configuration will be prefilled with values from the actor's configuration.

*Options configuration*
![Apify task options]({{@asset actors/tasks/images/options.png}})

A Task's input configuration works like an actor's, you can either set up raw input with a configured content type, or, if the actor has a defined input schema, a visual input UI will be visible.

*Raw input UI*
![Apify task raw input]({{@asset actors/tasks/images/raw-input.png}})

*Visual input UI*
![Apify task visual input]({{@asset actors/tasks/images/visual-input.png}})
