// @ts-check

/** @type {import('prettier').Config} */
const config = {
  printWidth: 90,
  singleQuote: true,
  jsxSingleQuote: true,

  plugins: ['@ianvs/prettier-plugin-sort-imports'],

  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^react$',
    '^react-dom(/.*)?$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/app(/.*)?$',
    '^@/routes(/.*)?$',
    '^@/features(/.*)?$',
    '^@/entities(/.*)?$',
    '^@/shared(/.*)?$',
    '',
    '^\\.\\.(/.*)?$',
    '^\\.(/.*)?$',
    '',
    '^.+\\.(css)$',
  ],

  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '6.0.0',
};

export default config;
