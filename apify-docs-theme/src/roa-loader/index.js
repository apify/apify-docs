const { createHash } = require('node:crypto');
const { inspect } = require('node:util');

const { urlToRequest } = require('loader-utils');

const signingUrl = new URL('https://api.apify.com/v2/tools/encode-and-sign');
signingUrl.searchParams.set('token', process.env.APIFY_SIGNING_TOKEN);
const queue = [];
const cache = {};
let working = false;

function hash(source) {
    return createHash('sha1').update(source).digest('hex');
}

async function getHash(source) {
    const cacheKey = hash(source);

    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    const memory = source.match(/playwright|puppeteer/i) ? 4096 : 1024;
    const res = await (await fetch(signingUrl, {
        method: 'POST',
        body: JSON.stringify({
            input: JSON.stringify({ code: source }),
            options: {
                build: 'latest',
                contentType: 'application/json; charset=utf-8',
                memory,
                timeout: 180,
            },
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })).json();

    if (!res.data || !res.data.encoded) {
        console.error(`Signing failed:' ${inspect(res.error) || 'Unknown error'}`, res);
        return 'invalid-token';
    }

    cache[cacheKey] = res.data.encoded;
    await new Promise((resolve) => {
        setTimeout(resolve, 100);
    });

    return res.data.encoded;
}

async function encodeAndSign(source) {
    if (working) {
        return new Promise((resolve, reject) => {
            queue.push(() => {
                return getHash(source).then(resolve, reject);
            });
        });
    }

    let res;

    try {
        working = true;
        res = await getHash(source);

        while (queue.length) {
            await queue.shift()();
        }
    } finally {
        working = false;
    }

    return res;
}

module.exports = async function (code) {
    if (process.env.CRAWLEE_DOCS_FAST) {
        return { code, hash: 'fast' };
    }

    console.log(`Signing ${urlToRequest(this.resourcePath)}...`, { working, queue: queue.length });
    const codeHash = await encodeAndSign(code);

    return { code, hash: codeHash };
};
