const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const { server } = require('./server');
const config = require('../config.js');

const processors = [
  csso
];

function vendor () {
  return src(config.src.css + '/**/*.css')
    .pipe(postcss(processors))
    .pipe(dest(config.dest.css))
    .pipe(server.stream());
}

exports.vendor = vendor;
