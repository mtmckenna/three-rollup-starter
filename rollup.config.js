import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

var isProduction = process.env.NODE_ENV === 'production';
var cache;

export default {
  entry: 'src/js/main.js',
  format: 'iife',
  dest: './build/js/bundle.js',
  sourceMap: true,
  moduleName: 'RollupBundle',
  cache: cache,
  treeshake: true,
  indent: false, // maybe removes ~0.5s from building three.js
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: ['node_modules/**', 'src/css/**']
    }),
    eslint({
      exclude: [
        'src/css/**',
      ]
    }),
    postcss({
      extensions: [ '.css' ],
      plugins: [cssnano()]
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (isProduction && uglify()),
  ]
};

