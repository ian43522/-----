const gulp = require('gulp');
const { browsersync } = require('./server');
const { watchFiles } = require('./watch');

exports.default = gulp.parallel(browsersync, watchFiles);
