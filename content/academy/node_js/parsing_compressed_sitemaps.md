---
title: How to parse compressed sitemaps
description: Some sitemaps.xml files are compressed and offered only as a stream. Learn how to configure your HTTP client to download and parse these.
menuWeight: 14.7
paths:
    - node-js/parsing_compressed_sitemaps
---

# [](#how-to-parse-compressed-sitemaps-with-streams) How to parse compressed sitemaps with streams

## [](#simple-sitemaps) Simple sitemaps
Most sitemaps can be downloaded using deault HTTP client settings. We can use `got-scraping` or `CheerioCrawler` to process these sitemaps easily.

```typescript
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

// Make sure to use proxies in real projects
const { body } = await gotScraping('https://stockx.com/sitemap/sitemap-0.xml');
const $ = cheerio.load(body);
console.log(`Found ${$('loc').length} URLs in the sitemap.`);
```

```typescript
import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
    requestHandler: async ({ $ }) => {
        console.log(`Found ${$('loc').length} URLs in the sitemap.`);
    },
});

await crawler.run('https://stockx.com/sitemap/sitemap-0.xml');
```

## [](#compressed-sitemaps) Compressed sitemaps
Unfortunately, the above code will not work for some sitemaps. We will need to create some scaffoliding code to decompress these sitemaps on the fly with streams. The code below will be fairly complicated but you can just copy paste it and use it in your projects.

Before we write any logic, let's add some imports. Don't forget to install `cheerio` and `got-scraping`. Let's create a separate file `gzip-stream.ts` so we have this logic nicely separated. We will use TypeScript for better clarity but you can use plain JavaScript as well, just remove the type annotations.

```typescript
// stream a zlib are default node.js modules
import { Readable, PassThrough, Writable, pipeline } from 'stream';
import { createUnzip } from 'zlib';

import cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { gotScraping } from 'got-scraping';
```

First, we convert our `gotScraping` HTTP client into a stream and assign a status code to it so we can throw and retry it later.

```typescript
const requestStream = async ({ url, headers = {}, proxyUrl }
    : { url: string, headers?: Dictionary, proxyUrl?: string}) => {
    const stream: any = await gotScraping({
        url,
        proxyUrl,
        retry: {
            limit: 0,
        },
        timeout: {
            response: 80000,
            request: 87000,
        },
        isStream: true,
        headers: {
            ...headers,
        },
        useHeaderGenerator: false,
    } as any);

    if (!stream) {
        throw new Error('Empty stream');
    }

    stream.statusCode = await new Promise((res, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Timeout 90s waiting for response code'));
        }, 90000);

        stream.on('response', (response: any) => {
            clearTimeout(timeout);
            res(response.statusCode);
        });

        stream.on('error', (e: any) => {
            clearTimeout(timeout);
            reject(e);
        });
    });

    return stream;
};
```

Now we define two functions that will add handling timeouts and other things to the stream.

```typescript
const passthroughAbortStream = (timeoutMillis: number) => {
    let lastActivity = Date.now();

    const passthrough = new PassThrough({
        autoDestroy: true,
        emitClose: true,
        highWaterMark: 4096,
        transform(chunk, _encoding, callback) {
            lastActivity = Date.now();
            callback(null, chunk);
        },
    });

    const interval = setInterval(() => {
        if (Date.now() - lastActivity >= timeoutMillis) {
            clear();
            passthrough.destroy(new Error(`Aborted slow/stuck stream after ${timeoutMillis}ms`));
        }
    }, 1000);

    const clear = () => clearInterval(interval);

    passthrough
        .once('close', clear)
        .once('end', clear)
        .once('error', clear);

    return passthrough;
};

const processStream = (transform: (buffer: Buffer) => any) => {
    /**
     * @param {(val: T) => void} resolve
     * @param {(val: Error) => void} reject
     */
    return (resolve: any, reject: any) => {
        const buffers: Buffer[] = [];
        const writable = new Writable({
            autoDestroy: true,
            emitClose: true,
            highWaterMark: 4096,
            write(chunk, _encoding, callback) {
                buffers.push(chunk);
                callback();
            },
            objectMode: false,
        });

        let finished = false;
        /**
         *
         * @param {(err: Error | null) => void} callback
         * @returns {(err: Error | null) => void}
         */
        const cleanup = (callback: any) => (err: any) => {
            if (!finished) {
                finished = true;
                try {
                    writable.destroy();
                    writable.end();
                } catch (e) {}
                callback(err instanceof Error ? err : null);
            }
        };

        const finish = () => {
            const concated = Buffer.concat(buffers);
            if (concated.length === 0) {
                return reject(new Error('Empty buffer'));
            }

            try {
                resolve(transform(concated));
            } catch (e) {
                reject(e);
            }
        };

        writable.on('close', cleanup(finish));
        writable.on('end', cleanup(finish));
        writable.on('error', cleanup(reject));

        return writable;
    };
};

const cheerioStream = processStream((buffer) => {
    return cheerio.load(buffer);
});
```

In the end we define the actual function that we will use and export it. It will also allow us to optionally pass in proxy URL.
```typescript
export const getGzipSitemap = async (url: string, proxyUrl?: string): Promise<CheerioAPI> => {
    const stream = await requestStream({ url, proxyUrl });
    return new Promise((resolve, reject) => {
        pipeline(
            stream,
            passthroughAbortStream(15000),
            createUnzip(),
            cheerioStream(resolve, reject),
            (err) => {
                if (err) {
                    reject(err);
                }
            },
        );
    });
};
```

Now we can call it in our scraping code to get the cheerio `$` handler and parse the sitemap.

```typescript
import { getGzipSitemap } from './gzip-stream.js';

// Some other scraping code...
// ...

const $ = await getGzipSitemap('https://d15790c7fypqrz.cloudfront.net/sitemaps/product_template.xml.gz');
console.log(`We found ${$('loc').length} URLs in the sitemap`);
```