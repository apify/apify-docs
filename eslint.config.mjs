import react from 'eslint-plugin-react';
import globals from 'globals';
import yml from 'eslint-plugin-yml';

import apify from '@apify/eslint-config/ts';

export default [
    {
        ignores: ['**/dist', 'node_modules', '.docusaurus', 'build', 'sources/api'],
    },
    ...apify,
    {
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.eslint.json',
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-param-reassign': 'off',
            'no-void': 'off',
            indent: 'off',
            'no-console': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/extensions': 'off',
            'import/no-default-export': 'off',
        },
    },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },
    },
    // YAML linting configuration - only for apify-api directory
    ...yml.configs['flat/recommended'].map(config => ({
        ...config,
        files: ['apify-api/**/*.{yml,yaml}'],
    })),
    {
        files: ['apify-api/**/*.{yml,yaml}'],
        rules: {
            // Enforce .yaml extension (not .yml)
            'yml/file-extension': ['error', { extension: 'yaml', caseSensitive: true }],
            // Enforce 2-space indentation
            'yml/indent': ['error', 2],
            // Disable quote enforcement (OpenAPI specs have various quoting styles)
            'yml/quotes': 'off',
            'yml/plain-scalar': 'off',
            // Keep important rules
            'yml/no-irregular-whitespace': 'error',
            'yml/no-tab-indent': 'error',
            'yml/no-empty-document': 'error',
            'yml/no-multiple-empty-lines': ['error', { max: 1 }],
            // Disable max-len (OpenAPI specs have long descriptions/URLs)
            'max-len': 'off',
        },
    },
    // Exception for root openapi.yaml - has special formatted description field
    {
        files: ['apify-api/openapi/openapi.yaml'],
        rules: {
            // Disable indentation check due to intentionally formatted description block
            'yml/indent': 'off',
        },
    },
];
