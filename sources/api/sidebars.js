module.exports = {
    api: [
        {
            type: 'category',
            label: 'Apify API',
            collapsible: false,
            className: 'section-header',
            // eslint-disable-next-line global-require
            items: require('./sidebar.ts'),
        },
    ],
};
