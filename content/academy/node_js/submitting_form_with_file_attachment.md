---
title: Submitting a form with file attachment
description: How to submit a form with attachment using request-promise.
menuWeight: 15.5
paths:
    - node-js/submitting-form-with-file-attachment
---

When doing web automation with Apify, it can sometimes be necessary to submit an HTML form with file attachment. This article will cover a situation where the file is publicly accessible (e.g. hosted somewhere) and will use an Apify actor. If it is not possible to use request-promise, it might be necessary to use [Puppeteer.](http://kb.apify.com/actor/submitting-a-form-with-file-attachment-using-puppeteer)

# Downloading the file to memory

After creating a new actor, the first thing to do is download the file. We can do that using the request-promise module, so make sure it is included.

const request = require('request-promise');

The actual downloading is going to be slightly different for text and binary files. For a text file, it can simply be done like this:

```JavaScript
const fileData = await request('https://some-site.com/file.txt');

For a binary file, we need to provide additional parameters so as not to interpret it as text:

const fileData = await request({
    uri: 'https://some-site.com/file.pdf',
    encoding: null
});
```

In this case, fileData will be a Buffer instead of String.

# Submitting the form

When the file is ready, we can submit the form as follows:

```JavaScript
await request({
    uri: 'https://other-site.com/submit-form.php',
    method: 'POST',

formData: {
        // set any form values
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',

// add the attachment
        attachment: {
            value: fileData,
            options: {
                filename: 'file.pdf',
                contentType: 'application/pdf'
            }
        }
    }
});
```

The header Content-Type: multipart/form-data will be set automatically.
