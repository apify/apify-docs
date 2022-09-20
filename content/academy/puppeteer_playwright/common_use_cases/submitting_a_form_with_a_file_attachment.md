---
title: Submitting a form with a file attachment
description: Understand how to download a file, attach it to a form using a headless browser in Playwright or Puppeteer, then submit the form.
menuWeight: 4
paths:
    - puppeteer-playwright/common-use-cases/submitting-a-form-with-a-file-attachment
---

# Submitting a form with a file attachment

We can use Puppeteer or Playwright to simulate submitting the same way a human-operated browser would.

## [](#downloading-the-file) Downloading the file

The first thing necessary is to download the file, which can be done using the `request-promise` module. We will also be using the `fs/promises` module to save it to the disk, so make sure they are included.

```JavaScript
import * as fs from 'fs/promises';
import request from 'request-promise';
```

The actual downloading is slightly different for text and binary files. For a text file, it can simply be done like this:

```JavaScript
const fileData = await request('https://some-site.com/file.txt');
```

For a binary data file, we need to provide an additional parameter so as not to interpret it as text:

```JavaScript
const fileData = await request({
    uri: 'https://some-site.com/file.pdf',
    encoding: null
});
```

In this case, `fileData` will be a `Buffer` instead of a string.

To use the file in Puppeteer/Playwright, we need to save it to the disk. This can be done using the `fs/promises` module.

```JavaScript
await fs.writeFile('./file.pdf', fileData);
```

## [](#submitting-the-form) Submitting the form

The first step necessary is to open the form page in Puppeteer. This can be done as follows:

```JavaScript
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://some-site.com/file-upload.php');
```

To fill in any necessary form inputs, we can use the `page.type()` function. This works even in cases when `elem.value = 'value'` is not usable.

```JavaScript
await page.type('input[name=firstName]', 'John');
await page.type('input[name=surname]', 'Doe');
await page.type('input[name=email]', 'john.doe@mail.com');
```

To add the file to the appropriate input, we first need to find it and then use the [`uploadFile()`](https://pptr.dev/next/api/puppeteer.elementhandle.uploadfile) function.

```JavaScript
const fileInput = await page.$('input[type=file]');
await fileInput.uploadFile('./file.pdf');
```

Now we can finally submit the form.

```JavaScript
await page.click('input[type=submit]');
```
