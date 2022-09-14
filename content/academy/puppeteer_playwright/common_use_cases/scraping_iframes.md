---
title: Scraping iFrames
description: Learn how to scrape information from iFrames using Puppeteer or Playwright.
menuWeight: 4
paths:
    - puppeteer-playwright/common-use-cases/scraping-iframes
---

# Scraping iFrames

Getting information from inside iFrames is a known pain, especially for new developers. After spending some time on Stack Overflow, you usually find answers like jQuery's `contents()` method or native contentDocument property, which can guide you to the insides of an iframe. But still, getting the right identifiers and holding that new context is a little annoying. Fortunately, you can make everything simpler and more straightforward by scraping iFrames with Puppeteer.

## Finding the right `<iframe>`

If you are using basic methods of page objects like `page.evaluate()`, you are actually already working with frames. Behind the scenes, Puppeteer will call `page.mainFrame().evaluate()`, so most of the methods you are using with page object can be used the same way with frame object. To access frames, you need to loop over the main frame's child frames and identify the one you want to use.

As a simple demonstration, we'll scrape the Twitter widget iFrame from [IMDB](https://www.imdb.com/).

```JavaScript
const browser = await puppeteer.launch() ;

const page = await browser.newPage();

await page.goto('https://www.imdb.com');
await page.waitFor(5000); // we need to wait for Twitter widget to load

let twitterFrame; // this will be populated later by our identified frame

for (const frame of page.mainFrame().childFrames()) {
    // Here you can use few identifying methods like url(),name(),title()
    if (frame.url().includes('twitter')){
        console.log('we found the Twitter iframe')
        twitterFrame = frame 
        // we assign this frame to myFrame to use it later
    }
}

await browser.close();
```

If it is hard to identify the iframe you want to access, don't worry. You can already use any Puppeteer method on the frame object to help you identify it, scrape it or manipulate it. You can also go through any nested frames.

```JavaScript
let twitterFrame;

for (const frame of page.mainFrame().childFrames()) {
    if (frame.url().includes('twitter')){
        for(const nestedFrame of frame.childFrames()){
             const tweetList = await nestedFrame.$('.timeline-TweetList')
             if(tweetList){
                 console.log('We found the frame with tweet list')
                 twitterFrame = nestedFrame
             }
        }
    }
}
```

Here we used some more advanced techniques to find a nested `<iframe>`. Now when we have it assigned to our twitterFrame object, the hard work is over and we can start working with it (almost) like with a regular page object.

```JavaScript
const textFeed = await twitterFrame.$$eval('.timeline-Tweet-text', pElements => pElements.map((elem) => elem.textContent));

for (const text of textFeed){
    console.log(text)
    console.log('**********')
}
```

With a little more effort, we could also follow different links from the feed or even play a video, but that is not within the scope of this article. For all references about page and frame objects (and Puppeteer generally), you should study [the documentation](https://pub.dev/documentation/puppeteer/latest/puppeteer/Frame-class.html). New versions are released quite often, so checking the docs regularly can help you to stay on top of web scraping and automation.
