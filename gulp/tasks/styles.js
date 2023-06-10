const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const gulpIf = require('gulp-if');
const sortMediaQueries = require('postcss-sort-media-queries');
const { server } = require('./server');
const config = require('../config');

const processors = [
  sortMediaQueries(),
  autoprefixer(config.settings.autoprefixer),
];

function styles () {
  if (config.production) {
    processors.push(csso);
  }

  return src(`${config.src.sass}/**/*.{${config.ext.scss}}`)
    .pipe(gulpIf(!config.production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: config.production ? 'compressed' : 'expanded',
      precision: 5
    }))
    .pipe(postcss(processors))
    .on('error', config.errorHandler)
    .pipe(gulpIf(!config.production, sourcemaps.write('./')))
    .pipe(dest(config.dest.root))
    .pipe(server.stream());
};

exports.styles = styles;
