import { defineConfig } from '@apify/oxlint-config';

export default defineConfig({
    ignorePatterns: [
        '**/node_modules',
        '**/dist',
        '.docusaurus',
        'build',
        'sources/api',
        'apify-api',
        'patches',
        'examples',
    ],
    rules: {
        'typescript/no-explicit-any': 'off',
        'no-param-reassign': 'off',
        'no-void': 'off',
        'no-console': 'off',
        'import/no-default-export': 'off',
        // Docs/theme React event handlers commonly call async functions without
        // awaiting; treating that as fire-and-forget is intentional here.
        'typescript/no-floating-promises': 'off',
        'typescript/promise-function-async': 'off',
    },
    overrides: [
        {
            files: ['*.config.ts', '*.config.mts', '*.config.mjs', '*.config.js'],
            rules: {
                'no-console': 'off',
                'import/no-default-export': 'off',
            },
        },
    ],
});
