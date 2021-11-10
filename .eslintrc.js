const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  plugins: [
    'import',
  ],
  extends: [
    'plugin:import/errors',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'valid-jsdoc': [
      ERROR,
      {
        requireParamDescription: true,
        requireParamType: true,
        requireReturnDescription: false,
      },
    ],
    'semi': OFF,
    'eqeqeq': WARNING,
    'global-require': OFF,
    'brace-style': [
      ERROR,
      '1tbs',
      {
        'allowSingleLine': true,
      },
    ],
    'quotes': [
      ERROR,
      'single',
      {
        'avoidEscape': true,
      },
    ],
    'no-var': ERROR,
    'no-eval': ERROR,
    'no-unreachable': ERROR,
    'no-dupe-keys': ERROR,
    'no-dupe-args': ERROR,
    'no-unused-vars': [
      ERROR,
      {
        'vars': 'all',
        'args': 'none',
      },
    ],
    'no-duplicate-case': ERROR,
    'no-useless-concat': OFF,
    'no-mixed-spaces-and-tabs': ERROR,
    'no-multi-str': ERROR,
    'no-extra-semi': ERROR,
  },
};
