const { watch, parallel } = require('gulp');
const { ajax } = require('./ajax');
const { fonts, images, svg, favicons } = require('./assets');
const { styles } = require('./styles');
const { html } = require('./html');
const { cmptStyles, cmptStylesIsolated } = require('./components');
const { vendor } = require('./vendor');
const { jsCore, jsVendor } = require('./js');
const config = require('../config');

function watchFiles () {
  watch(`${config.src.ajax}/*.*`, ajax);
  watch(`${config.src.sass}/**/*.{${config.ext.scss}}`, styles);
  watch(`${config.src.components}/**/*.{${config.ext.scss}}`, parallel(cmptStyles, cmptStylesIsolated));
  // css
  watch(`${config.src.css}/**/*.css`, vendor);
  // html
  watch(`${config.src.templates}/**/*.njk`, html);
  watch(`${config.src.templates}/**/*.json`, html);
  // assets
  watch(`${config.src.fonts}/*.{${config.ext.fonts}}`, fonts);
  watch(`${config.src.images}/*.{${config.ext.images}}`, images);
  watch(`${config.src.images}/svg/*.{${config.ext.images}}`, svg);
  watch(`${config.src.favicons}/*.*`, favicons);
  // js
  watch(`${config.src.js}/vendor/*.js`, jsVendor);
  watch([`${config.src.js}/**/*.js`, `!${config.src.js}/vendor/*.js`], jsCore);
}

exports.watchFiles = watchFiles;
