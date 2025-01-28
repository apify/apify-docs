import react from 'eslint-plugin-react';
import globals from 'globals';

import apify from '@apify/eslint-config';

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
            'no-promise-executor-return': 'off',
            'no-param-reassign': 'off',
            'no-void': 'off',
            'no-console': 'off',
            'no-unused-vars': 'off',
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
];
