const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postCSSImports = require('postcss-import');

module.exports = {
  plugins: [cssnano(), postcssPresetEnv(), postCSSImports({ path: ['src'] })],
};