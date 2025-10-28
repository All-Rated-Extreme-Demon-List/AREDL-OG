import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        ignores: ['node_modules/', 'dist/', '.wrangler/', 'public/'],
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.worker,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.json'],
                },
            },
        },
        rules: {
            'no-restricted-imports': ['error', { patterns: ['./*', '../*'] }],
        },
    },
];
