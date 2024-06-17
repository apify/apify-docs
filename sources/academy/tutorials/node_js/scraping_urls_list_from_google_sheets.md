---
title: Scraping a list of URLs from a Google Sheets document
description: Learn how to crawl a list of URLs specified in a Google Sheets document using one of the Apify web scraping Actors.
sidebar_position: 15
slug: /node-js/scraping-urls-list-from-google-sheets
---

You can export URLs from [Google Sheets](https://www.google.com/sheets/about/) such as [this one](https://docs.google.com/spreadsheets/d/1-2mUcRAiBbCTVA5KcpFdEYWflLMLp9DDU3iJutvES4w) directly into an [Actor](/platform/actors)'s Start URLs field.

1. Make sure the spreadsheet has one sheet and a simple structure to help the Actor find the URLs.

2. Add the `/gviz/tq?tqx=out:csv` query parameter to the Google Sheet URL base, right after the long document identifier part. For example, <https://docs.google.com/spreadsheets/d/1-2mUcRAiBbCTVA5KcpFdEYWflLMLp9DDU3iJutvES4w/gviz/tq?tqx=out:csv>. This automatically exports the spreadsheet to CSV format.

3. In the Actor's input, click Link remote text file and paste the URL there:

![List of URLs](./images/gsheets-url.png)

IMPORTANT: Make sure anyone with the link can view the document. Otherwise, the Actor will not be able to access it.

![Link sharing](./images/anyone-with-link.png)
