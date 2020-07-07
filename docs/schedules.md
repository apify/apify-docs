---
title: Schedules
description: Documentation of Apify Schedules, which run actors or tasks at specific times using cron-like syntax.
menuWeight: 4
category: platform
paths:
    - scheduler
    - schedules
---

# [](#schedules) Schedules

[Schedules](https://my.apify.com/schedules) allow you to automatically run your actors and tasks at specific times. They can be set up both from the [Apify app](https://my.apify.com) and via [API](https://docs.apify.com/api/v2). Each schedule can be associated with a maximum of 10 actors and 10 actor tasks. It is also possible to override the settings of each actor/task similarly to when invoking them using the [Apify API](https://docs.apify.com/api/v2#/reference/schedules/).

The schedules use [cron expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression) to specify run times. A cron expression has the following structure:

|Position|Field|Values|Wildcards|Optional|
|--- |--- |--- |--- |--- |
|1|second|0 - 59|, - * /|yes|
|2|minute|0 - 59|, - * /|no|
|3|hour|0 - 23|, - * /|no|
|4|day of month|1 - 31|, - * /|no|
|5|month|1 - 12|, - * /|no|
|6|day of week|0 - 7 (0 or 7 is Sunday)|, - * /|no|

For example, the expression `30 5 16 * * 1` will start an actor at 16:05:30 every Monday.

The minimum interval between runs is 10 seconds; if your next run is scheduled sooner than 10 seconds after the previous run, the next run will be skipped.

> **Note:** schedules now allow timezone settings and support daylight saving time shifts. 

## [](#examples-of-cron-expressions) Examples of cron expressions

- `0 8 * * *`  -  every day at 8am
- `0 0 * * 0` - every 7 days (at 00:00 on Sunday)
- `*/3 * * * *` - every 3rd minute
- `0 0 1 */2 *` - every other month (at 00:00 on the first day of month, every 2nd month)

Additionally, you can use the following shortcut expressions:

- `@yearly` = `0 0 1 1 *`
- `@monthly` = `0 0 1 * *`
- `@weekly` = `0 0 * * 0`
- `@daily` = `0 0 * * *`
- `@hourly` = `0 * * * *`

You can find more information and examples of cron expressions on [crontab.guru](http://crontab.guru/).

## [](#setting-up-a-new-schedule) Setting up a new schedule

Before setting up a new schedule, you should have the [actor](https://docs.apify.com/actors) or [task](https://docs.apify.com/tasks) you want to schedule prepared and tested.

If you are planning to schedule an actor run, you need to use the actor before you can schedule any runs. If you haven't, dont' worry - just navigate to the actor's page in the [Apify Store](https://apify.co/store), click the `Try for free` button, then `Save & run` it with your preferred settings.

### [](#from-the-apify-platform) From the Apify app

In the [Apify app](https://my.apify.com/), click on the [`Schedules`](https://my.apify.com/schedules) button in the left side menu, then click the `Create new` button.

In the `Settings` tab, give your schedule a memorable name, add a description, and choose how often you would like your actor or task to run using the `Cron expression` field.

![New schedule]({{@asset images/new-schedule-settings.png}})

Next, you'll need to give the schedule something to run. This is where the actor or task you prepared earlier comes in. Switch to the `Actors` or `Tasks` tab, as appropriate, and click the `Add actor/task button.

If you're scheduling an actor run, you'll be able to specify the [`build`](https://docs.apify.com/actors/development/builds), `timeout`, `memory`, and `body`. The `timeout` value is specified in seconds; a value of `0` means there is no timeout and the actor runs until it finishes. The `body` should contain a JSON object with the actor's [input](https://docs.apify.com/actors/running/input-and-output).

![Add actor to schedule]({{@asset images/schedule-actor-run.png}})

If you're scheduling a task, just select the task you prepared earlier from the `Task` dropdown. If you need to override the task's input, you can pass it as a JSON object in the `Input JSON overrides` field.

![Add task to schedule]({{@asset images/schedule-add-tasks.png}})

To add more actors or tasks, just repeat the process.

> You can add a maximum of 10 actors and 10 tasks to each schedule.

Now, all you need to do is click `Save` and wait for your scheduled actors/tasks to run and return your data.

If you are an advanced user, you can also add a [webhook](https://docs.apify.com/webhooks) to your tasks, which will notify you (or perform an action of your choice) every time the task runs.

### [](#via-api) Via API

To [create a new schedule](https://docs.apify.com/api/v2#/reference/schedules/) using the [Apify API](https://docs.apify.com/api/v2), send a [POST request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) to

```https://api.apify.com/v2/schedules?token={your_API_token}```

You can find your [secret API token](https://docs.apify.com/api/v2#/introduction/authentication) in your Apify account's [Integrations](https://my.apify.com/account#/integrations) tab. In the POST request's payload should be a JSON object specifying the schedule's name, your [user ID](https://my.apify.com/account#/integrations), and the schedule's `actions`.

The below JSON object creates a schedule which runs an SEO audit of the Apify domain once a month.

```
{
  "name": "apify-domain-monthly-seo-audit",
  "userId": "7AxwNO4kCDZxsMHip",
  "isEnabled": true,
  "isExclusive": true,
  "cronExpression": "@monthly",
  "timezone": "UTC",
  "description": "A monthly audit of the Apify domain's SEO",
  "actions": [
    {
      "type": "RUN_ACTOR_TASK",
      "actorTaskId": "6rHoK2zjYJkmYhSug",
      "input": {
        "startUrl": "https://apify.com"
      }
    }
  ]
}
```

If the request is successful, you will receive a 201 [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and a JSON object in the response body containing the details of your new schedue. If you receive an error (`4**` code), you will need to check your API token, user ID, or POST request body.

You can add multiple actor and task runs to a schedule with a single POST request. Simply add another object with the run's details to the `actions` array in your POST request's payload object.

For more information, see the [Schedules documentation](https://docs.apify.com/api/v2#/reference/schedules/schedule-object/get-schedule).
