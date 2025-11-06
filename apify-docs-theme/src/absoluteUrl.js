let absoluteUrl = 'https://docs.apify.com';

if (process.env.LOCALHOST) {
    absoluteUrl = 'http://localhost:3000';
} else if (process.env.DEV) {
    absoluteUrl = 'http://docs.apify.loc';
} else if (process.env.APIFY_DOCS_ABSOLUTE_URL) {
    absoluteUrl = process.env.APIFY_DOCS_ABSOLUTE_URL;
}

exports.absoluteUrl = absoluteUrl;
