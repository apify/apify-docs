module.exports = {
    extends: [
        'plugin:markdown/recommended',
        '@apify',
    ],
    parser: '@babel/eslint-parser',
    plugins: [
        '@babel',
    ],
    parserOptions: {
        configFile: '.babelrc',
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-undef': 'off',
        'no-console': 'off',
    },
};
