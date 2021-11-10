import { readFileSync } from 'fs';
import parseJson from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import extend from './src/internal/_extend';
import pkg from './package.json';

const { name } = pkg;
const intro = readFileSync('src/index.js', 'utf-8').split('\n').slice(0, 1).join('\n');
const removeScopeName = name.split('/')[1];

const outputBase = {
  strict: false,
  externalLiveBindings: false,
  freeze: false,
};

export default [
  // Monolithic ESM bundle for client use.
  {
    input: 'src/index-all.js',
    treeshake: true,
    plugins: [
      parseJson(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
      }),
    ],
    output: extend({
      file: `esm/${removeScopeName}.js`,
      intro,
      format: 'esm',
      sourcemap: true,
      sourcemapExcludeSources: true,
    }, outputBase),
  },
  // Monolithic UMD bundle for client use.
  {
    input: 'src/index-default.js',
    treeshake: true,
    plugins: [
      nodeResolve(),
      commonjs(),
      parseJson(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
      }),
    ],
    output: extend({
      file: `dist/${removeScopeName}.js`,
      exports: 'default',
      intro,
      format: 'umd',
      name: 'S',
      amd: {
        id: name,
      },
      noConflict: true,
      sourcemap: true,
      sourcemapExcludeSources: true,
    }, outputBase),
  },
];
