const { series } = require('gulp');
const { clean } = require('./clean');
const { styles } = require('./styles');
const { html } = require('./html');
const { cmptStyles, cmptStylesIsolated } = require('./components');
const { vendor } = require('./vendor');
const { ajax } = require('./ajax');
const { assets } = require('./assets');
const { js } = require('./js');
const argv = require('minimist')(process.argv.slice(2));
const config = require('../config');

function build (cb) {
  if (argv.development || argv.dev) {
    config.setEnv('development');
  } else {
    config.setEnv('production');
  }

  config.logEnv();

  return series(
    clean,
    styles,
    html,
    cmptStyles,
    cmptStylesIsolated,
    assets,
    vendor,
    js,
    ajax
  )(cb);
}

exports.build = build;
