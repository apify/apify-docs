---
title: Monitor multiple tasks
description: A step-by-step monitoring tutorial that shows you how to monitor multiple runs, validate your results and visualize them using the monitoring dashboard.
menuWeight: 6.4
category: guides
paths:
    - monitoring/monitor-multiple-tasks
---

# [](#monitor-multiple-actors-or-tasks) Monitor multiple actors or tasks

This example walks you through setting up [monitoring](https://apify.com/apify/monitoring) for a multiple [tasks]({{@link actors/tasks.md}}), [validating data](#validate-data) and setting up a data monitoring [dashboard](#set-up-data-visualization). Though the tutorial focuses on tasks, you can also use it to monitor [actors]({{@link actors.md}}).

## [](#use-case) Use case

You want to monitor multiple actors or tasks at once.

You need:

- To [validate](#validate-data) the default dataset (check structure, item count).
- [Notification]({{@link monitoring.md#notifications}}) of run failure.
- Statistics presented on a [dashboard](#set-up-data-visualization).

In this scenario we'll imagine you want to scrape [COVID-19 data](https://apify.com/covid-19) for [several countries](https://apify.com/store?search=covid):
[Brazil](https://apify.com/pocesar/covid-brazil),
[Germany](https://apify.com/lukass/covid-ger),
the [USA](https://apify.com/petrpatek/covid-usa-cdc)
and [Singapore](https://apify.com/tugkan/covid-sg).
You have created a task from each of the actors tracking those countries.

![Multiple tasks]({{@asset monitoring/images/covid-multiple-tasks.png}})

## [](#create-a-new-monitoring-task) Create a new monitoring task

If you haven't already, [add the monitoring suite to your account]({{@link monitoring.md#add-the-monitoring-suite-to-your-account}}).

If you have already added the task, under its **Settings** tab, give it a name. For example, `monitoring-covid-tasks`.

> We recommend prefixing your monitoring task names with `monitoring-` so you could identify them easier.

Next, we will configure the monitoring suite.

## [](#configure-monitoring) Configure monitoring

1. Under your task's **Input** tab, set the **Mode** dropdown to **Create configuration**.

2. Next, open the **What you want to monitor** section. Give the monitoring suite a name in the **Monitoring suite name** field, e.g. `covid-tasks`.

3. In the **Type of target:** dropdown, select **Task**, since you will be monitoring [actor tasks]({{@link actors/tasks.md}}).

4. **Target name patterns** should be `^covid-`. The task names follow a simple naming convention (all start with **covid-**), so this name pattern will target all of the above tasks. To select only particular tasks, add separate **Target name patterns** for each: `covid-germany`, `covid-usa`, etc.

5. Select the **Notify me whenever actor/task does not succeed** option to receive a report when a run finishes unsuccessfully.

> Each of your monitoring suites must have a unique name.

![Monitoring covid tasks - configuration]({{@asset monitoring/images/covid-config.png}})

## [](#validate-data) Validate data

Now let's ensure that your data have the correct format.

We have used four actors from [Apify Store](https://apify.com/store). Each actor will return a differently structured [dataset]({{@link storage/dataset.md}}), so we need to validate them using a different schema. To do this, you can use the tasks' IDs or filter the them by their names.

1. Open the **Validating by a schema** section and select the **Enable schema validation** option.

2. In the **Validation options** field, create a separate [object](https://javascript.info/object) for each task containing `filter` and `schema`. For `filter`, specify the task it is for (e.g. `covid-singapore`). For `schema`, set an object specifying the format of each of the properties you want to validate.

3. It is best to set **Validation frequency** to `Per run`, so the data is validated right after it is collected.

![Monitoring dashboard configuration - validate]({{@asset monitoring/images/covid-validate-schema.png}})

The monitoring suite uses the [ow](https://www.npmjs.com/package/ow) library for type validation. Make sure to import the library using `/* global ow */`.

## [](#set-up-data-visualization) Set up data visualization

To add the monitoring dashboard, open the **Statistics dashboard** section and enable this feature.

![Monitoring dashboard configuration]({{@asset monitoring/images/enable-dashboard.png}})
