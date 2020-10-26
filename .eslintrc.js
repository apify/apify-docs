module.exports = {
    extends: [
        "plugin:markdown/recommended",
        "@apify"
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 8
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        "import/no-extraneous-dependencies": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-console": "off",
    },
};