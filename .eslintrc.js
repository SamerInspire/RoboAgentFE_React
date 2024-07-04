module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:import/typescript',
    // 'plugin:jsx-a11y/recommended',
  ],
  // parser: '@babel/eslint-parser',
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
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        "jest/valid-expect": 0
      }
    },
  ],
  rules: {
    "react/prop-types": "off",
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "keyword-spacing": 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-named-as-default-member': 'off',

  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  }
};
