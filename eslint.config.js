import Javascript from '@eslint/js';
import ReactHooks from 'eslint-plugin-react-hooks';
import Globals from 'globals';
import TypescriptEslint from 'typescript-eslint';

export default TypescriptEslint.config(
    {
        ignores: [
            '.output/**',
            '.wxt/**',
            'AgentWorks/**',
            'node_modules/**',
        ],
    },
    Javascript.configs.recommended,
    ...TypescriptEslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions:
        {
            globals:
            {
                ...Globals.browser,
                ...Globals.webextensions,
                ...Globals.node,
            },
        },
        plugins:
        {
            'react-hooks': ReactHooks,
        },
        rules:
        {
            ...ReactHooks.configs.flat.recommended.rules,
            'react-hooks/set-state-in-effect': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
);
