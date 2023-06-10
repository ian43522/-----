const server = require('browser-sync').create();
const argv = require('minimist')(process.argv.slice(2));
const config = require('../config');

function browsersync () {
  server.init({
    server: {
      baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      },
      middleware: function (req, res, next) {
        // корректная обработка POST-запросов
        if (/\.json|\.txt|\.html|\.php/.test(req.url) && req.method.toUpperCase() === 'POST') {
          req.method = 'GET';
        }
        next();
      }
    },
    files: [
      config.dest.html + '/*.html',
      config.dest.css + '/*.css',
      config.dest.html + '/*.css',
      config.dest.js + '/**/*.js',
      config.dest.images + '/**/*.{' + config.ext.images + '}'
    ],
    port: argv.port || 3000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(argv.open),
    notify: false,
    ghostMode: false,
    online: Boolean(argv.tunnel),
    tunnel: argv.tunnel || null
  });
}

exports.server = server;
exports.browsersync = browsersync;
