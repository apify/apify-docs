---
title: III - Managing source code
description: Learn how to manage your actor's source code more efficiently by integrating it with a Github repository. This is the standard on the Apify platform.
menuWeight: 6.3
paths:
    - expert-scraping-with-apify/managing-source-code
---

# [](#managing-source-code) Managing source code

In this brief lesson, we'll discuss how to better manage an actor's source code. Up 'til now, you've been developing your scripts locally, then pushing the code directly to the actor on the Apify platform; however, there is a much more optimal (and standard) way.

## [](#learning) Learning 🧠

Thus far, every time we've updated our code on the Apify platform, we've used the `apify push` CLI command; however, this can be problematic for a few reasons - mainly because, if someone else wants to make a change to/maintain your code, they don't have access to it, as it is on your local machine.

If you're not yet familiar with Git, please get familiar with it through the [Git documentation](https://git-scm.com/docs), then take a quick moment to read about [Github integration](https://docs.apify.com/actors/development/source-code#github-integration) in the Apify docs.

Also, try to explore the **Multifile editor** in one of the actors you developed in the previous lessons before moving forward.

## [](#quiz) Knowledge check 📝

1. Do you have to rebuild an actor each time the source code is changed?
2. In Git, what is the difference between **pushing** changes and making a **pull request**?
3. Based on your knowledge and experience, is the `apify push` command worth using (in your opinion)?

[**Answers**]({{@link expert_scraping_with_apify/solutions/managing_source.md}})

## [](#our-task) Our task

> This lesson's task is so quick and easy, we won't even be splitting this topic into two parts like the previous two topics!

First, we must initialize a Github repository (you can use Gitlab if you'd like, but this lesson's examples will be using Github). Then, after pushing our main Amazon actor's code to the repo, we must switch our actor's source code to use the content of the Github repository instead.

## [](#integrating-github) Integrating Github source code

First, let's create a repository. This can be done [in a number of ways](https://kbroman.org/github_tutorial/pages/init.html), but in this lesson we'll do it by creating the remote repository on Github's website:

![Create a new Github repo]({{@asset expert_scraping_with_apify/images/github-new-repo.webp}})

Then, we'll run the commands it tells us in our terminal (while within the **demo-actor** directory) to initialize the repository locally, then push all of the files to the remote one.

After you've created your repo, navigate on the Apify platform to the actor we called **demo-actor**. In the **Source** tab, click the dropdown menu under **Source code** and select **Git repository**. By default, this is set to **Multiple source files**, which is what we've been using so far.

![Select source code location]({{@asset expert_scraping_with_apify/images/select-source-location.webp}})

Then, go ahead and paste the link to your repository into the **Git URL** text field and click **Save**.

The final step is to click on **API** in the top right corner of your actor's page:

![API button]({{@asset expert_scraping_with_apify/images/api-button.webp}})

And scroll through all of the links until you find the **Build actor** API endpoint. Copy this endpoint's URL, then head back over to your Github repository and navigate to **Settings > Webhooks > Add webhook**. The final thing to do is to paste the URL and save the webhook.

![Adding a webhook to your Github repo]({{@asset expert_scraping_with_apify/images/github-integration.webp}})

And you're done! 🎉

## [](#code-management) Quick chat about code management

So, it was bit of overhead, but the good news is that you don't ever have to configure this stuff again for this actor. Now, every time the content of your **main**/**master** branch changes, the actor on the Apify platform will rebuild based off of the newest code.

A great way to think about it is that, by doing this, you are combining two steps into one! Normally, you'd have to do a `git push` from your terminal in order to get the newest code onto Github, then run `apify push` to push it to the platform.

It's also important to know that Github/Gitlab repository integration is standard practice. As projects grow, and the number of contributors and maintainers grows, it only makes sense to have a Github repository integrated with the project's actor. For the remainder of this course, all actors created will be integrated with a Github repository.

## [](#next) Next up

[Next up]({{@link expert_scraping_with_apify/tasks_and_storage.md}}), you'll learn about the different ways to store scraped data, as well as how to utilize a cool feature to run pre-configured actors.
