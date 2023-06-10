const argv = require('minimist')(process.argv.slice(2));
const log = require('fancy-log');
const colors = require('ansi-colors');
const production = argv.production || argv.prod || false;

const config = {
  env: 'development',
  production: production,

  src: {
    root: 'dev',
    templates: 'dev/templates',
    components: 'dev/templates/components',
    sass: 'dev/scss',
    js: 'dev/js',
    images: 'dev/images',
    css: 'dev/css',
    pages: 'dev/pages',
    fonts: 'dev/fonts',
    data: 'dev/templates/data',
    ajax: 'dev/ajax',
    favicons: 'dev/favicons'
  },

  dest: {
    root: 'dist',
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images',
    fonts: 'dist/fonts',
    lib: 'dist/lib',
    components: 'dist/components',
    modules: 'dist/components/modules',
    ajax: 'dist/ajax',
    favicons: 'dist'
  },

  ext: {
    images: ['jpg', 'png', 'svg', 'gif'],
    fonts: ['ttf', 'eot', 'woff', 'woff2'],
    scss: ['sass', 'scss'],
  },

  settings: {
    autoprefixer: {
      cascade: true
    }
  },

  setEnv: function (env) {
    if (typeof env !== 'string') return;

    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function () {
    log(colors.black.bgYellow(`Environment: ${process.env.NODE_ENV}`));
  },

  errorHandler: require('./util/handleErrors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
