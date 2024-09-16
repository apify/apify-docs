---
title: Filter out blocked proxies using sessions
description: Handling blocked requests efficiently using sessions
sidebar_position: 16
slug: /node-js/filter-blocked-requests-using-sessions
---

_This article explains how the problem was solved before the [SessionPool](/sdk/js/docs/api/session-pool) class was added into [Apify SDK](/sdk/js/). We are keeping the article here as it might be interesting for people who want to see how to work with sessions on a lower level. For any practical usage of sessions, follow the documentation and examples of SessionPool._

### Overview of the problem

You want to crawl a website with a proxy pool, but most of your proxies are blocked. It's a very common situation. Proxies can be blocked for many reasons:

1. You overused them in your current Actor run and they got banned.

2. You overused them in some of your previous runs and they are still banned (and may never be unbanned).

3. Some other user with whom you share part of your proxy pool overused them when crawling the same website before you even touched it.

4. The proxies were actually banned before anyone used them to crawl the website because they share a subnetwork in some datacenter and all proxies of that subnet got banned.

5. The proxies actually got banned before anyone used them to crawl the website because they use anti-bot protection that bans proxies across websites (e.g. Cloudflare).

Nobody can make sure that a proxy will work infinitely. The only real solution to this problem is to use [residential proxies](/platform/proxy#residential-proxy), but they can sometimes be too costly.

However, usually, at least some of our proxies work. To crawl successfully, it is therefore imperative to handle blocked requests properly. You first need to discover that you are blocked, which usually means that either your request returned status greater or equal to 400 (it didn't return the proper response) or that the page displayed a captcha. To ensure that this bad request is retried, you usually throw an error and it gets automatically retried later (our [SDK](/sdk/js/) handles this for you). Check out [this article](https://docs.apify.com/academy/node-js/handle-blocked-requests-puppeteer) as inspiration for how to handle this situation with `PuppeteerCrawler` class.

### Solution

Now we are able to retry bad requests and eventually unless all of our proxies get banned, we should be able to successfully crawl what we want. The problem is that it takes too long and our log is full of errors. Fortunately, we can overcome this with [proxy sessions](/platform/proxy#datacenter-proxy--username-params) (look at the proxy and SDK documentation for how to use them in your Actors.)

First we define `sessions`  object at the top of our code (in global scope) to hold the state of our working sessions.

`let sessions;`

Then we need to define an interval that will ensure our sessions are periodically saved to the key-value store, so if the Actor restarts, we can load them.

```js
setInterval(async () => {
    await Apify.setValue('SESSIONS', sessions);
}, 30 * 1000);
```

And inside our main function, we load the sessions the same way we load an input. If they were not saved yet (the Actor was not restarted), we instantiate them as an empty object.

```js
Apify.main(async () => {
    sessions = (await Apify.getValue('SESSIONS')) || {};
    // ...the rest of your code
});
```

### Algorithm

You don't necessarily need to understand the solution below - it should be fine to copy/paste it to your Actor.

`sessions`  will be an object whose keys will be the names of the sessions and values will be objects with the name of the session (we choose a random number as a name here) and user agent (you can add any other useful properties that you want to match with each session.) This will be created automatically, for example:

```json
{
    "0.7870849452667994": {
        "name": "0.7870849452667994",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36"
        },
    "0.4787584713044999": {
        "name": "0.4787584713044999",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    }
    // ...
}
```

Now let's get to the algorithm that will define which sessions to pick for a request. It can be done in many ways and this is by no means the ideal way, so I encourage you to find a more intelligent algorithm and paste it into the comments of this article.

This function takes `sessions`  as an argument and returns a `session`  object which will either be a random object from `sessions`  or a new one with random user agent.

```js
const pickSession = (sessions, maxSessions = 100) => {

    // sessions is our sessions object, at the beginning instantiated as {}
    // maxSessions is a constant which should be the number of working proxies we aspire to have.
    // The lower the number, the faster you will use the working proxies
    // but the faster the new one will not be picked
    // 100 is reasonable default
    // Since sessions is an object, we prepare an array of the session names
    const sessionsKeys = Object.keys(sessions);

    console.log(`Currently we have ${sessionsKeys.length} working sessions`);

    // We define a random floating number from 0 to 1 that will serve
    // both as a chance to pick the session and its possible name
    const randomNumber = Math.random();

    // The chance to pick a session will be higher when we have more working sessions
    const chanceToPickSession = sessionsKeys.length / maxSessions;

    console.log(`Chance to pick a working session is ${Math.round(chanceToPickSession * 100)}%`);

    // If the chance is higher than the random number, we pick one from the working sessions
    const willPickSession = chanceToPickSession > randomNumber;

    if (willPickSession) {
        // We randomly pick one of the working sessions and return it
        const indexToPick = Math.floor(sessionsKeys.length * Math.random());

        const nameToPick = sessionsKeys[indexToPick];

        console.log(`We picked a working session: ${nameToPick} on index ${indexToPick}`);

        return sessions[nameToPick];
    }
    // We create a new session object, assign a random userAgent to it and return it

    console.log(`Creating new session: ${randomNumber}`);

    return {
        name: randomNumber.toString(),
        userAgent: Apify.utils.getRandomUserAgent(),
    };

};
```

### Puppeteer example

We then use this function whenever we want to get the session for our request. Here is an example of how we would use it for bare bones Puppeteer (for example as a part of `BasicCrawler` class).

```js
const session = pickSession(sessions);
const browser = await Apify.launchPuppeteer({
    useApifyProxy: true,
    apifyProxySession: session.name,
    userAgent: session.userAgent,
});
```

Then we only need to add the session if the request was successful or remove it if it was not. It doesn't matter if we add the same session twice or delete a non-existent session (because of how JavaScript objects work).

After success:
`sessions[session.name] = session;`

After failure (captcha, blocked request, etc.):
`delete sessions[session.name]`

### PuppeteerCrawler example

Now you might start to wonder, "I have already prepared an Actor using PuppeteerCrawler, can I make it work there?". The problem is that with PuppeteerCrawler we don't have everything nicely inside one function scope like when using pure Puppeteer or BasicCrawler. Fortunately, there is a little hack that enables passing the session name to where we need it.

First we define `lauchPuppeteerFunction` which tells the crawler how to create new browser instances and we pass the picked session there.

```js
const crawler = new Apify.PuppeteerCrawler({
    launchPuppeteerFunction: async () => {
        const session = pickSession(sessions);
        return Apify.launchPuppeteer({
            useApifyProxy: true,
            userAgent: `${session.userAgent} s=${session.name}`,
            apifyProxySession: session.name,
        });
    },
    // handlePageFunction etc.
});
```

We picked the session and added it to the browser as `apifyProxySession` but for userAgent, we didn't pass the User-Agent as it is but added the session name into it. That is the hack because we can retrieve the user agent from the Puppeteer browser itself.

Now we need to retrieve the session name back in the `gotoFunction`, pass it into userData and fix the hacked userAgent back to normal so it is not suspicious for the website.

```js
const gotoFunction = async ({ request, page }) => {
    const userAgentWithSession = await page.browser().userAgent();
    const match = userAgentWithSession.match(/(.+) s=(.+)/);
    const session = {
        name: match[2],
        userAgent: match[1],
    };
    request.userData.session = session;
    await page.setUserAgent(session.userAgent);
    return page.goto(request.url, { timeout: 60000 });
};
```

Now we have access to the session in the `handlePageFunction` and the rest of the logic is the same as in the first example. We extract the session from the userData, try/catch the whole code and on success we add the session and on error we delete it. Also it is useful to retire the browser completely (check [here](https://docs.apify.com/academy/node-js/handle-blocked-requests-puppeteer) for reference) since the other requests will probably have similar problem.

```js
const handlePageFunction = async ({ request, page, puppeteerPool }) => {
    const { session } = request.userData;
    console.log(`URL: ${request.url}, session: ${session.name}, userAgent: ${session.userAgent}`);

    try {
        // your main logic that is executed on each page
        sessions[session.name] = session;
    } catch (e) {
        delete sessions[session.name];
        await puppeteerPool.retire(page.browser());
        throw e;
    }
};
```

Things to consider

1. Since the good and bad proxies are getting filtered over time, this solution only makes sense for crawlers with at least hundreds of requests.

2. This solution will not help you if you don't have enough proxies for your job. It can even get your proxies banned faster (since the good ones will be used more often), so you should be cautious about the speed of your crawl.

3. If you are more concerned about the speed of your crawler and less about banning proxies, set the `maxSessions` parameter of `pickSession` function to a number relatively lower than your total number of proxies. If on the other hand, keeping your proxies alive is more important, set `maxSessions`  relatively higher so you will always pick new proxies.

4. Since sessions only last 24 hours, if you have bigger intervals between your crawler runs, they will start fresh each time.
