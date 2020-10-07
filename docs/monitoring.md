---
title: Monitoring
description: Step-by-step tutorial that will help you get started with monitoring of your projects.
menuWeight: 5
category: guides
paths:
    - monitoring
---

# [](#what-is-the-monitoring-suite) What is the monitoring suite?

The [monitoring suite](https://apify.com/apify/monitoring) is a collection of Apify [actors]({{@link actors.md}}) that allows you to automate the monitoring of other jobs you have running on the Apify [platform](https://apify.com).

You can use it to monitor anything from a single actor to complex projects spanning multiple actors, [tasks]({{@link actors/tasks.md}}) or [storages]({{@link storage.md}}).

## [](#how-does-it-work) How does it work?



## [](#what-can-i-gain-from-monitoring) What can I gain from monitoring?



## [](#how-much-does-it-cost) How much does it cost?



## [](#how-can-I-set-up-monitoring) How can I set up monitoring?

We currently have examples for monitoring the following scenarios.

* [Notify me when an actor or task fails or there are no results](#notify-me-when-an-actor-or-task-fails-or-there-are-no-results)

* [Check my product-based data for correct format and duplicates](#check-my-product-based-data-for-correct-format-and-duplicates)

* [Monitor named datasets which aggregate data from multiple actors or tasks](#monitor-named-datasets-which-aggregate-data-from-multiple-actors-or-tasks)

* [Monitor multiple actors or tasks with dataset validation and dashboard](#monitor-multiple-actors-or-tasks-with-dataset-validation-and-dashboard)

### [](#add-the-monitoring-suite-to-your-account) Add the monitoring suite to your account

On the [monitoring suite](https://apify.com/apify/monitoring)'s page in [Apify Store](https://apify.com/store), click the **Try for free** button. This will add the suite to your [list of actors](https://my.apify.com/actors), take you to the [Apify app](https://my.apify.com) and create a new [task]({{@link actors/tasks.md}}).

![Monitoring actor in Apify Store]({{@asset monitoring/images/monitoring-in-store.png}})

Then, just give your task a name (under the **Settings** tab) and save it.

## [](#notifications) Notifications

The monitoring suite will send notifications to the [email address associated with your account](https://my.apify.com/account) by default.

You can disable email notifications or change the email address in a task **Input**'s **Email notifications** section.

[Customize notifications]({{@asset monitoring/images/customize-notifications.png}})

If you use [Slack](https://slack.com/), we suggest you using Slack notifications instead of email.

### [](#example-of-a-failed-run) Example of a failed run

Below is an example of a notification for a run that did not return enough results.

[Failed run example]({{@asset monitoring/images/puppies-failed-run.png}})

To see what went wrong, click on the **time** next to **Actor run** to open your task's **Runs** dashboard. When you click on **Details**, you'll find a detailed monitoring report in JSON format.