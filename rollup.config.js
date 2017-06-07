import babel from 'rollup-plugin-babel';
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
  sourceMap: !isProduction ? 'inline' : false,
  moduleName: 'RollupBundle',
  plugins: [
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

