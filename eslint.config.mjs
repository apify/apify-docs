// ESLint config kept only to lint OpenAPI YAML files via eslint-plugin-yml.
// All JS/TS linting lives in `oxlint.config.ts`.
import yml from 'eslint-plugin-yml';

export default [
    ...yml.configs['flat/recommended'].map((config) => ({
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
            // Enforce quote style: prefer double quotes, only when necessary
            'yml/quotes': ['error', { prefer: 'double', avoidEscape: true }],
            // Enforce plain scalars (unquoted) when possible - quotes only when necessary
            'yml/plain-scalar': ['error', 'always'],
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
