---
title: How to save screenshots from puppeteer
description: Code example for how to save screenshots from puppeteer to Apify key-value store
menuWeight: 15.8
paths:
    - node-js/how-to-save-screenshots-puppeteer
---

A good way to debug your puppeteer crawler in Apify actors is to save a screenshot of a browser window to the Apify key-value store. You can do that using this function:

```JavaScript
/*_
 _ Store screen from puppeteer page to Apify key-value store
 * @param page - Instance of puppeteer Page class https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page
 * @param [key] - Function stores your screen in Apify key-value store under this key
 * @return {Promise<void>}
 */
const saveScreen = async (page, key = 'debug-screen') => {
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await Apify.setValue(key, screenshotBuffer, { contentType: 'image/png' });
};
```

This function takes the parameters page (an instance of a puppeteer page) and key (your screen is stored under this key function in the Apify key-value store).

Because this is so common use-case Apify SDK has a utility function called [saveSnapshot](https://sdk.apify.com/docs/api/puppeteer#puppeteersavesnapshot) that does exactly this and a little bit more:

- You can choose a quality of your screenshots (high-quality images take more size)

- You can also save HTML of the page

A simple example of usage function in an Apify actor:

```JavaScript
const Apify = require('apify');
const { saveSnapshot } = Apify.utils.puppeteer;

Apify.main(async () => {
    const input = await Apify.getValue('INPUT');

console.log('Launching Puppeteer...');
    const browser = await Apify.launchPuppeteer();

const page = await browser.newPage();
    await page.goto(input.url);

await saveSnapshot(page, { key: 'test-screen' });

console.log('Closing Puppeteer...');
    await browser.close();

console.log('Done.');
});
```

After you call the function, your screen appears in the KEY-VALUE STORE tab in the actor console. You can click on the row with your saved screen and it'll open it in a new window.

![Puppeteer Key-Value store]({{@asset node_js/images/kv-store-puppeteer.webp}})

If you have any questions, feel free to contact us in chat.

Happy coding!
