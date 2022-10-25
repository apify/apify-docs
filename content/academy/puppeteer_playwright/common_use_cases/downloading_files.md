---
title: Downloading files
description: Learn how to automatically download and save files to the disk using two of the most popular web automation libraries, Puppeteer and Playwright.
menuWeight: 3
paths:
    - puppeteer-playwright/common-use-cases/downloading-files
---

# Downloading files

Downloading a file using Puppeteer can be tricky. On some systems, there can be issues with the usual file saving process that prevent you from doing it the easy way. However, there are different techniques that work (most of the time).

These techniques are only necessary when we don't have a direct file link, which is usually the case when the file being downloaded is based on more complicated data export.

## [](#setting-up-a-download-path) Setting up a download path

Let's start with the easiest technique. This method tells the browser in what folder we want to download a file from Puppeteer after clicking on it.

```JavaScript
await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './my-downloads'})
```

We use the mysterious `_client` API which gives us access to all the functions of the underlying developer console protocol. Basically, it extends Puppeteer's functionality. Then we can download the file by clicking on the button.

```JavaScript
await page.click('.export-button');
```

Let's wait for one minute. In a real use case, you want to check the state of the file in the file system.

```JavaScript
await page.waitFor(60000);
```

To extract the file from the file system into memory, we have to first find its name, and then we can read it.

```JavaScript
import fs from 'fs';

const fileNames = fs.readdirSync('./my-downloads');

// Let's pick the first one
const fileData = fs.readFileSync(`./my-downloads/${fileNames[0]}`);
```

## [](#intercepting-a-file-download-request) Intercepting and replicating a file download request

For this second option, we can trigger the file download, intercept the request going out, and then replicate it to get the actual data. First, we need to enable request interception. This is done using the following line of code:

```JavaScript
await page.setRequestInterception(true);
```

Next, we need to trigger the actual file export. We might need to fill in some form, select an exported file type, etc. In the end, it will look something like this:

```JavaScript
await page.click('.export-button');
```

We don't need to await this promise since we'll be waiting for the result of this action anyway (the triggered request).

The crucial part is intercepting the request that would result in downloading the file. Since the interception is already enabled, we just need to wait for the request to be sent.

```JavaScript
const xRequest = await new Promise(resolve => {
    page.on('request', interceptedRequest => {
        interceptedRequest.abort(); //stop intercepting requests
        resolve(interceptedRequest);
    });
});
```

The last thing is to convert the intercepted Puppeteer request into a request-promise options object. We need to have the `request-promise` package installed.

```JavaScript
import request from 'request-promise';
```

Since the request interception does not include cookies, we need to add them subsequently.

```JavaScript
const options = {
    encoding: null,
    method: xRequest._method,
    uri: xRequest._url,
    body: xRequest._postData,
    headers: xRequest._headers
}

// Add the cookies
const cookies = await page.cookies();
options.headers.Cookie = cookies.map(ck => ck.name + '=' + ck.value).join(';');

// Resend the request
const response = await request(options);
```

Now, the response contains the binary data of the downloaded file. It can be saved to the disk, uploaded somewhere, or [submitted with another form]({{@link puppeteer_playwright/common_use_cases/submitting_a_form_with_a_file_attachment.md}}).
