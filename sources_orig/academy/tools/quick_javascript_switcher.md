---
title: Quick JavaScript Switcher
description: Discover a super simple tool for disabling JavaScript on a certain page to determine how it should be scraped. Great for detecting SPAs.
menuWeight: 9.9
paths:
    - tools/quick-javascript-switcher
---

# Quick JavaScript Switcher

**Quick Javascript Switcher** is a very simple Chrome extension that allows you to switch on/off the JavaScript for the current page with one click. It can be added to your browser via the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions). After adding it to Chrome, you'll see its respective button next to any other Chrome extensions you might have installed.

If JavaScript is enabled - clicking the button will switch it off and reload the page. The next click will re-enable JavaScript and refresh the page. This extension is useful for checking whether a certain website will work without JavaScript (and thus could be parsed without using a browser with a plain HTTP request) or not.

![JavaScript toggled on (enabled)]({{@asset tools/images/js-on.webp}})

![JavaScript toggled off (disabled)]({{@asset tools/images/js-off.webp}})
