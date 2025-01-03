// eslint-disable-next-line global-require
const items = require('./sidebar.ts');

for (const item of items) {
    // this is wrongly rendered in each category (openapi group tag)
    if (item.items[0].id === 'apify-api') {
        item.items.shift();
    }
}

module.exports = {
    api: [
        {
            type: 'category',
            label: 'Apify API',
            collapsible: false,
            className: 'section-header',
            link: { type: 'doc', id: 'apify-api' },
            items,
        },
    ],
};
