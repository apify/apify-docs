---
title: Actor README
description: Learn how to write a comprehensive README to help users better navigate, understand and run the actor.
menuWeight: 2
paths:
    - apify-platform/getting-the-most-of-actors-on-apify-store/actor-readme
---

# Actor README

- It should also be a "template" for developers developing new public actors so that they have a structure and guidance for writing the readmes.
- The goal is to ensure that more people will understand and run their actors.
- Whenever you build an actor, think of the original request/idea and the "use case" = "user need" it should solve, please take notes and share them with Apify, so we can help you write a blog post supporting your actor with more information, more detailed explanation, better SEO.
- Consider adding a video, images, and screenshots to your readme to break up the text.
- This is an example of an actor with a readme that corresponds well to the guidelines below:
  - [https://apify.com/dtrungtin/airbnb-scraper](https://apify.com/dtrungtin/airbnb-scraper)
- Tip no.1: if you want to add snippets of code anywhere in your readme, you can use [Carbon](https://github.com/carbon-app/carbon).
- Tip no.2: if you need any quick Markdown guidance, check out [https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)

## What should you add to your actor readme?

Aim for sections 1-6 below and try to include at least 300 words. You can move the sections around to some extent if it makes sense, e.g. 3 might come after 6. Consider using emojis as bullet points or otherwise trying to break up the text.

1. **What does (actor name) do?**

    - in 1-2 sentences describe what the actor does and what it does not do
    - consider adding keywords like API, e.g. Instagram API
    - always have a link to the target website in this section

2. **Why use (actor name)? or Why scrape (target site)?**

    - How it can be beneficial for the user
    - Business use cases
    - Link to a success story, or a business use case, or a blog post.

3. **How much will it cost to scrape (target site)?**

    - Simple text explaining what type of proxies are needed and how many platform credits (calculated mainly from consumption units) are needed for 1000 results.
    - This is calculated from carrying out several runs (or from runs saved in the DB). @Zuzka can help if needed. [Information in this table](https://docs.google.com/spreadsheets/d/1NOkob1eYqTsRPTVQdltYiLUsIipvSFXswRcWQPtCW9M/edit#gid=1761542436), tab "cost of usage".
    - Here’s an example for this section:

    > ## How much will it cost me to scrape Google Maps reviews?
    >
    > <br/> Apify provides you with $5 free usage credits to use every month on the Apify Free plan and you can get up to 100,000 reviews from this Google Maps Reviews Scraper for those credits. So 100k results will be completely free!
    > <br/> But if you need to get more data or to get your data regularly you should grab an Apify subscription. We recommend our $49/month Personal plan - you can get up to 1 million Google Maps reviews every month with the $49 monthly plan! Or 10 million with the $499 Team plan - wow!

4. **How to scrape (target site)**

    - Link to "How to…" blogs, if one exists (or suggest one if it doesn't)
    - Add a video tutorial or gif from an ideal actor run.
    - Consider adding a short numbered tutorial as Google will sometimes pick these up as rich snippets. Remember that this might be in search results, so you can repeat the name of the actor and give a link, e.g.

    ![How to scrape a website - numbered tutorial]({{@asset apify_platform/getting_the_most_of_actors_on_apify_store/images/how-to-scrape-target-site.webp}})

5. **Is it legal to scrape (target site)?**

    - This can be used as boilerplate text for the legal section, but you should use your own judgement and also customize it with the site name.

    > Our scrapers are ethical and do not extract any private user data, such as email addresses, gender, or location. They only extract what the user has chosen to share publicly. We therefore believe that our scrapers, when used for ethical purposes by Apify users, are safe. However, you should be aware that your results could contain personal data. Personal data is protected by the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers. You can also read our blog post on the [legality of web scraping](https://blog.apify.com/is-web-scraping-legal/)

6. **Input**

    - Each actor detail page has an input tab, so you just need to refer to that. If you like, you can add a screenshot showing the user what the input fields will look like.
    - This is an example of how to refer to the input tab:

    > Twitter Scraper has the following input options. Click on the [input tab](https://apify.com/vdrmota/twitter-scraper/input-schema) for more information.

7. **Output**

    - Mention "You can download the dataset extracted by (actor name) in various formats such as JSON, HTML, CSV, or Excel.”
    - Add a simplified JSON dataset example, like here: [https://apify.com/drobnikj/crawler-google-places#output-example](https://apify.com/drobnikj/crawler-google-places#output-example)

8. **Tips or Advanced options section**
    - Share any tips on how to best run the actor, such as how to limit compute unit usage, get more accurate results, or improve speed.

If you want some general tips on how to make GitHub readmes that stand out, check out these guides. Not everything in there will be suitable for an Apify actor readme, so you should cherry-pick what you like and use your imagination.

[Build a Stunning README For Your GitHub Profile](https://towardsdatascience.com/build-a-stunning-readme-for-your-github-profile-9b80434fe5d7)

[How to Create a Beautiful README for Your GitHub Profile](https://yushi95.medium.com/how-to-create-a-beautiful-readme-for-your-github-profile-36957caa711c)

## [](#next) Next up

If you followed all the tips described above, your actor README should be good to go! In the [next lesson]({{@link apify_platform/getting_the_most_of_actors_on_apify_store/seo_and_promotion.md}})! we will dive deeper into how you can improve your README's SEO and promote your actor to ensure it reaches as many potential users as possible!
