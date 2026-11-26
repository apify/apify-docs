---
title: Managing source code
description: Learn how to manage your Actor's source code more efficiently by integrating it with a GitHub repository. This is standard on the Apify platform.
sidebar_position: 6.2
sidebar_label: II - Managing source code
slug: /expert-scraping-with-apify/managing-source-code
pagination: true
---

**Learn how to manage your Actor's source code more efficiently by integrating it with a GitHub repository. This is standard on the Apify platform.**

---

In this brief lesson, we'll discuss how to better manage an Actor's source code. Until now, you've worked on your Actors' code locally and pushed it directly to the Apify platform. However, there's a better and more standard way.

## Learning 🧠 {#learning}

Thus far, every time we've updated our code on the Apify platform, we've used the `apify push` CLI command; however, this can be problematic for a few reasons - mainly because, if someone else wants to make a change to/maintain your code, they don't have access to it, as it is on your local machine.

If you're not yet familiar with Git, please get familiar with it through the [Git documentation](https://git-scm.com/docs), then take a quick moment to read about [GitHub integration](/integrations/github) in the Apify docs.

Also, try to explore the **Multifile editor** in **filter-actor**, which you created in the previous lesson, before moving forward.

## Knowledge check 📝 {#quiz}

1. Do you have to rebuild an Actor each time the source code is changed?
2. In Git, what is the difference between **pushing** changes and making a **pull request**?
3. Based on your knowledge and experience, is the `apify push` command worth using (in your opinion)?

[**Answers**](./solutions/managing_source.md)

## Our task {#our-task}

First, we must initialize a GitHub repository (you can use Gitlab if you like, but this lesson's examples will be using GitHub). Then, after pushing our main Amazon Actor's code to the repo, we must switch its source code to use the content of the GitHub repository instead.

## Integrating GitHub source code {#integrating-github}

First, let's create a repository. This can be done [in a number of ways](https://kbroman.org/github_tutorial/pages/init.html), but in this lesson, we'll do it by creating the remote repository on GitHub's website. Open GitHub's **+** menu and select **New repository**. Name it **academy-amazon-scraper** and create it empty, without a README, `.gitignore`, or license, because we'll push our existing code into it.

![GitHub's + menu open, with New repository highlighted](./images/github-new-repo.png)

GitHub then suggests commands for pushing an existing repository, but we can't use them as they are. We cloned **academy-amazon-scraper** from the starter repository, so its `origin` remote already points to `apify-projects/academy-amazon-scraper`, and `git remote add origin …` would fail with `remote origin already exists`. Instead, we'll point `origin` to our new repository and push all of the files to it. Run the following in the **academy-amazon-scraper** directory, with your own repository URL:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/academy-amazon-scraper.git
git push -u origin main
```

Once the code is on GitHub, open your **academy-amazon-scraper** Actor in Apify Console. On the **Source** tab, change **Source type** from **Web IDE**, which is what we've been using so far, to **Git repository**.

Then, go ahead and paste the link to your repository into the **Git URL** text field and click **Save**.

The final step is to check your **Build settings**. Under the Git URL field, there're two options: **Automatic builds** and **Manual builds**. Select **Automatic builds**. It tells Apify to rebuild your Actor whenever you push to GitHub, with no extra configuration needed.

![Build settings with Automatic builds selected](./images/build-settings.webp)

And you're done! 🎉

## Quick chat about code management {#code-management}

This was a bit of overhead, but the good news is that you don't ever have to configure this stuff again for this Actor. Now, every time the content of your `main`/`master` branch changes, the Actor on the Apify platform will rebuild based on the newest code.

Think of it as combining two steps into one. Normally, you'd have to do a `git push` from your terminal to get the newest code onto GitHub, then run `apify push` to push it to the platform.

It's also important to know that GitHub/GitLab repository integration is standard practice. As projects grow and the number of contributors and maintainers increases, it only makes sense to have a GitHub repository integrated with the project's Actor. For small helper Actors, `apify push` is still handy, so later in this course we'll use it to deploy the new Actors we create. Feel free to integrate them with a GitHub repository instead.

## Deploying changes to the Amazon scraper

Unlike the helper Actors we'll create later in the course, **academy-amazon-scraper** now builds from your Git repository. To deploy a change to it in the following lessons, commit the change and run `git push`, then wait for the build to finish before you start the Actor.

Running `apify push` in its folder fails with an error, and `apify push --force` would switch the Actor's source back to local files, so don't use either.

## Next up {#next}

[Next up](./tasks_and_storage.md), you'll learn about the different ways to store scraped data, as well as how to utilize a cool feature to run pre-configured Actors.
