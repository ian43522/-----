const del = require('del');
const log = require('fancy-log');
const colors = require('ansi-colors');
const config = require('../config');

function clean () {
  return del([config.dest.root])
    .then(function (paths) {
      const folders = paths.join('\n');

      if (folders.length) {
        log(colors.green(`Folder ${config.dest.root} deleted`));
      } else {
        log(colors.yellow(`Folder ${config.dest.root} is empty or does not exist`));
      }
    });
}

exports.clean = clean;
