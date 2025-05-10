import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      'build',
      '.idea',
      '*.log',
      'public',
      '.vscode',
      'coverage',
      'README.md',
      'node_modules',
      '.react-router',
      'pnpm-lock.yaml'
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, prettier, stylistic },
    settings: { react: { version: 'detect' } },
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: globals.browser
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line'
        }
      ],
      indent: ['error', 2],
      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'none',
          arrowParens: 'always',
          bracketSpacing: true,
          endOfLine: 'lf'
        }
      ],
      'import/no-anonymous-default-export': 'off',
      'stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'any', prev: 'expression', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'return' }
      ]
    }
  }
];
