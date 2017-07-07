/* @noflow */

import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    babel({
      babelrc: false,
      presets: [['es2015', {modules: false}], 'stage-2', 'react'],
      plugins: ['external-helpers'],
      externalHelpers: true,
    }),
  ],
  dest: 'lib/index.js',
};
