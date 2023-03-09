---
title: Scraping a list of URLs from a Google Sheets document
description: Learn how to crawl a list of URLs specified in a Google Sheets document using one of the Apify web scraping actors.
sidebar_position: 15
slug: /node-js/scraping-urls-list-from-google-sheets
---

You can export URLs from [Google Sheets](https://www.google.com/sheets/about/) such as [this one](https://docs.google.com/spreadsheets/d/1GA5sSQhQjB_REes8I5IKg31S-TuRcznWOPjcpNqtxmU) directly into an [actor](/platform/actors)'s Start URLs field.

1. Make sure the spreadsheet has one sheet and a simple structure to help the actor find the URLs.

2. Add the `/gviz/tq?tqx=out:csv` query parameter to the Google Sheet URL base, right after the long document identifier part. For example, <https://docs.google.com/spreadsheets/d/1GA5sSQhQjB_REes8I5IKg31S-TuRcznWOPjcpNqtxmU/gviz/tq?tqx=out:csv>. This automatically exports the spreadsheet to CSV format.

3. In the actor's input, click Link remote text file and paste the URL there:

![List of URLs](./images/gsheets-url.png)

IMPORTANT: Make sure anyone with the link can view the document. Otherwise, the actor will not be able to access it.

![Link sharing](./images/anyone-with-link.png)
