import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

var isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: 'src/scripts/main.js',
  format: 'iife',
  dest: './build/js/bundle.js',
  sourceMap: true,
  moduleName: 'RollupBundle',
  treeshake: isProduction, // removes ~3s from building three.js
  indent: false, // maybe removes ~0.5s from building three.js
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: ['node_modules/**', 'src/styles/**']
    }),
    eslint({
      exclude: [
        'src/styles/**',
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

