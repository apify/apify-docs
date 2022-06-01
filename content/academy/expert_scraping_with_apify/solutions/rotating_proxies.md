---
title: VII - Rotating proxies/sessions
description: Learn first hand how to rotate proxies and sessions in order to avoid the majority of the most common anti-scraping protections.
menuWeight: 7
paths:
    - expert-scraping-with-apify/solutions/rotating-proxies
---

# [](#rotating-proxy-sessions) Rotating proxies/sessions

If you take a look at our current code for the Amazon scraping actor, you might notice this snippet:

```JavaScript
const proxyConfiguration = await Apify.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
});
```

We didn't provide much explanation for this initially, as it was not directly relevant to the lesson at hand. When you [create a **ProxyConfiguration**]({{@link anti_scraping/proxies/using_proxies.md}}) and pass it to a crawler, the SDK will make the crawler automatically rotate through the proxies. This entire time, we've been using the **RESIDENTIAL** proxy group to avoid being blocked by Amazon.

> Go ahead and try commenting out the proxy configuration code then running the scraper. What happens?

In order to rotate sessions, we must utilize the [**SessionPool**](https://sdk.apify.com/docs/guides/session-management), which we've actually also already been using by setting the **useSessionPool** option in our crawler's configuration to **true**. The SessionPool advances the concept of proxy rotation by tying proxies to user-like sessions and rotating those instead. In addition to a proxy, each user-like session has cookies attached to it (and potentially a browser-fingerprint as well).

## [](#configuring-session-pool) Configuring SessionPool

Let's go ahead and add a **sessionPoolOptions** key to our crawler's configuration so that we can modify the default settings:

```JavaScript
const crawler = new Apify.CheerioCrawler({
    requestList,
    requestQueue,
    proxyConfiguration,
    useSessionPool: true,
    // This is where our session pool
    // configuration lives
    sessionPoolOptions: {
        // We can add options for each
        // session created by the session
        // pool here
        sessionOptions: {

        },
    },
    maxConcurrency: 50,
    // ...
});
```

Now, we'll use the **maxUsageCount** key to force each session to be thrown away after 5 uses, and **maxErrorScore** to trash a session once it receives an error. Then, we'll use **persistStateKey** back in **sessionPoolOptions** to persist the session pool's state, therefore handling migrations:

```JavaScript
const crawler = new Apify.CheerioCrawler({
    requestList,
    requestQueue,
    proxyConfiguration,
    useSessionPool: true,
    sessionPoolOptions: {
        persistStateKey: 'AMAZON-SESSIONS',
        sessionOptions: {
            maxUsageCount: 5,
            maxErrorScore: 1,
        },
    },
    maxConcurrency: 50,
    // ...
});
```

And that's it! We've successfully configured the session pool to match the task's requirements.

## [](#limiting-proxy-location) Limiting proxy location

The final requirement was to only use proxies from the US. Back in our **ProxyConfiguration**, we just need to add the **countryCode** key and set it to **US**:

```JavaScript
const proxyConfiguration = await Apify.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
    countryCode: 'US',
});
```

## [](#quiz-answers) Quiz answers

**Q: What are the different types of proxies that Apify proxy offers? What are the main differences between them?**

**A:** Datacenter, residential, and Google SERP proxies with sub-groups. Datacenter proxies are fast and cheap, but have a higher chance of being blocked on certain sites in comparison to residential proxies, which are IP addresses located in homes and offices around the world. Google SERP proxies are specifically for Google.

**Q: Which proxy groups do users get with the proxy trial? How long does the trial last?**

**A:** Users can get a 30 day trial to Apify Proxy and will get access to the **GOOGLE_SERP** and **RESIDENTIAL** groups.

**Q: How can you prevent an error from occurring if one of the proxy groups that a user has is removed? What are the best practices for these scenarios?**

**A:** By making the proxy for the scraper to use be configurable by the user through the actor's input. That way, they can easily switch proxies if the actor stop working due to proxy-related issues.

**Q: Does it make sense to rotate proxies when you are logged into a website?**

**A:** No, because most websites tie an IP address to a session. If you start making requests with cookies used with a different IP address, the website might see it as unusual activity and either block the scraper or automatically log out.

**Q: Construct a proxy URL that will select proxies only from the US.**

**A:** `http://country-US:<proxy_password>@proxy.apify.com:8000`

**Q: What do you need to do to rotate a proxy (one proxy usually has one IP)? How does this differ for CheerioCrawler and PuppeteerCrawler?**

**A:** Simply making a new request with the proxy endpoint above will automatically rotate it. Sessions can also be used to automatically do this. While proxy rotation is fairly straightforward for Cheerio, it's more complex in Puppeteer, as you have to retire the browser each time a new proxy is rotated in.

**Q: Name a few different ways of how a website can prevent you from scraping it.**

**A:** IP detection and rate-limiting, browser/fingerprint detection, user behavior tracking, etc.

## [](#wrap-up) Wrap up

In this solution, you learned one of the most important concepts in web-scraping - proxy/session rotation. With your newfound knowledge of the SessionPool, you'll be (practically) unstoppable!
