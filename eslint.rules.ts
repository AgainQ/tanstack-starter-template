import type { Linter } from 'eslint';

type EslintRules = NonNullable<Linter.Config['rules']>;

export const projectRules: EslintRules = {
  'react-refresh/only-export-components': 'off',

  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],
  'default-param-last': 'off',
  '@typescript-eslint/default-param-last': 'error',
};
