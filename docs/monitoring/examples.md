---
title: Examples
description: Step-by-step tutorials that will help you get started with monitoring the performance of Apify actors.
menuWeight: 5
category: guides
paths:
    - monitoring/examples
---

# [](#what-is-the-monitoring-suite) What is the monitoring suite?

The [monitoring suite](https://apify.com/apify/monitoring) is an Apify [actor]({{@link actors.md}}) that allows you to automate the monitoring of other jobs you have running on the Apify [platform](https://apify.com).
You can use it to monitor a single actor or for complex projects spanning multiple actors and [datasets]({{@link storage/dataset.md}}).

This document outlines multiple scenarios and how to configure monitoring [tasks]({{@link actors/tasks.md}}) for each.

## [](#add-the-monitoring-suite-to-your-account) Add the monitoring suite to your account

On the [monitoring suite](https://apify.com/apify/monitoring)'s page in [Apify Store](https://apify.com/store), click the **Try for free** button. This will take you to the [Apify app](https://my.apify.com) and create a new task. 

![Monitoring actor in Apify Store]({{@asset monitoring/images/monitoring-in-store.png}})

Then, just give your task a name (under the **Settings** tab) and save it.

## [](#notify-me-when-an-actor-or-task-fails-or-there-are-no-results) Notify me when an actor or task fails or there are no results

**Use case**: you want to be notified when an actor / task **does not** finish successfully.

This means the notification will be sent whenever the actor or task:

- Fails (finishes with the status **FAILED**).
- Times out (finishes with status **TIMED OUT**).
- There are no results or there are fewer results than expected.

For the purpose of this example, let's use an [Instagram scraper](https://apify.com/jaroslavhejlek/instagram-scraper) task which gets a fresh batch of `#puppies` photos every day.

Let's say you have created a task named **puppies-from-instagram** and run it regularly (manually or using a [schedule]({{@link schedules.md}})).

![Puppies]({{@asset monitoring/images/puppies.png}})

### [](#create-a-new-monitoring-task) Create a new monitoring task

If you haven't already, [add the monitoring suite to your account](#add-the-monitoring-suite-to-your-account).

If you have already added the task, under its **Settings** tab, give it a name. For example, **monitoring-puppies-are-ok**, since we're monitoring the **puppies-from-instagram** task.

Next, we will configure the monitoring suite.

### [](#monitoring-configuration) Monitoring configuration

1. Under your task's **Input** tab, set the **Mode** dropdown to **Create configuration**.

2. Next, open the **What you want to monitor** section. Give the monitoring suite a name in the **Monitoring suite name** field, e.g. **puppies-are-ok**. 

> Each of your monitoring suites must have a unique name.

3. In the **Type of target:** dropdown, select **Task**, since you will be monitoring an Instagram Scraper task.

4. **Target name patterns** should be the name of your task, **puppies-from-instagram**. 

5. Select the **Notify me whenever actor/task does not succeed** option to receive a report when a run finishes unsuccessfully.

The configuration should look like this:

![Task configuration]({{@asset monitoring/images/configuration.png}})

### [](#set-the-minimum-number-of-results) Set the minimum number of results

Let's say you need a minimum number of 100 results.

1. Open the **Validating by a schema** section and select the **Enable schema validation** option.

2. In the **Validation options** field, create an [object](https://javascript.info/object) containing a **minItemCount** key with **100** as its value. You can also set this number to **1** if you want to be notified only when there are **no** items.

![Task configuration]({{@asset monitoring/images/puppies-task-2.png}})

Finally, click the **Save & Run** button and you're done.

From now on, you will get a notification to your account's email every time your **puppies-from-instagram** task doesn't succeed or returns fewer than 100 items.

### [](#example-of-a-failed-run) Example of a failed run

If your actor run times out, you will receive the following notification.

[Task configuration]({{@asset monitoring/images/puppies-task-3.png}})

To see what went wrong, you can open your task's **Runs** dashboard by clicking on the time next to **Actor run.** When you click on **Details**, you'll find a detailed monitoring report in JSON format.


## [](#check-my-product-based-data-for-correct-format-and-duplicates) Check my product-based data for correct format and duplicates

**Use case**: you want regularly scrape product data using single scraper. You need:

- Data to always be in the correct format.
- Alerts if items are duplicated.
- Notification when your scheduled run finishes successfully.
- Data visualization on a simple dashboard.

Let's say you're using the [Amazon scraper](https://apify.com/vaclavrut/amazon-crawler) from [Apify Store](https://apify.com/store) to get daily **iPhone X** offers.

You have set up a task named **amazon-iphone-offers** and set up a [schedule]({{@link schedules.md}}) named **iphone-daily-offers**. The schedule runs your task [every morning](https://crontab.guru/#0_7_*_*_*), so you have fresh data ready when you wake up.

### [](#create-a-new-monitoring-task) Create a new monitoring task

If you haven't already, [add the monitoring suite to your account](#add-the-monitoring-suite-to-your-account).

If you have already added the task, under its **Settings** tab, give it a name. For example, **monitoring-iphone-offers**, since we're monitoring the **amazon-iphone-offers** task.

Next, we will configure the monitoring suite.

### [](#monitoring-configuration) Monitoring configuration

1. Under your task's **Input** tab, set the **Mode** dropdown to **Create configuration**.

2. Next, open the **What you want to monitor** section. Give the monitoring suite a name in the **Monitoring suite name** field, e.g. **iphone-offers**. 

> Each of your monitoring suites must have a unique name.

3. In the **Type of target:** dropdown, select **Task**, since you will be monitoring an Amazon Scraper task.

4. **Target name patterns** should be the name of your task, **amazon-iphone-offers**.

5. Select the **Notify me whenever actor/task does not succeed** option to receive a report when a run finishes unsuccessfully.

This is what the configuration should look like:

[Task configuration - input]({{@asset monitoring/images/iphone-task.png}})

### [](#validate-data) Validate data

Let's say you need each item to always have properties such as **title**, **ASIN**, **currency** and a list of **sellers**.

1. Open the **Validating by a schema** section and select the **Enable schema validation** option.

2. In the **Validation options** field, create an [object](https://javascript.info/object) containing a `schema` key. As its value, set an object specifying the format of each of the properties you want to validate.

[Task configuration - validate data]({{@asset monitoring/images/iphone-task-2.png}})

The monitoring suite uses the [ow](https://www.npmjs.com/package/ow) library for type validation. Make sure to import the library using `/* global ow */`.

> Validation is done after the each run finishes.

3. In the **Check for duplicates** section, select the **Enable duplicate items check** option.

4. Set the **Unique keys** field to `asin` to make sure all the ASIN properties are unique.

[Task configuration - check for duplicates]({{@asset monitoring/images/iphone-task-3.png}})

### [](#set-up-data-visualization) Set up data visualization

You can configure data visualization in the **Statistics dashboard** section. To enable it, check the **Enable dashboard** option.

[Task configuration - visualization]({{@asset monitoring/images/iphone-task-4.png}})

Finally, click the **Save & Run** button. It will create a monitoring configuration and turn the monitoring ON.

You will receive an email with a link to your [monitoring dashboard](#getting-your-results) after a while. After each of your **amazon-iphone-offers** tasks runs, the suite will process your results and report if any of the checks fail.

### [](#getting-your-results) Getting your results

After the monitoring task finishes and the analyzes the statistics, you receive an email with a link to your **monitoring project dashboard**.

Here, you can see the result statuses of your monitored tasks and filter them by time. You can also see each run's [key-value store]({{@link storage/key_value_store.md}}) records and [dataset]({{@link storage/dataset.md}}) item charts.

This is what your dashboard can look like after some time:

[Monitoring dashboard]({{@asset monitoring/images/monitoring-dashboard.png}})

## [](#monitoring-named-datasets-which-aggregate-data-from-multiple-actors-tasks) Monitoring named datasets which aggregate data from multiple actors/tasks

Imagine you have 2+ actors or tasks that are scraping the same data from multiple websites and push the data to one named dataset.

### Use case:

- data always have the right format
- any duplicated items
- your scheduled run finishes successfully
- data visualization on a simple dashboard

Let's create a simple example  to better illustrate this situation. Imagine you want to scrape a daily jokes from two web sites and store them in a single named dataset. You will create two tasks/actors and set them to save the results in desired dataset. In software development the testing (validation, verification) part is very important so you will probably want to ensure that the data is all well. In this moment you can either write you custom "testing" actor and put all the necessary pieces together, or you can use the [monitoring-suite](https://apify.com/apify/monitoring) actor, which has most of the features out of the box. The best part is that you can configure the monitoring by filling a form.

No lets look at the example project to have a more in-depth understanding.

[Joke tasks]({{@asset monitoring/images/tasks.png}})

As you can see we have two tasks that are handling the jokes scraping. Each of the task handles a different website. After each tasks finishes successfully it calls actor using the webhook that handles the data aggregation. If you don't now what a webhook is don't worry, it is not important at this point.

[Joke schedule]({{@asset monitoring/images/schedules.png}})

The two extraction tasks are scheduled to run every day (`@daily`). They produce an so called named dataset for each day. The naming convention for the dataset is `DAILY-JOKES-<DateOfTheDay>`.

[Joke storage]({{@asset monitoring/images/storage.png}})

Now to the actual monitoring part. For the need of this short tutorial let's skip the monitoring of the actors and  let's jump to the the dataset straight away.

In order to setup the monitoring suite to monitor a dataset on a daily basis we have to do a few steps.

### Monitoring configuration

First of all Choose **create configuration** in **mode** option. Now you have to select the `Type of target` as dataset and into the target name patterns enter only one pattern and for our use case it is the `DAILY-JOKES` pattern. It could be also more strict pattern such as `^DAILY-JOKES`.

[Monitoring configuration]({{@asset monitoring/images/jokes1.png}})

In order to add the dashboard, you have to scroll down to the **Statistics dashboard** section and enable this feature.

[Monitoring dashboard configuration]({{@asset monitoring/images/dashboard.png}})

Now let's ensure that your jokes have the right forma. The joke object or dataset item has a simple structure it should contain `title` and `text`, both of those values are strings. You need to enable this feature fill in the schema and in this particular case don't forget to change the **Validation frequency** to something else than default value `Per run` , because datasets don't have runs.

[Monitoring dashboard configuration]({{@asset monitoring/images/schemaJokes.png}})

This is how the validation schema should look like.

The duplication check is added the same way as the schema check. You need to enable the feature and select the unique keys. In our case the unique keys are both the text and the title. Same as for the schema check don't forget to change the **Check frequency** to something else than `Per run`

[Monitoring duplication configuration]({{@asset monitoring/images/duplication.png}})

Monitoring is going to send the notifications to your account email address by default. You can disable email notifications or change the email address in the **Email notifications** section. If you are using a Slack for communication, I strongly recommend you using the Slack notification instead of the email.

Now you have successfully created a monitoring task.

### 4) Monitoring multiple actors or tasks with dataset validation and dashboard

Let's imagine you want to monitor multiple actors or tasks at once

### Use case:

- Validate default dataset (check structure, item count)
- Notify on failure
- Present statistics on dashboard

Now we will illustrate this use of monitoring on a imaginary use-case. Our use-case is  as follows: We want to scrape Covid-19 data for a few central Europe countries. The selected countries are: Germany, Austria, Poland and Czechia. In order to do that we will create a task from the Apify store. Each task represents one country.

[Multiple tasks]({{@asset monitoring/images/multiple-tasks.png}})

### Monitoring configuration

As you can see in the use-case intro part the tasks follow a simple naming convention, which makes the setup shorter and less time consuming. This tasks always starts with `covid-` and the the name of the country follows, so in order to select all you just have to fill the **Target name patterns** with one value `^covid-` if you  have more these actors under your account and wanted to select only these four you  than need to enter four values into the **Target name patterns**. First value `covid-germany`, second value `covid-poland` and so on.

[Covid actors]({{@asset monitoring/images/covid.png}})

You also want to get a notification when the task run fails so we check the **Notify me whenever.**

Now you want to add the dashboard to do that you have to scroll down to the **Statistics dashboard** section and enable this feature.

[Monitoring dashboard configuration]({{@asset monitoring/images/dashboard%201.png}})

Now let's ensure that your datasets have the right format. Things will get a little more tricky here, but don't worry it will make sense in the end. We have used a four actors from store that each of them presumably has a little bit different dataset item structure, so we need to validate each dataset by a little different schema. We have multiple options how to do that. We can use the Ids of the tasks or filter the tasks (once again) by their names.

[Monitoring schema configuration]({{@asset monitoring/images/schemaCovid.png}})

This is a part of the validation options field, but I think you get the message now. In each validation option we select the task we want to validate the dataset for by specifying the `filter` property. Also when validating datasets for actors and tasks it is best to select the validation frequency as `per run` than you will get the feedback imediatelly after the run is finished.

Monitoring is going to send the notifications to your account email address by default. You can disable email notifications or change the email address in the **Email notifications** section. If you are using a Slack for communication I strongly recommend you using the Slack notification instead of the email. You have successfully created a monitoring task.
