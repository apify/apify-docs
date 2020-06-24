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

[Schedules](https://my.apify.com/schedules) are used to automatically start your actors at certain times. Each schedule can be associated with a number of actors and actor tasks. It is also possible to override the settings of each actor/task similarly to when invoking the actor/task using the [Apify API](https://docs.apify.com/api/v2).

The schedules use [cron expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression) to specify run times. A cron expression has the following structure:

|Position|Field|Values|Wildcards|Optional|
|--- |--- |--- |--- |--- |
|1|second|0 - 59|, - * /|yes|
|2|minute|0 - 59|, - * /|no|
|3|hour|0 - 23|, - * /|no|
|4|day of month|1 - 31|, - * /|no|
|5|month|1 - 12|, - * /|no|
|6|day of week|0 - 7 (0 or 7 is Sunday)|, - * /|no|

For example, the expression `5 16 * * 1` will start an actor at 16:05 every Monday.

**Note:** all dates and times in the cron expression are always assumed to be in the [UTC time zone](https://www.timeanddate.com/worldclock/timezone/utc). The minimum interval between runs is 10 seconds; if your next run is scheduled sooner than 10 seconds after the previous run, the next run will be skipped.

## [](#examples) Examples of cron expressions

- `0 8 * * *` === every day at 8am
- `0 0 * * 0` === every 7 days (at 00:00 on Sunday)
- `*/3 * * * *` === every 3rd minute
- `0 0 1 */2 *` === every other month (at 00:00 on the first day of month, every 2nd month)

Additionally, you can use the following shortcut expressions:

- `@yearly` === `0 0 1 1 *`
- `@monthly` === `0 0 1 * *`
- `@weekly` === `0 0 * * 0`
- `@daily` === `0 0 * * *`
- `@hourly` === `0 * * * *`


You can find more information and examples of cron expressions on [crontab.guru](http://crontab.guru/).

