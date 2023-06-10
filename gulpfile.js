const requireDir = require('require-dir');

// load tasks
const tasks = requireDir('./gulp/tasks');

exports.ajax = tasks.ajax.ajax;
exports.build = tasks.build.build;
exports.clean = tasks.clean.clean;
exports.default = tasks.default.default;
exports.html = tasks.html.html;
exports.styles = tasks.styles.styles;
exports.browsersync = tasks.server.browsersync;
exports.server = tasks.server.server;
exports.vendor = tasks.vendor.vendor;
exports.watchFiles = tasks.watch.watchFiles;
// assets
exports.fonts = tasks.assets.fonts;
exports.images = tasks.assets.images;
exports.svg = tasks.assets.svg;
exports.favicons = tasks.assets.favicons;
exports.assets = tasks.assets.assets;
// js
exports.jsCore = tasks.js.jsCore;
exports.jsVendor = tasks.js.jsVendor;
exports.js = tasks.js.js;
