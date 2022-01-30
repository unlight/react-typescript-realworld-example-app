module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'plugin:import/warnings',
    'plugin:regexp/recommended',
    'plugin:etc/recommended',
    'plugin:testing-library/dom',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    'react',
    'react-hooks',
    'unicorn',
    'import',
    'wix-editor',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'sort-class-members',
    'promise',
    'sonarjs',
    'etc',
    'testing-library',
    '@kyleshevlin',
    'only-warn',
  ],
  ignorePatterns: ['@generated/**', '*.config.js', '.*rc.js'],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  rules: {
    // core
    'consistent-return': [1, { treatUndefinedAsUnspecified: true }],
    quotes: [1, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    semi: [1, 'always'],
    'max-lines': [1, { max: 300 }],
    'max-params': [1, { max: 5 }],
    'no-unneeded-ternary': [1],
    // wix-editor
    'wix-editor/no-instanceof-array': 1,
    'wix-editor/no-not-not': 1,
    'wix-editor/no-unneeded-match': 1,
    'wix-editor/prefer-filter': 1,
    'wix-editor/prefer-ternary': 1,
    'wix-editor/return-boolean': 1,
    'wix-editor/simplify-boolean-expression': 1,
    // unicorn
    'unicorn/no-null': 0,
    'unicorn/no-useless-undefined': 0,
    'unicorn/prefer-spread': 0,
    'unicorn/catch-error-name': 0,
    'unicorn/prevent-abbreviations': [
      1,
      {
        replacements: {
          args: false,
          err: false,
          prod: false,
          ref: false,
          params: false,
          props: false,
        },
      },
    ],
    'unicorn/filename-case': [
      1,
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    // import
    'import/max-dependencies': [1, { max: 15 }],
    // simple-import-sort with recomended settings
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'sort-imports': 0,
    'import/first': 1,
    'import/newline-after-import': 1,
    'import/no-duplicates': 1,
    // typescript-eslint
    '@typescript-eslint/no-floating-promises': 1,
    '@typescript-eslint/no-unnecessary-condition': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // sort-class-members
    'sort-class-members/sort-class-members': [
      1,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
    // @kyleshevlin
    '@kyleshevlin/prefer-custom-hooks': 1,
    // testing-library
    'testing-library/render-result-naming-convention': 0,
  },
  overrides: [
    {
      files: ['*.spec.ts', '**/testing/**/*.ts'],
      rules: {
        'consistent-return': 0,
        'max-lines': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/camelcase': 0,
        'import/max-dependencies': 0,
        'sonarjs/no-duplicate-string': 0,
      },
    },
  ],
};
