---
title: VII - Bypassing anti-scraping methods
description: description
menuWeight: 6.7
paths:
    - expert-scraping-with-apify/bypassing-anti-scraping
---

# [](#bypassing-anti-scraping-methods) Bypassing anti-scraping methods

Effectively bypassing anti-scraping software is one of the most crucial, but also one of the most difficult skills to master. The different types of [anti-scraping protections]({{@link anti_scraping.md}}) can vary a lot on the web. Some websites aren't even protected at all, some require only moderate IP rotation, and some cannot even be scraped without using advanced techniques and workarounds. Additionally, because the web is evolving, anti-scraping techniques are also evolving and becoming more advanced.

It is generally quite difficult to recognize the anti-scraping protections a page may have when first inspecting a it, so it is important to thoroughly investigate a site prior to writing any lines of code, as anti-scraping measures can significantly change your approach as well as complicate the development process of an actor. As your skills expand, you will be able to spot anti-scraping measures quicker, and better evaluate the complexity of a new project.

You might have already noticed that we've been using the **RESIDENTIAL** proxy group in the `proxyConfiguration` within our Amazon scraping actor. But what does that mean? This is a proxy group from [Apify Proxy](https://apify.com/proxy) which has been preventing us from being blocked by Amazon this entire time. We'll be learning more about proxies and Apify Proxy in this lesson.

## [](#learning) Learning 🧠

- Skim [this page](https://apify.com/proxy) for a general idea of Apify Proxy.
- Give the [proxy documentation](https://docs.apify.com/proxy#our-proxies) a solid readover (feel free to skip most of the examples).
- Read about our [proxy trial](https://help.apify.com/en/articles/2108625-free-trial-of-apify-proxy).
- Check out [this](https://help.apify.com/en/articles/1961361-several-tips-on-how-to-bypass-website-anti-scraping-protections) article about bypassing anti-scraping measures.
- Gain a solid understanding of the [SessionPool](https://sdk.apify.com/docs/api/session-pool).
- Look at a few actors on the [Apify store](https://apify.com/store). How are they utilizing proxies?

## [](#quiz) Knowledge check 📝

1. What are the different types of proxies that Apify proxy offers? What are the main differences between them?
2. Which proxy groups do users get with the proxy trial? How long does the trial last?
3. How can you prevent an error from occurring if one of the proxy groups that a user has is removed? What are the best practices for these scenarios?
4. Does it make sense to rotate proxies when you are logged into a website?
5. Construct a proxy URL that will select proxies **only from the US**.
6. What do you need to do to rotate a proxy (one proxy usually has one IP)? How does this differ for CheerioCrawler and PuppeteerCrawler?
7. Name a few different ways of how a website can prevent you from scraping it.

## Our task

This time, we're going to build a trivial proxy-session manager for our Amazon scraping actor. A session should be used a maximum of 5 times before being rotated; however, if a request fails, the IP should be rotated immediately.

Additionally, the proxies used by our scraper should now only be from the US.

[**Solution**]({{@link expert_scraping_with_apify/solutions/rotating_proxies.md}})

## [](#next) Next up

Up [next]({{@link expert_scraping_with_apify/saving_useful_stats.md}}), we'll be learning about how to save useful stats about our run, which becomes more and more useful as a project scales.
