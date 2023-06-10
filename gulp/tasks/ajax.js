const { src, dest } = require('gulp');
const config = require('../config');

function ajax () {
  return src(`${config.src.ajax}/*.*`)
    .pipe(dest(config.dest.ajax));
}

exports.ajax = ajax;
