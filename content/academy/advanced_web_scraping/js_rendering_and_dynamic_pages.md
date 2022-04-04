---
title: JS Rendering and Dynamic Pages
description: Learn about dynamic pagees. What are they? How can we find out if a page is dynamic? How do we scrape dynamic content?
menuWeight: 3.3
paths:
    - advanced-web-scraping/js_rendering_and_dynamic_pages
---

# [](#rendering-and-dynamic-pages) JS Rendering and Dynamic Pages

In the [last lessons]({{@link web_scraping_for_beginners/crawling/pro_scraping.md}}) of the _Web Scraping for Beginners_ module, we learned about the Apify SDK, which is a powerful library for writing reliable and efficient scrapers. We recommend reading up on those last two lessons in order to install the `apify` package and familiarize yourself with it before moving forward with this lesson.

As you progress in your scraping journey, you'll quickly realize that different websites load their content and populate their pages with data in different ways. Some pages are rendered entirely on the server, some retrieve the data dynamically, and some use a combination of both those methods. In this lesson, we'll be discussing dynamic content, what it is, and how to scrape it.

## [](#about-page-loading) How page loading works

There are three main events that occur during the process of loading a page, all of which have a designated corresponding name:

1. `DOMContentLoaded` - The initial HTML document is loaded, which contains the HTML as it was rendered on the website's server. It also includes all of the JavaScript which will be run in the next step.
2. `load` - The page's JavaScript is executed.
3. `networkidle` - Network [XHR/Fetch requests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) are sent and loaded, and data from these requests is populated onto the page. Many websites load essential data this way. These requests might be sent upon certain page events as well (not just the first load), such as scrolling or clicking.

Now that we have a solid understanding of the different stages of page-loading, and the order they happen in, we can fully understand what a dynamic page is.

## [](#what-is-dynamic-content) So, what is dynamic content?

Dynamic content is any content that is rendered **after** the `DOMContentLoaded` event, which means any content loaded by JavaScript during the `load` event, or after any network XHR/Fetch requests have been made.

Sometimes, it can be quite obvious when content is dynamically being rendered. For example, take a look at this gif:

<!-- This image comes from this blog post https://blog.apify.com/what-is-a-dynamic-page/ -->
<!-- It is pretty large, so it doesn't make sense to upload it a second time here -->

![Image](https://blog.apify.com/content/images/2022/02/dynamicLoading-1--1--2.gif)

Here, it's very clear that new content is being generated. As we scroll down the Twitter feed, we can see the scroll bar jumping back up, signifying that more elements have been created using Javascript.

Other times, it's less obvious though. Content can appear to be static (non-dynamic) when it is not, or even sometimes the other way around. We'll see an example of that in the next sections.

# [](#quick-experiment) A quick experiment

From our adored and beloved [Fakestore](https://demo-webstore.apify.org/), we have been tasked to scrape each product's title, price, and image from the [new arrivals](https://demo-webstore.apify.org/search/new-arrivals) page. Easy enough! We did something very similar in the previous modules.

![New arrival products in Fakestore]({{@asset advanced_web_scraping/images/new-arrivals.webp}})

In your project from the previous lessons, or in a new project, create a file called `dynamic.js` and copy-paste the following boiler plate code into it:

```JavaScript
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/new-arrivals' });

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {

        // We'll put our logic in here later
    },
});

await crawler.run();
```

If you're in a brand new project, don't forget to initialize your project, then install the necessary dependencies:

```shell
# this command will initialize your project
# and install the "apify" and "cheerio" packages
npm init -y && npm i apify cheerio
```

Now, let's write some data collection code to collect each product's data. This should look familiar if you went through the [Data Collection]({{@link web_scraping_for_beginners/data_collection.md}}) lessons:

```JavaScript
import Apify from 'apify';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/new-arrivals' });

const BASE_URL = 'https://demo-webstore.apify.org';

const crawler = new Apify.CheerioCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
        const products = $('a[href*="/product/"]');

        const results = [...products].map((product) => {
            const elem = $(product);

            const title = elem.find('h3').text();
            const price = elem.find('div[class*="price"]').text();
            const image = elem.find('img[src]').attr('src');

            return {
                title,
                price,
                image: new URL(image, BASE_URL).href,
            };
        });

        console.log(results);
    },
});

await crawler.run();
```

> Here, we are using the [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to loop through all of the product elements and save them into an array we call `results` all at the same time.

After running it, you might say, "Great! It works!" **But wait...** What are those results being logged to console?

![Bad results in console]({{@asset advanced_web_scraping/images/bad-results.webp}})

Every single image seems to have the same exact "URL," but they are most definitely not the image URLs we are looking for. This is strange, because in the browser, we were getting URLs that looked like this:

```
https://demo-webstore.apify.org/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F81ywGFOb0eL._AC_UL1500_.jpg&w=3840&q=85
```

The reason this is happening is because CheerioCrawler makes static HTTP requests, so it only manages to capture the content from the `DOMContentLoaded` event. Any elements or attributes generated dynamically thereafter using JavaScript (and usually XHR/Fetch requests) are not part of the downloaded HTML, and therefore are not accessible through the `$` object.

So, what's the solution? We need to use something that is able to allow the page to follow through with the entire load process - a headless browser.

# [](#scraping-dynamic-content) Scraping dynamic content

Let's change a few lines of our code to switch the crawler type from CheerioCrawler to PuppeteerCrawler, which will run a headless browser, allowing the `load` and `networkidle` events to fire:

> Also, don't forget to run `npm i puppeteer` in order to install the `puppeteer` package!

```JavaScript
import Apify from 'apify';
// Add cheerio import
import cheerio from 'cheerio';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/new-arrivals' });

const BASE_URL = 'https://demo-webstore.apify.org';

// Switch CheerioCrawler to PuppeteerCrawler
const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
    // Replace "$" with "page"
    handlePageFunction: async ({ page, request }) => {
        // Create the $ object based on the page's content
        const $ = cheerio.load(await page.content());

        const products = $('a[href*="/product/"]');

        const results = [...products].map((product) => {
            const elem = $(product);

            const title = elem.find('h3').text();
            const price = elem.find('div[class*="price"]').text();
            const image = elem.find('img[src]').attr('src');

            return {
                title,
                price,
                image: new URL(image, BASE_URL).href,
            };
        });

        console.log(results);
    },
});

await crawler.run();
```

After running this one, we can see that our results look different from before. We're getting the image links!

![Not perfect results]({{@asset advanced_web_scraping/images/almost-there.webp}})

Well... Not quite. It seems that the only images which we got the full links to were the ones that were being displayed within the view of the browser. This means that the images are lazy-loaded. **Lazy-loading** is a common technique used across the web to improve performance. Lazy-loaded items allow the user to load content incrementally, as they perform some action. In most cases, including our current one, this action is scrolling.

So, we've gotta scroll down the page to load these images. Luckily, because we're using the Apify SDK, we don't have to write the logic that will achieve that, because a utility function specifically for Puppeteer called <a href="https://sdk.apify.com/docs/api/puppeteer#puppeteerinfinitescroll" target="_blank">`infiniteScroll`</a> already exists right in the library, and can be accessed through `Apify.utils.puppeteer`. Let's add it to our code now:

```JavaScript
import Apify from 'apify';
import cheerio from 'cheerio';

await Apify.utils.purgeLocalStorage();

const requestQueue = await Apify.openRequestQueue();
await requestQueue.addRequest({ url: 'https://demo-webstore.apify.org/search/new-arrivals' });

const BASE_URL = 'https://demo-webstore.apify.org';

const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
    handlePageFunction: async ({ page, request }) => {
        // Add the utility function
        await Apify.utils.puppeteer.infiniteScroll(page);

        const $ = cheerio.load(await page.content());

        const products = $('a[href*="/product/"]');

        const results = [...products].map((product) => {
            const elem = $(product);

            const title = elem.find('h3').text();
            const price = elem.find('div[class*="price"]').text();
            const image = elem.find('img[src]').attr('src');

            return {
                title,
                price,
                image: new URL(image, BASE_URL).href,
            };
        });

        // Push our results to the dataset
        await Apify.pushData(results);
    },
});

await crawler.run();
```

Let's run this and check our dataset results...

```JSON
{
  "title": "women's shoes",
  "price": "$40.00 USD",
  "image": "https://demo-webstore.apify.org/_next/image?url=https%3A%2F%2Fdummyjson.com%2Fimage%2Fi%2Fproducts%2F46%2F1.webp&w=3840&q=85"
}
```

Each product looks like this, and each image is a valid link that can be visited. These are the results we were after.

## [](#small-recap) Small Recap

We've learned about the important concept of **Dynamic Pages**, which affects not only how we write a web scraper, but also the tools we use to write it.

The loading process of a webpage can be split into three main events: `DOMContentLoaded`, `load`, and `networkidle`.

Making static HTTP requests only downloads the HTML content from the `DOMContentLoaded` event. We must use a browser to allow dynamic code to load, or find different means altogether of scraping the data (see [API Scraping]({{@link web_scraping_for_beginners/crawling/api_scraping.md}}))

## [](#next) Next up...

So far, this is the last lesson of the Advanced web scraping course, but stay tuned! We will keep adding more lessons as we go.