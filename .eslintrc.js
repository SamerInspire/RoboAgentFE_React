module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      // 'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      // 'plugin:import/typescript',
      // 'plugin:jsx-a11y/recommended',
    ],
    // parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: ['./jsconfig.json'],
          extensions: ['.js'],
        },
      },
    },
    plugins: ['import', 'react'],
    /* rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            ['parent', 'internal'],
            ['index', 'sibling'],
          ],
          'newlines-between': 'always',
        },
      ],
      'jsx-a11y/aria-role': [
        'warn',
        {
          ignoreNonDOM: true,
        },
      ],
    }, */
    overrides: [
      {
        files: ['**/tests/**/*.spec.{js}'],
        /* env: {
          jest: true,
        }, */
        rules: {
          '@typescript-eslint/ban-ts-comment': 'off',
          '@typescript-eslint/no-explicit-any': 'off',
        },
      },
    ],
  };
  