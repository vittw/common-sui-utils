const { BABEL_ENV } = process.env;
const cjs = BABEL_ENV === 'cjs';

const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: ['ie >= 10'],
      },
      modules: false,
      loose: true,
    },
  ],
];

const plugins = [
  'lodash',
  [
    '@babel/plugin-transform-runtime',
    {
      'useESModules': !cjs,
    },
  ],
  '@babel/plugin-proposal-optional-chaining',
  [
    '@babel/plugin-proposal-decorators',
    {
      decoratorsBeforeExport: true,
    },
  ],
  cjs && [
    '@babel/transform-modules-commonjs',
    {
      loose: true,
    },
  ],
].filter(Boolean);

module.exports = {
  presets,
  plugins,
};
