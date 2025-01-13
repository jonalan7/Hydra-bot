import prettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
      parser: typescriptParser,
    },
    plugins: {
      prettier,
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
      '@typescript-eslint': {},
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
