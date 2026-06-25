import typescriptEslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";

export default typescriptEslint.config(
  {
    ignores: [
      "**/.expo/",
      "**/ios/",
      "**/android/",
      "**/node_modules/",
      "**/slides/**",
      "**/slides/dist/**",
      "**/*.config.js",
      "**/metro.config.js",
      "**/eslint.config.mjs",
    ],
  },
  typescriptEslint.configs.recommendedTypeChecked,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    ...reactHooks.configs["recommended-latest"],
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      "simple-import-sort": simpleImportSort,
      "no-relative-import-paths": noRelativeImportPaths,
      "unused-imports": unusedImports,
      react,
      import: importPlugin,
      boundaries,
    },
    languageOptions: {
      parser: typescriptEslint.parser,
      ecmaVersion: 2022,
      parserOptions: {
        projectService: true,
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        { type: "app", pattern: "app-root/**" },
        { type: "screens", pattern: "screens/*", capture: ["screen"] },
        { type: "features", pattern: "features/*", capture: ["feature"] },
        { type: "shared", pattern: "shared/*", capture: ["segment"] },
      ],
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["src/"],
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: false },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          rules: [
            {
              from: ["shared"],
              disallow: ["app", "screens", "features"],
              message:
                "Shared module must not import upper layers (${dependency.type})",
            },
            {
              from: ["features"],
              disallow: ["app", "screens"],
              message:
                "Feature must not import upper layers (${dependency.type})",
            },
            {
              from: ["screens"],
              disallow: ["app"],
              message:
                "Screen must not import upper layers (${dependency.type})",
            },
          ],
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.js"],
    extends: [typescriptEslint.configs.disableTypeChecked],
  },
  {
    files: ["**/tamagui.config.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
