module.exports = {
    api: [
        {
            type: 'category',
            label: 'Apify API',
            // eslint-disable-next-line global-require
            items: require('./sidebar.ts'),
        },
    ],
};
