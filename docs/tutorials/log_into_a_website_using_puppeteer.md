---
title: Log into a website using Puppeteer
description: Learn how to complete a website's authentication process using headless Chrome and Puppeteer. Automate the filling in of log in details and passwords.
menuWeight: 3.5
paths:
    - tutorials/log-into-a-website-using-puppeteer
---

# Log into a website using Puppeteer

In this article, we demonstrate how you can easily scrape data from a page behind a login using an Apify [actor]({{@link actors.md}}) with [Puppeteer](https://pptr.dev/). For this example, we will use [https://facebook.com](https://www.facebook.com/).

## [](#find-the-login-form) Find the login form

First, let's find the **login form** and the **submit** button on the Facebook login page using Chrome's DevTools. Right-click on any of the elements in the form and choose **Inspect**.

![Inspect Facebook login with DevTools]({{@asset tutorials/images/facebook-login.webp}})

We can see an HTML **input** element with the IDs `email` for email and `pass` for the password. The form submission button's ID is not very helpful, however we can see it is a **button** element with the name `login` and type `submit`. We will use its ID, which is `u_0_b`.

## [](#code-the-actor-to-fill-in-details) Code the actor to fill in details

Our actor will use the Puppeteer API to fill in the **username** and **password** and click the **submit** button.

```javascript
const Apify = require('apify');
const { log } = Apify.utils;

Apify.main(async () => {
    // Get the username and password inputs
    const input = await Apify.getValue('INPUT');

    const browser = await Apify.launchPuppeteer();
    const page = await browser.newPage();
    await page.goto('https://facebook.com');

    // Login
    await page.type('#email', input.username);
    await page.type('#pass', input.password);
    await page.click('#u_0_b');
    await page.waitForNavigation();

    // Get cookies
    const cookies = await page.cookies();

    // Use cookies in another tab or browser
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    // Open the page as a logged-in user
    await page2.goto('https://facebook.com');

    await browser.close();

    log.info('Done.');
});
```

Now, you can run the actor and pass the login credentials as an [input JSON object](https://sdk.apify.com/docs/examples/accept-user-input#docsNav).

```json
{
    "username": "marge@example.com",
    "password": "my secret password"
}
```

## [](#save-and-reuse-cookies) Save and reuse cookies

For most pages, you need to save cookies and reuse then in following runs. You can avoid logging in for each run with the code below.

The example below uses a [named key-value store]({{@link storage.md#named-and-unnamed-storages}}) to save cookies for upcoming runs.

```javascript
const Apify = require('apify');
const { log } = Apify.utils;

const loggedCheck = async (page) => {
    try {
        await page.waitForSelector('#bluebarRoot', { timeout: 10000 });
        return true;
    } catch(err) {
        return false;
    }
};

Apify.main(async () => {
    // Get the username and password inputs
    const input = await Apify.getValue('INPUT');

    const fcbCacheStore = await Apify.openKeyValueStore('fcb-cache');
    const cookiesStoreKey = input.username.replace('@', '(at)');

    const browser = await Apify.launchPuppeteer();
    const page = await browser.newPage();

    let isLogged = false;
    let userCookies = await fcbCacheStore.getValue(cookiesStoreKey);
    if (userCookies) {
        log.info('Trying to use cached cookies...')
        await page.setCookie(...userCookies);
        await page.goto('https://facebook.com');
        isLogged = await loggedCheck(page);
    }

    if (!isLogged) {
        log.info(`Cookies from the cache didn't work. Try to log in.`);
        await page.goto('https://facebook.com');
        await page.type('#email', input.username);
        await page.type('#pass', input.password);
        await page.click('#u_0_b');
        await page.waitForNavigation();
        isLogged = await loggedCheck(page);
    }

    if (!isLogged) {
        throw new Error('Incorrect username or password.')
    }

    // Get cookies and refresh them in store cache
    log.info(`Saving new cookies to cache...`);
    const cookies = await page.cookies();
    await fcbCacheStore.setValue(cookiesStoreKey, cookies);

    // Use cookies in another tab or browser
    const page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    // Opens thepage as a logged-in user
    await page2.goto('https://facebook.com');

    await browser.close();

    log.info('Done.');
});
```
