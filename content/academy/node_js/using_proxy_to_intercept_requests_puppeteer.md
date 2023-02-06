---
title: Using man-in-the-middle proxy to intercept requests in Puppeteer
description: This article demonstrates how to setup a reliable interception of HTTP requests in headless Chrome / Puppeteer using a local proxy.
menuWeight: 16.1
paths:
    - node-js/using-proxy-to-intercept-requests-puppeteer
---

Sometimes you may need to intercept (or maybe block) requests in headless Chrome / Puppeteer, but `page.setRequestInterception()`  is not 100% reliable when the request is started in a new window.

One possible way to intercept these requests is to use a man-in-the-middle (MITM) proxy, i.e. a proxy server that can intercept and modify HTTP requests, even those over HTTPS. In this example, we're going to use <https://github.com/joeferner/node-http-mitm-proxy>, since it has all the tools that we need.

First we set up the MITM proxy:

```JavaScript
const Proxy = require('http-mitm-proxy');
const Promise = require('bluebird');
const { promisify } = require('util');

const { exec } = require('child_process');

const execPromise = promisify(exec);

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const setupProxy = async (port) => {
  // Setup chromium certs directory
  // WARNING: this only works in debian docker images
  // modify it for any other use cases or local usage.
  await execPromise('mkdir -p $HOME/.pki/nssdb');
  await execPromise('certutil -d sql:$HOME/.pki/nssdb -N');
  const proxy = Proxy();
  proxy.use(Proxy.wildcard);
  proxy.use(Proxy.gunzip);
  return new Promise((resolve, reject) => {
    proxy.listen({ port, silent: true }, (err) => {
      if (err) return reject(err);
      // Add CA certificate to chromium and return initialize proxy object
      execPromise('certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n mitm-ca -i ./.http-mitm-proxy/certs/ca.pem')
        .then(() => resolve(proxy))
        .catch(reject);
    });
  });
}
```

Then we'll need a Docker image that has the `certutil` utility. Here is an [example of a Dockerfile](https://github.com/apifytech/act-proxy-intercept-request/blob/master/Dockerfile) that can create such an image and is based on the [apify/actor-node-chrome](https://hub.docker.com/r/apify/actor-node-chrome/) image that contains Puppeteer.

Now we need to specify how the proxy shall handle the intercepted requests:

```JavaScript
// Setup blocking of requests in proxy
const proxyPort = 8000;
const proxy = setupProxy(proxyPort);
proxy.onRequest((context, callback) => {
   if (blockRequests) {
     const request = context.clientToProxyRequest;
     // Log out blocked requests
     console.log('Blocked request:', request.headers.host, request.url);

// Close the connection with custom content
     context.proxyToClientResponse.end('Blocked');
     return;
   }
   return callback();
});
```

The final step is to let Puppeteer use the local proxy:

```JavaScript
// Launch puppeteer with local proxy
const browser = await puppeteer.launch({
    args: [ '--no-sandbox', `--proxy-server=localhost:${proxyPort}` ]
});
```

And we're done! By adjusting the `blockRequests` variable, you can allow or block any request initiated through Puppeteer.

Here is a GitHub repository with a full example and all necessary files: <https://github.com/apifytech/actor-example-proxy-intercept-request>

If you have any questions, feel free to contact us in the chat.

Happy intercepting!
