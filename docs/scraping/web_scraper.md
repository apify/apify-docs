---
title: Web Scraper
---

# [](#scraping-with-web-scraper)Scraping with Web Scraper

This scraping tutorial will go into the nitty gritty details of extracting data from `https://apify.com/store` using the `apify/web-scraper`. If you arrived here from the [Getting started with Apify scrapers](https://apify.com/docs/scraping/tutorial/introduction), tutorial, great! You are ready to continue where we left off. If you haven't seen the Getting started yet, check it out, it will help you learn about Apify and scraping in general and set you up for this tutorial, because this one builds on topics and code examples discussed there.

## [](#getting-to-know-our-tools)Getting to know our tools

In the [Getting started with Apify scrapers](https://apify.com/docs/scraping/tutorial/introduction) tutorial, we've confirmed that the scraper works as expected, so now it's time to add more data to the results.

To do that, we'll be using the [`jQuery` library](https://jquery.com/), because it provides some nice tools and a lot of people familiar with JavaScript already know how to use it.

> If you're not familiar with `jQuery`, you can find good information [in the docs](https://api.jquery.com/) and if you just don't want to use it, that's okay. Everything can be done using pure JavaScript too.

To add `jQuery`, all we need to do is turn on **Inject jQuery** under INPUT **Options**. This will add a `context.jQuery` function that you can use.

Now that's out of the way, let's open one of the actor detail pages in the Store, for example the [`apify/web-scraper`](https://apify.com/apify/web-scraper) page and use our DevTools-Fu to scrape some data.

## [](#quick-recap)Quick recap

Before we start, let's do a quick recap of the data we chose to scrape:

1.  **URL** - The URL that goes directly to the actor's detail page.
2.  **Unique identifier** - Such as `apify/web-scraper`.
3.  **Title** - The title visible in the actor's detail page.
4.  **Description** - The actor's description.
5.  **Last run date**- When the actor was last run.
6.  **Number of runs** - How many times the actor was run.

![data to scrape](https://apifyusercontent.com/7274765d35b9a7c781e5bcc705a3dbdcf3c308ec/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f7363726170696e672d70726163746963652e6a7067 "Overview of data to be scraped.")

We've already scraped number 1 and 2 in the [Getting started with Apify scrapers](https://apify.com/docs/scraping/tutorial/introduction) tutorial, so let's get to the next one on the list: Title

### [](#title)Title

![actor title](https://apifyusercontent.com/5274e02a1c45ed96a7d8c0147ac6e3d99f883ed0/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f7469746c652e6a7067 "Finding actor title in DevTools.")

By using the element selector tool, we find out that the title is there under an `<h1>` tag, as titles should be. Maybe surprisingly, we find that there are actually two `<h1>` tags on the detail page. This should get us thinking. Is there any parent element that includes our `<h1>` tag, but not the other ones? Yes, there is! There is a `<header>` element that we can use to select only the heading we're interested in.

> Remember that you can press CTRL+F (CMD+F) in the Elements tab of DevTools to open the search bar where you can quickly search for elements using their selectors. And always make sure to use the DevTools to verify your scraping process and assumptions. It's faster than changing the crawler code all the time.

To get the title we just need to find it using a `header h1` selector, which selects all `<h1>` elements that have a `<header>` ancestor. And as we already know, there's only one.

    // Using jQuery.
    return {
        title: $('header h1').text(),
    };

### [](#description)Description

Getting the actor's description is a little more involved, but still pretty straightforward. We can't just simply search for a `<p>` tag, because there's a lot of them in the page. We need to narrow our search down a little. Using the DevTools we find that the actor description is nested within the `<header>` element too, same as the title. Sadly, we're still left with two `<p>` tags. To finally select only the description, we choose the `<p>` tag that has a `class` that starts with `Text__Paragraph`.

![actor description selector](https://apifyusercontent.com/28dee1e51c6ac3e8ec67f0eb953b4a71c775f217/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f6465736372697074696f6e2e6a7067 "Finding actor description in DevTools.")

    return {
        title: $('header h1').text(),
        description: $('header p[class^=Text__Paragraph]').text(),
    };

### [](#last-run-date)Last run date

The DevTools tell us that the `lastRunDate` can be found in the second of the two `<time>` elements in the page.

![actor last run date selector](https://apifyusercontent.com/6fe3f03692a7dc3acc35be74b3b8baacb98d7ac3/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f6c6173742d72756e2d646174652e6a7067 "Finding actor last run date in DevTools.")

    return {
        title: $('header h1').text(),
        description: $('header p[class^=Text__Paragraph]').text(),
        lastRunDate: new Date(
            Number(
                $('time')
                    .eq(1)
                    .attr('datetime'),
            ),
        ),
    };

It might look a little too complex at first glance, but let me walk you through it. We find all the `<time>` elements. There are two, so we grab the second one using the `.eq(1)` call (it's zero indexed) and then we read its `datetime` attribute, because that's where a unix timestamp is stored as a `string`.

But we would much rather see a readable date in our results, not a unix timestamp, so we need to convert it. Unfortunately the `new Date()` constructor will not accept a `string`, so we cast the `string` to a `number` using the `Number()` function before actually calling `new Date()`. Phew!

### [](#run-count)Run count

And so we're finishing up with the `runCount`. There's no specific element like `<time>`, so we need to create a complex selector and then do a transformation on the result.

    return {
        title: $('header h1').text(),
        description: $('header p[class^=Text__Paragraph]').text(),
        lastRunDate: new Date(
            Number(
                $('time')
                    .eq(1)
                    .attr('datetime'),
            ),
        ),
        runCount: Number(
            $('ul.stats li:nth-of-type(3)')
                .text()
                .match(/\d+/)[0],
        ),
    };

The `ul.stats > li:nth-of-type(3)` looks complicated, but it only reads that we're looking for a `<ul class="stats ...">` element and within that element we're looking for the third `<li>` element. We grab its text, but we're only interested in the number of runs. So we parse the number out using a regular expression, but its type is still a `string`, so we finally convert the result to a `number` by wrapping it with a `Number()` call.

### [](#wrapping-it-up)Wrapping it up

And there we have it! All the data we needed in a single object. For the sake of completeness, let's add the properties we parsed from the URL earlier and we're good to go.

    const { url } = request;

    // ...

    const uniqueIdentifier = url.split('/').slice(-2).join('/');

    return {
        url,
        uniqueIdentifier,
        title: $('header h1').text(),
        description: $('header p[class^=Text__Paragraph]').text(),
        lastRunDate: new Date(
            Number(
                $('time')
                    .eq(1)
                    .attr('datetime'),
            ),
        ),
        runCount: Number(
            $('ul.stats li:nth-of-type(3)')
                .text()
                .match(/\d+/)[0],
        ),
    };

All we need to do now is add this to our `pageFunction`:

    async function pageFunction(context) {
        const { request, log, skipLinks, jQuery: $ } = context; // use jQuery as $

        if (request.userData.label === 'START') {
            log.info('Store opened!');
            // Do some stuff later.
        }
        if (request.userData.label === 'DETAIL') {
            const { url } = request;
            log.info(`Scraping ${url}`);
            await skipLinks();

            // Do some scraping.
            const uniqueIdentifier = url.split('/').slice(-2).join('/');

            return {
                url,
                uniqueIdentifier,
                title: $('header h1').text(),
                description: $('header p[class^=Text__Paragraph]').text(),
                lastRunDate: new Date(
                    Number(
                        $('time')
                            .eq(1)
                            .attr('datetime'),
                    ),
                ),
                runCount: Number(
                    $('ul.stats li:nth-of-type(3)')
                        .text()
                        .match(/\d+/)[0],
                ),
            };
        }
    }

### [](#test-run-3)Test run 3

As always, try hitting that **Save & Run** button and visit the Dataset preview of clean items. You should see a nice table of all the attributes correctly scraped. You nailed it!

## [](#pagination)Pagination

Pagination is just a term that represents "going to the next page of results". You may have noticed that we did not actually scrape all the actors, just the first page of results. That's because to load the rest of the actors, one needs to click the orange **Show more** button at the very bottom of the list. This is pagination.

> This is a typical JavaScript pagination, sometimes called infinite scroll. Other pages may just use links that take you to the next page. If you encounter those, just make a Pseudo URL for those links and they will be automatically enqueued to the request queue. Use a label to let the scraper know what kind of URL it's processing.

### [](#waiting-for-dynamic-content)Waiting for dynamic content

Before we talk about paginating, we need to have a quick look at dynamic content. Since the Apify Store is a JavaScript application (as many, if not most modern websites are), the button might not exist in the page when the scraper runs the `pageFunction`.

How is this possible? Because the scraper only waits with executing the `pageFunction` for the page to load its HTML. If there's additional JavaScript that modifies the DOM afterwards, the `pageFunction` may execute before this JavaScript had the time to run.

At first, you may think that the scraper is broken, but it just cannot wait for all the JavaScript in the page to finish executing. For a lot of pages, there's always some JavaScript executing or some network requests being made. It would never stop waiting. It is therefore up to you, the programmer, to wait for the elements you need. Fortunately, we have an easy solution.

#### [](#the--code-context-waitfor----code--function)The `context.waitFor()` function

`waitFor()` is a function that's available on the `context` object passed to the `pageFunction` and helps you with, well, waiting for stuff. It accepts either a number of milliseconds to wait, a selector to await in the page, or a function to execute. It will stop waiting once the time elapses, the selector appears or the provided function returns `true`.

    await waitFor(2000); // Waits for 2 seconds.
    await waitFor('#my-id'); // Waits until an element with id "my-id" appears in the page.
    await waitFor(() => !!window.myObject); // Waits until a "myObject" variable appears on the window object.

The selector may never be found and the function might never return `true`, so the `waitFor()` function also has a timeout. The default is `20` seconds. You can override it by providing an options object as the second parameter, with a `timeoutMillis` property.

    await waitFor('.bad-class', { timeoutMillis: 5000 });

With those tools, you should be able to handle any dynamic content the website throws at you.

### [](#how-to-paginate)How to paginate

With the theory out of the way, this should be pretty easy. The algorithm is a loop:

1.  Wait for the **Show more** button.
2.  Click it.
3.  Is there another **Show more** button?
    *   Yes? Repeat the above. (loop)
    *   No? We're done. We have all the actors.

#### [](#waiting-for-the-button)Waiting for the button

Before we can wait for the button, we need to know its unique selector. A quick look in the DevTools tells us that the button's class is some weird randomly generated string, but fortunately, there's an enclosing `<div>` with a class of `show-more`. Great! Our unique selector:

    div.show-more > button

> Don't forget to confirm our assumption in the DevTools finder tool (CTRL/CMD + F).

![waiting for the button](https://apifyusercontent.com/fbf97b35b4cb63cb5438c84dfc255a3b765ed176/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f77616974696e672d666f722d7468652d627574746f6e2e6a7067 "Finding show more button in DevTools.")

Now that we know what to wait for, we just plug it into the `waitFor()` function.

    await waitFor('div.show-more > button');

#### [](#clicking-the-button)Clicking the button

We have a unique selector for the button and we know that it's already rendered in the page. Clicking it is a piece of cake. We'll use `jQuery` again, but feel free to use plain JavaScript, it works the same.

    $('div.show-more > button').click()

This will show the next page of actors.

#### [](#repeating-the-process)Repeating the process

We've shown two function calls, but how do we make this work together in the `pageFunction`?

    async function pageFunction(context) {

    // ...

    let timeoutMillis; // undefined
    const buttonSelector = 'div.show-more > button';
    while (true) {
        log.info('Waiting for the "Show more" button.');
        try {
            await waitFor(buttonSelector, { timeoutMillis }); // Default timeout first time.
            timeoutMillis = 2000; // 2 sec timeout after the first.
        } catch (err) {
            // Ignore the timeout error.
            log.info('Could not find the "Show more button", we\'ve reached the end.');
            break;
        }
        log.info('Clicking the "Show more" button.');
        $(buttonSelector).click();   
    }

    // ...

    }

We want to run this until the `waitFor()` function throws, so that's why we use a `while(true)` loop. We're also not interested in the error, because we're expecting it, so we just ignore it and print a log message instead.

You might be wondering what's up with the `timeoutMillis`. Well, for the first page load, we want to wait longer, so that all the page's JavaScript has had a chance to execute, but for the other iterations, the JavaScript is already loaded and we're just waiting for the page to re-render so waiting for `2` seconds is enough to confirm that the button is not there. We don't want to stall the scraper for `20` seconds just to make sure that there's no button.

### [](#plugging-it-into-the--code-pagefunction--code-)Plugging it into the `pageFunction`

We've got the general algorithm ready, so all that's left is to integrate it into our earlier `pageFunction`. Remember the `// Do some stuff later` comment? Let's replace it. And don't forget to destructure the `waitFor()` function on the first line.

    async function pageFunction(context) {
        const { request, log, skipLinks, jQuery: $, waitFor } = context;
        if (request.userData.label === 'START') {
            log.info('Store opened!');
            let timeoutMillis; // undefined
            const buttonSelector = 'div.show-more > button';
            while (true) {
                log.info('Waiting for the "Show more" button.');
                try {
                    await waitFor(buttonSelector, { timeoutMillis }); // Default timeout first time.
                    timeoutMillis = 2000; // 2 sec timeout after the first.
                } catch (err) {
                    // Ignore the timeout error.
                    log.info('Could not find the "Show more button", we\'ve reached the end.');
                    break;
                }
                log.info('Clicking the "Show more" button.');
                $(buttonSelector).click();
            }

        }
        if (request.userData.label === 'DETAIL') {
            const { url } = request;
            log.info(`Scraping ${url}`);
            await skipLinks();

            // Do some scraping.
            const uniqueIdentifier = url.split('/').slice(-2).join('/');

            return {
                url,
                uniqueIdentifier,
                title: $('header h1').text(),
                description: $('header p[class^=Text__Paragraph]').text(),
                lastRunDate: new Date(
                    Number(
                        $('time')
                            .eq(1)
                            .attr('datetime'),
                    ),
                ),
                runCount: Number(
                    $('ul.stats li:nth-of-type(3)')
                        .text()
                        .match(/\d+/)[0],
                ),
            };
        }
    }

That's it! You can now remove the **Max pages per run** limit, **Save & Run** your task and watch the scraper paginate through all the actors and then scrape all of their data. After it succeeds, open the Dataset again and see the clean items. You should have a table of all the actor's details in front of you. If you do, great job! You've successfully scraped the Apify Store. And if not, no worries, just go through the code examples again, it's probably just some typo.

![final results](https://apifyusercontent.com/7efc451548c50f3495439b673b9298d9d8ec4f1b/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6170696679746563682f6163746f722d736372617065722f6d61737465722f646f63732f6275696c642f2e2e2f696d672f706c756767696e672d69742d696e746f2d7468652d7061676566756e6374696f6e2e6a7067 "Final results.")

## [](#downloading-the-scraped-data)Downloading the scraped data

You already know the DATASET tab of the run console since this is where we've always previewed our data. Notice that at the bottom, there is a table with multiple data formats, such as JSON, CSV or an Excel sheet, and to the right, there are options to download the scraping results in any of those formats. Go ahead and try it.

> If you prefer working with an API, you can find an example in the API tab of the run console: **Get dataset items**.

### [](#items-and-clean-items)Items and Clean items

There are two types of data available for download. Items and Clean items. The Items will always include a record for each `pageFunction` invocation, even if you did not return any results. The record also includes hidden fields such as `#debug`, where you can find various information that can help you with debugging your scrapers.

Clean items, on the other hand, include only the data you returned from the `pageFunction`. If you're only interested in the data you scraped, this format is what you will be using most of the time.

## [](#bonus--making-your-code-neater)Bonus: Making your code neater

You may have noticed that the `pageFunction` gets quite bulky. To make better sense of your code and have an easier time maintaining or extending your task, feel free to define other functions inside the `pageFunction` that encapsulate all the different logic. You can, for example, define a function for each of the different pages:

    async function pageFunction(context) {
        switch (context.request.userData.label) {
            case 'START': return handleStart(context);
            case 'DETAIL': return handleDetail(context);
        }

        async function handleStart({ log, waitFor }) {
            log.info('Store opened!');
            let timeoutMillis; // undefined
            const buttonSelector = 'div.show-more > button';
            while (true) {
                log.info('Waiting for the "Show more" button.');
                try {
                    await waitFor(buttonSelector, { timeoutMillis }); // Default timeout first time.
                    timeoutMillis = 2000; // 2 sec timeout after the first.
                } catch (err) {
                    // Ignore the timeout error.
                    log.info('Could not find the "Show more button", we\'ve reached the end.');
                    break;
                }
                log.info('Clicking the "Show more" button.');
                $(buttonSelector).click();
            }
        }

        async function handleDetail({ request, log, skipLinks, jQuery: $ }) {
            const { url } = request;
            log.info(`Scraping ${url}`);
            await skipLinks();

            // Do some scraping.
            const uniqueIdentifier = url.split('/').slice(-2).join('/');

            return {
                url,
                uniqueIdentifier,
                title: $('header h1').text(),
                description: $('header p[class^=Text__Paragraph]').text(),
                lastRunDate: new Date(
                    Number(
                        $('time')
                            .eq(1)
                            .attr('datetime'),
                    ),
                ),
                runCount: Number(
                    $('ul.stats li:nth-of-type(3)')
                        .text()
                        .match(/\d+/)[0],
                ),
            };
        }
    }

> If you're confused by the functions being declared below their executions, it's called hoisting and it's a feature of JavaScript. It helps you put what matters on top, if you so desire.

## [](#final-word)Final word

Thank you for reading this whole tutorial! Really! It's important to us that our users have the best information available to them so that they can use Apify easily and effectively. We're glad that you made it all the way here and congratulations on creating your first scraping task. We hope that you liked the tutorial and if there's anything you'd like to ask, [do it on Stack Overflow](https://stackoverflow.com/questions/tagged/apify)!

Finally, `apify/web-scraper` is just an actor and writing your own actors is a breeze with the [Apify SDK](https://sdk.apify.com). It's a bit more complex and involved than writing a simple `pageFunction`, but it allows you to fine-tune all the details of your scraper to your liking. Perhaps some other time, when you're in the mood for yet another tutorial, visit the [Getting Started](https://sdk.apify.com/docs/guides/gettingstarted). We think you'd like it!
