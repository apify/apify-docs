---
title: II - Managing source code
description: Learn how to manage your Actor's source code more efficiently by integrating it with a GitHub repository. This is standard on the Apify platform.
sidebar_position: 6.2
slug: /expert-scraping-with-apify/managing-source-code
---

# Managing source code {#managing-source-code}

**Learn how to manage your Actor's source code more efficiently by integrating it with a GitHub repository. This is standard on the Apify platform.**

---

In this brief lesson, we'll discuss how to better manage an actor's source code. Up 'til now, you've been developing your scripts locally, then pushing the code directly to the actor on the Apify platform; however, there is a much more optimal (and standard) way.

## Learning 🧠 {#learning}

Thus far, every time we've updated our code on the Apify platform, we've used the `apify push` CLI command; however, this can be problematic for a few reasons - mainly because, if someone else wants to make a change to/maintain your code, they don't have access to it, as it is on your local machine.

If you're not yet familiar with Git, please get familiar with it through the [Git documentation](https://git-scm.com/docs), then take a quick moment to read about [GitHub integration](/platform/actors/development/actor-definition/source-code#github-integration) in the Apify docs.

Also, try to explore the **Multifile editor** in one of the actors you developed in the previous lessons before moving forward.

## Knowledge check 📝 {#quiz}

1. Do you have to rebuild an actor each time the source code is changed?
2. In Git, what is the difference between **pushing** changes and making a **pull request**?
3. Based on your knowledge and experience, is the `apify push` command worth using (in your opinion)?

[**Answers**](./solutions/managing_source.md)

## Our task {#our-task}

> This lesson's task is so quick and easy, we won't even be splitting this topic into two parts like the previous two topics!

First, we must initialize a GitHub repository (you can use Gitlab if you like, but this lesson's examples will be using GitHub). Then, after pushing our main Amazon Actor's code to the repo, we must switch its source code to use the content of the GitHub repository instead.

## Integrating GitHub source code {#integrating-github}

First, let's create a repository. This can be done [in a number of ways](https://kbroman.org/github_tutorial/pages/init.html), but in this lesson we'll do it by creating the remote repository on GitHub's website:

![Create a new GitHub repo](./images/github-new-repo.png)

Then, we'll run the commands it tells us in our terminal (while within the **demo-actor** directory) to initialize the repository locally, then push all of the files to the remote one.

After you've created your repo, navigate on the Apify platform to the actor we called **demo-actor**. In the **Source** tab, click the dropdown menu under **Source code** and select **Git repository**. By default, this is set to **Web IDE**, which is what we've been using so far.

![Select source code location](./images/select-source-location.png)

Then, go ahead and paste the link to your repository into the **Git URL** text field and click **Save**.

The final step is to click on **API** in the top right corner of your actor's page:

![API button](./images/api-button.jpg)

And scroll through all of the links until you find the **Build Actor** API endpoint. Copy this endpoint's URL, then head back over to your GitHub repository and navigate to **Settings > Webhooks > Add webhook**. The final thing to do is to paste the URL and save the webhook.

![Adding a webhook to your GitHub repo](../../../platform/actors/development/deployment/images/ci-github-integration.png)

And you're done! 🎉

## Quick chat about code management {#code-management}

So, it was bit of overhead, but the good news is that you don't ever have to configure this stuff again for this actor. Now, every time the content of your **main**/**master** branch changes, the actor on the Apify platform will rebuild based off of the newest code.

Think of it as combining two steps into one! Normally, you'd have to do a `git push` from your terminal in order to get the newest code onto GitHub, then run `apify push` to push it to the platform.

It's also important to know that GitHub/Gitlab repository integration is standard practice. As projects grow and the number of contributors and maintainers increases, it only makes sense to have a GitHub repository integrated with the project's Actor. For the remainder of this course, all Actors created will be integrated with a GitHub repository.

## Next up {#next}

[Next up](./tasks_and_storage.md), you'll learn about the different ways to store scraped data, as well as how to utilize a cool feature to run pre-configured actors.
