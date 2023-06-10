const { src, dest, parallel } = require('gulp');
const changed = require('gulp-changed');
const svgmin = require('gulp-svgmin');
const plumber = require('gulp-plumber');
const svgStore = require('gulp-svgstore');
const { server } = require('./server');
const config = require('../config');

// шрифты
function fonts () {
  return src(`${config.src.fonts}/*.{${config.ext.fonts}}`)
    .pipe(changed(config.dest.fonts))
    .pipe(dest(config.dest.fonts))
    .pipe(server.reload({stream: true}));
}

exports.fonts = fonts;

// картинки (кроме svg)
function images () {
  return src([`${config.src.images}/**/*.{${config.ext.images}}`, `!${config.src.images}/svg/*.svg`])
    .pipe(changed(config.dest.images))
    .pipe(dest(config.dest.images))
    .pipe(server.reload({stream: true}));
}

exports.images = images;

// svg
function svg () {
  return src(`${config.src.images}/svg/*.svg`)
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(svgmin({
      multipass: true,
      js2svg: {
        pretty: true
      },
      plugins: [{
        removeDesc: true
      }, {
        removeComments: true
      }, {
        removeViewBox: false
      }]
    }))
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(dest(config.dest.images))
    .pipe(server.reload({stream: true}));
}

exports.svg = svg;

// фавиконки
function favicons () {
  return src(`${config.src.root}/favicons/*.*`)
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(dest(config.dest.root));
}

exports.favicons = favicons;

exports.assets = parallel(fonts, images, svg, favicons);
