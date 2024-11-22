module.exports = {
    api: [
        {
            type: 'category',
            label: 'API reference',
            // link: {
            //     type: 'generated-index',
            //     title: 'API reference',
            //     description:
            //         'This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.',
            //     slug: '/category/petstore-api',
            // },
            // eslint-disable-next-line global-require
            items: require('./sidebar.ts'),
        },
    ],
};
