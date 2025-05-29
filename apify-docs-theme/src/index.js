// eslint-disable-next-line no-unused-vars
const { Prism } = require('prismjs');
const config = require('./config.js');
const { theme } = require('./theme.js');

module.exports = {
    default: theme,
    config,
};
