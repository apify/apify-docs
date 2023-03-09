---
title: Best practices
description: Understand the standards and best practices that we here at Apify abide by to write readable, scalable, and maintainable code. 
sidebar_position: 1.5
slug: /web-scraping-for-beginners/best-practices
---

# Best practices when writing scrapers {#best-practices}

**Understand the standards and best practices that we here at Apify abide by to write readable, scalable, and maintainable code.**

---

Every developer has their own style, which evolves as they grow and learn. While one dev might prefer a more  [functional](https://en.wikipedia.org/wiki/Functional_programming) style, another might find an [imperative](https://en.wikipedia.org/wiki/Imperative_programming) approach to be more intuitive. We at Apify understand this, and have written this best practices lesson with that in mind.

The goal of this lesson is not to force you into a specific paradigm or to make you think that you're doing things wrong, but instead to provide you some insight into the standards and best practices that we at Apify follow to ensure readable, maintainable, scalable code.

## Code style {#code-style}

There are some general things we recommend when it comes to your code style when writing scrapers.

### Clean code {#clean-code}

Praise [clean code](https://blog.risingstack.com/javascript-clean-coding-best-practices-node-js-at-scale/)! Use proper variable and function names that are descriptive of what they are, and split your code into smaller [pure](https://en.wikipedia.org/wiki/Pure_function) functions.

### Constant variables {#constants}

Define any [constant variables](https://softwareengineering.stackexchange.com/questions/250619/best-practices-reasons-for-string-constants-in-javascript) that globally apply to the scraper in a single file named **constants.js**, from where they will all be imported. Constant variable names should be in `UPPERCASE_WITH_UNDERSCORES` style.

> If you have a whole lot of constant variables, they can be in a folder named **constants** organized into different files.

### Use modern ES6 JavaScript {#use-es6}

If you're writing your scraper in JavaScript, use [ES6](https://www.w3schools.com/js/js_es6.asp) features and ditch the old ones which they replace. This means using `const` and `let` instead of `var`, `includes` instead of `indexOf`, etc.

> To learn more about some of the most popular (and awesome) ES6+ features, check out [this](https://medium.com/@matthiasvstephens/why-is-es6-so-awesome-88bff6857849) article.

### No magic numbers {#no-magic-numbers}

Avoid using [magic numbers](https://en.wikipedia.org/wiki/Magic_number_(programming)) as much as possible. Either declare them as a **constant** variable in your **constants.js** file, or if they are only used once, add a comment explaining what the number is.

Don't write code like this:

```js
const x = (y) => (y - 32) * (5 / 9);
```

That is quite confusing due to the nondescriptive naming and the magic numbers. Do this instead:

```js
// Converts a fahrenheit value to celsius
const fahrenheitToCelsius = (celsius) => (celsius - 32) * (5 / 9);
```

### Use comments! {#use-comments}

Don't be shy to add comments to your code! Even when using descriptive function and variable naming, it might still be a good idea to add a comment in places where you had to make a tough decision or chose an unusual choice.

> If you're a true pro, use [JSDoc](https://jsdoc.app/) to comment and document your code.

## Logging {#logging}

Logging helps you understand exact what your scraper is doing. Generally, having more logs is better than having less. Especially make sure to log your `catch` blocks - no error should pass unseen unless there is a good reason.

For scrapers that will run longer than usual, keep track of some useful stats (such as **itemsScraped** or **errorsHit**) and log them to the console on an interval.

The meaning of your log messages should make sense to an outsider who is not familiar with the inner workings of your scraper. Avoid log lines with just numbers or just URLs - always identify what the number/string means.

Here is an example of an "incorrect" log message:

```text
300  https://example.com/1234  1234
```

And here is  that log message translated into something that makes much more sense to the end user:

```text
Index 1234 --- https://example.com/1234 --- took 300 ms
```

## Input {#input}

There are two main best practices when it comes to accepting input into a scraper.

### Set limits {#set-limits}

When allowing your users to pass input properties which could break the scraper (such as **timeout** set to **0**), be sure to disallow ridiculous values. Set a maximum/minimum number allowed, maximum array input length, etc.

### Validate {#validate}

Validate the input provided by the user! This should be the very first thing your scraper does. If the fields in the input are missing or in an incorrect type/format, either parse the value and correct it programmatically or throw an informative error telling the user how to fix the error.

> On the Apify platform, you can use the [input schema](../../platform/deploying_your_code/input_schema.md) to both easily validate inputs and generate a clean UI for those using your scraper.

## Error handling {#error-handling}

Errors are bound to occur in scrapers. Perhaps it got blocked, or perhaps the data scraped was corrupted in some way.

Whatever the reason, a scraper shouldn't completely crash when an error occurs. Use `try...catch` blocks to catch errors and log useful messages. The log messages should indicate where the error happened, and what type of error happened.

Bad error log message:

```text
Cannot read property “0” from undefined
```

Good error log message:

```text
Could not parse an address, skipping the page. Url: https://www.example-website.com/people/1234
```

This doesn't mean that you should absolutely litter your code with `try...catch` blocks, but it does mean that they should be placed in error-prone areas (such as API calls or testing a string with a specific regular expression).

> If the error that has occurred renders that run of the scraper completely useless, exit the process immediately.

Logging is the minimum you should be doing though. For example, if you have an entire object of scraped data and just the **price** field fails to be parsed, you might not want to throw away the rest of that data. Rather, it could still be pushed to the output and a log message like this could appear:

```text
We could not parse the price of product: Men's Trainers Orange, pushing anyways.
```

This really depends on your use case though. If you want 100% clean data, you might not want to push incomplete objects and just retry (ideally) or log an error message instead.

## Recap {#recap}

Wow, that's a whole lot of things to abide by! How will you remember all of them? Well, to simplify everything, just try to follow these three points:

1. Describe your code as you write it with good naming, constants, comments. It **should read like a book**.
2. Add log messages at points throughout your code so that when it's running, you (and everyone else) know what's going on.
3. Handle errors appropriately. Log the error and either retry, or continue on. Only throw if the error will be caught or if the error is absolutely detrimental to the scraper's run.
