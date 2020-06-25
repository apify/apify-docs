---
title: Schedules
description: Documentation of Apify Schedules, which execute crawler or actor jobs at specific times using cron-like syntax.
menuWeight: 4
category: platform
paths:
    - scheduler
    - schedules
---

# [](#schedules) Schedules

[Schedules](https://my.apify.com/schedules) are used to automatically start your actors at certain times. Each schedule can be associated with up to 10 actors and 10 actor tasks. It is also possible to override the settings of each actor/task similarly to when invoking the actor/task using the [Apify API](https://docs.apify.com/api/v2#/reference/schedules/).

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

## [](#examples) Examples of cron expressions

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

## [](#setting-up) Setting up a new schedule

Before setting up a new schedule, you should have the [actor](https://docs.apify.com/actors) or [task](https://docs.apify.com/tasks) you want to schedule prepared and tested.

As an example, we are going to schedule a monthly SEO audit on the Apify domain using the [SEO audit](https://apify.com/drobnikj/seo-audit-tool) actor. On the actor's detail page, we'll click `Try it for free`, which redirects us back to the Apify platform and [creates a new task](https://docs.apify.com/actors/tasks/create). 

![SEO audit tool]({{@asset /images/seo-audit-tool.png}})

We'll set `https://apify.com` as the task's `input`. In the `Settings` tab, we'll set the task's name to `apify-domain-seo-audit` and add a short description, then click `Save`.

### [](#new-schedule-platform) From the Apify platform

To create a new schedule, click on the [`Schedules`](https://my.apify.com/schedules) button in the left side menu, then click on the `Create new` button.

In the `Settings` tab, we'll set the schedule's name to `apify-domain-monthly-seo-audit`, add a brief description, and use the `@monthly` cron expression shortcut. 

![New schedule]({{@asset /images/new-schedule-settings.png}})

Next, we need to give the schedule something to run. This is where the task we prepared earlier comes in. We'll switch to the `Tasks` tab and click `Add task`. From the `Task` dropdown menu, we'll select our `apify-domain-seo-audit` task. Since we don't need to change any input parameters this time, we'll leave the `Input JSON overrides` field as it is. 

![Add task to schedule]({{@asset /images/schedule-add-tasks.png}})

Now, all we need to do is click `Save` and wait for our scheduled actor runs to return our data.

**Note:** you can add a maximum of 10 actors and 10 tasks to each schedule.

If you are an advanced user, you can add a [webhook](https://docs.apify.com/webhooks) to your task that will notify you every time the task runs.

### [](#new-schedule-api) Via API

To [create a new schedule](https://docs.apify.com/api/v2#/reference/schedules/) using the [Apify API](https://docs.apify.com/api/v2), send a [POST request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) to

```https://api.apify.com/v2/schedules?token={your_API_token}```

You can find your [secret API token](https://docs.apify.com/api/v2#/introduction/authentication) in your Apify account's [Integrations](https://my.apify.com/account#/integrations) tab. In the POST request's payload should be a JSON object specifying the schedule's name, your [user ID](https://my.apify.com/account#/integrations), a cron expression, and the schedule's actions.

To create the same schedule we did earlier, our POST request's payload will look like this: 

```
{
  "name": "apify-domain-monthly-seo-audit",
  "userId": "7AxwNL4kCDZxsMHip",
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

If the request is successful, you will receive a 201 [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and your new schedule object in the response body. If you receive an error (4** code), you will need to check your API token, user ID, or POST request body.

For more information, see the [Schedules documentation](https://docs.apify.com/api/v2#/reference/schedules/schedule-object/get-schedule).
