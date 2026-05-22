import type { Linter } from 'eslint';

type EslintSettings = NonNullable<Linter.Config['settings']>;

export const boundariesSettings: EslintSettings = {
  'boundaries/include': ['src/**'],

  'boundaries/elements': [
    { type: 'app', pattern: 'src/app', mode: 'folder' },
    { type: 'route', pattern: 'src/routes', mode: 'folder' },
    { type: 'feature', pattern: 'src/features/*', mode: 'folder', capture: ['name'] },
    { type: 'entity', pattern: 'src/entities/*', mode: 'folder', capture: ['name'] },
    { type: 'shared', pattern: 'src/shared', mode: 'folder' },
  ],

  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: ['./tsconfig.app.json'],
    },
  },
};

// 1 Lower layers can not import higher layers
const layerRules = [
  // use global message
  {
    from: { type: 'shared' },
    disallow: { to: { type: ['entity', 'feature', 'route', 'app'] } },
  },
  {
    from: { type: 'entity' },
    disallow: { to: { type: ['feature', 'route', 'app'] } },
  },
  {
    from: { type: 'feature' },
    disallow: { to: { type: ['route', 'app'] } },
  },
];

// 1 Entity can not import another Entity
// 2 Feature can import another Feature (only through index.ts)
const crossSliceRules = [
  {
    from: { type: 'entity' },
    disallow: {
      to: {
        type: 'entity',
        captured: { name: '!{{from.captured.name}}' },
      },
    },
    message:
      'Entity "{{from.captured.name}}" cannot import another entity "{{to.captured.name}}".',
  },
  {
    from: { type: 'feature' },
    disallow: {
      to: {
        type: 'feature',
        captured: {
          name: '!{{from.captured.name}}',
        },
        internalPath: '!index.ts',
      },
    },
    message:
      'Feature "{{from.captured.name}}" must import feature "{{to.captured.name}}" only from its public API: "@/features/{{to.captured.name}}".',
  },
];

// 1 App/Route/Feature can import Entity only through index.ts
// 2 App/Route can import Feature only through index.ts
const publicApiRules = [
  {
    from: {
      type: ['app', 'route', 'feature'],
    },
    disallow: {
      to: {
        type: 'entity',
        internalPath: '!index.ts',
      },
    },
    message:
      '{{from.type}} must import entity "{{to.captured.name}}" only from its public API: "@/entities/{{to.captured.name}}".',
  },
  {
    from: {
      type: ['app', 'route'],
    },
    disallow: {
      to: {
        type: 'feature',
        internalPath: '!index.ts',
      },
    },
    message:
      '{{from.type}} must import feature "{{to.captured.name}}" only from its public API: "@/features/{{to.captured.name}}".',
  },
];

type EslintRules = NonNullable<Linter.Config['rules']>;

export const boundariesRules: EslintRules = {
  'boundaries/dependencies': [
    'error',
    {
      default: 'allow',
      message: '{{from.type}} is not allowed to import {{to.type}}',
      rules: [...layerRules, ...crossSliceRules, ...publicApiRules],
    },
  ],
};
