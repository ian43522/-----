const { src, dest, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { server } = require('./server');
const config = require('../config');

function jsCore () {
  return src([`${config.src.js}/**/*.js`, `!${config.src.js}/vendor/*.js`])
    .pipe(gulpIf(!config.production, sourcemaps.init()))
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(babel())
    .pipe(gulpIf(!config.production, sourcemaps.write('./')))
    .pipe(gulpIf(config.production, uglify()))
    .pipe(dest(config.dest.js))
    .pipe(server.reload({stream: true}));
}

exports.jsCore = jsCore;

function jsVendor () {
  return src(`${config.src.js}/vendor/**/*.js`)
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpIf(config.production, uglify()))
    .pipe(dest(config.dest.js))
    .pipe(server.reload({stream: true}));
}

exports.jsVendor = jsVendor;

exports.js = series(jsVendor, jsCore);
