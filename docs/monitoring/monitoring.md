# Monitoring suite
In this documentation section you are presented the most common use-cases for the monitoring suite, which you can leverage in your own projects to have better understanding of your actors, tasks and datasets validity.
Each of the use-case presents the use-case itself and than it guides you through the [monitoring suite](https://apify.com/apify/monitoring) task configuration.
The use-cases starts with the easy ones.

## What is monitoring suite?
Monitoring suite is an easy to use tool that allows you to set up automated
monitoring of your actors in no time. It can be used for simple tasks and
complex projects spanning multiple actors and datasets as well.

## Monitoring setup examples

### 1) Notify me when my actor/task fails or when there are no results

### Use case

You have an actor or a task and want to be notified when it does not finish successfully. This means the notification will be sent whenever the actor or task:

- fails (finishes with status FAILED)
- times out (finishes with status TIMED-OUT)
- there are no results or there are less results then expected

You can use any task of your own, but for the purpose of this example, let's say you use an [instagram scraper](https://apify.com/jaroslavhejlek/instagram-scraper) task to get a fresh batch of `#puppies` photos every day. You have created the **`puppies-from-instagram`** task and run it regularly (manually or with a scheduler).

![Puppies]({{@asset monitoring/images/puppies.png}})

### Add Monitoring suite to your account

Go to the Apify Store to create a [monitoring suite](https://apify.com/apify/monitoring) task. Click the **Try for free** button.

![Monitoring store actor]({{@asset monitoring/images/monitoringInStore.png}})

Give your task a name and save it. Let's say you pick: **`monitoring-puppies-are-ok`** as the name. Next step is configuration of your monitoring suite.

### Monitoring configuration

Go to the task input and select **create configuration** in the **Mode** dropdown menu.

In the ***What you want to monitor*** section, type a name in the **Monitoring suite name** - it can be something like **`puppies-are-ok`.** It must be different from any other monitoring suite names you might have.

Choose **Type of target:** **Task** in this case because you want to monitor your Instagram Scraper task. **Target name patterns** should be filled with the name of your task: **`puppies-from-instagram`**. Final step of this configuration is to check the **Notify me whenever actor/task does not succeed** **option which enables active checking of your finished runs.

The result of your configuration should look like this:

![Task configuration]({{@asset monitoring/images/configuration.png}})

To set the minimal number of items go to the **Validating by a schema** section and check **Enable schema validation**.

Lets say your minimal accepted number of results is 100. Go to the **Validation options** input field and create object with **minItemCount** key with 100 as a value. You can also set this number to 1 if you want to be notified only when there are no items.

![Task configuration]({{@asset monitoring/images/puppiesTask2.png}})

Click the **Save & Run** button and it's done. From now on, you will get a notification to your account's email every time your `puppies-from-instagram` task wouldn't succeed or there is less then 100 items in the dataset.

This is how the example error report looks like when your run `TIMED-OUT` for any reason:

[Task configuration]({{@asset monitoring/images/puppiesTask3.png}})

To see what went wrong, you can open your task's run dashboard by clicking on the time next to **Actor run.** **When you click on **Details**, you'll find a detailed monitoring report in a JSON format.

## 2) Check my product-based data for correct format and duplicates

### Use case

Image you want regularly scrape any product data by single scraper and you need to know:

- data always have the right format
- any duplicated items
- your scheduled run finishes successfully
- data visualization on a simple dashboard

If this is exactly what you need, our [monitoring suite](https://apify.com/apify/monitoring) and it's checkers is a match for you.

You can for example use the [amazon scraper](https://apify.com/vaclavrut/amazon-crawler) from our [Apify store](https://apify.com/store) as a example to get daily offers on `**iPhone X**`.
Let's say you already have set up your task named for example **`amazon-iphone-offers`**. You scheduled it to run every morning to have the fresh data ready before you wake up with `**iphone-daily-offers**` schedule.

### Add Monitoring suite to your account

Go to the Apify Store to create a [monitoring suite](https://apify.com/apify/monitoring) task. Click the **Try for free** button.

[Monitoring store actor]({{@asset monitoring/images/monnitoringInStore.png}})

Name your Task for example **`monitoring-iphone-offers`** and save. Now, you have your task created and you want to make it work.

### Monitoring configuration

You are ready to make the monitoring configuration within a few steps:

Choose **create configuration** in **mode** option at first.

Add **`iphone-offers`** as a **Monitoring suite name**  and **Type of target:** **task**. Type name of your task to the **Target name patterns** *option -* `**amazon-iphone-offers**`*.*

Checking the option **Notify me whenever actor/task does not succeed** **enables reporting unsuccessful finished runs.

This is how the configuration should look like:

[Task configuration]({{@asset monitoring/images/iphoneTask.png}})

Lets say that you need each of your item to always have properties as: `title`, `asin`, `currency`, and list of `sellers`. The desired configuration can look like:

The validation is done always after the each run finishes.

[Task configuration]({{@asset monitoring/images/iphoneTask2.png}})

Check **Enable duplicate items check** option in ***Check for duplicates** section and insert* `asin`

as a **Unique key** option if you do not want to allow more items with a same `asin` property.

Checking for duplicated items will be also always done after run's finish.

[Task configuration]({{@asset monitoring/images/iphoneTask3.png}})

Basic data visualization is hidden under ***Statistics dashboard*** section and you can enable it by checking the **Enable dashboard** **option.

[Task configuration]({{@asset monitoring/images/iphoneTask4.png}})

After the monitoring configuration is run and finished and the statistics are counted you receive an email with link to your monitoring project dashboard. You can see result statuses of your monitored tasks and filter them by time. Run's key-value store records, dataset items charts are generated.

This is how your dashboard can look like after some time:

[Monitoring dashboard]({{@asset monitoring/images/monitoringDashboard.png}})

Click the **Save & Run** button which will create a monitoring configuration and turn the monitoring ON. You should receive the dashboard email after a while. After each of your **`amazon-iphone-offers`** task run all the checkers will process the results and report you if any checks does not pass.

### 3) Monitoring named datasets created for aggregating data from multiple actors/taksks

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
