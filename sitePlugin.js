module.exports = function () {
    return {
        name: 'custom-docusaurus-plugin',

        configureWebpack() {
            return {
                resolve: {
                    alias: {
                        path: require.resolve('path-browserify'),
                    },
                    fallback: {
                        fs: false,
                    },
                },
            };
        },
    };
};
