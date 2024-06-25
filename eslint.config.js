import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["./src/**/*.js"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  {
    ignores: [
      "build/",
      "public/",
      "./src/**/*.test.js",
      "./src/**/**/*.test.js",
      "./src/**/**/**/*.test.js",
      "babel.config.js",
      "setupTests.js",
      "i18n.js",
    ],
  },
  ...fixupConfigRules(pluginReactConfig),
];
