const path = require('path');

exports.DOCS_PATH = path.join(__dirname, '..', 'docs');

exports.BUILD_DIR_PATH = path.join(__dirname, '..', 'build');

exports.PAGE_EXT = 'md';

exports.ALLOWED_METADATA_KEYS = ['title', 'menuTitle', 'description', 'menuWeight', 'externalSourceUrl', 'paths'];
