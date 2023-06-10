const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const prettify = require('gulp-prettify');
const { server } = require('./server');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const data = require('gulp-data');
const path = require('path');
const config = require('../config');

function renderHtml (onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  // custom filters
  const manageEnvironment = function (environment) {
    // php-like number format
    const numberFormat = function (value, decimalNumbers, decimalSeparator, thousandSeparator) {
      let newNumberAsString;

      if (value == null) {
        value = 0;
      }

      newNumberAsString = parseInt(value).toFixed(decimalNumbers).toString();

      if (decimalSeparator != null) {
        newNumberAsString = newNumberAsString.replace(/\./g, decimalSeparator);
      }

      if (thousandSeparator != null) {
        newNumberAsString = newNumberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
      }

      return newNumberAsString;
    };

    const phoneFormat = function (value) {
      let phone;

      if (value == null) {
        return;
      }

      phone = value.replace(/[^0-9]+/g, '');

      if (phone[0] === '7') {
        phone = '+' + phone;
      }

      return phone;
    };

    const implodeAttributes = function (filter) {
      if (!filter) return;

      let attrString = '';
      const booleanValues = [true, false];

      for (const attribute in filter) {
        if (booleanValues.indexOf(filter[attribute]) === -1) {
          attrString += ' ' + attribute + '="' + filter[attribute] + '"';
        } else if (filter[attribute] === true) {
          attrString += ' ' + attribute;
        }
      }

      return attrString;
    };

    const implodeClassName = function (filter) {
      if (!filter) return;

      let className = '';

      for (const value in filter) {
        if (filter[value]) {
          className += ' ' + value;
        }
      }

      className = className.trim();

      return className;
    };

    const merge = function (target = {}, source = {}) {
      for (const key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
      }

      Object.assign(target || {}, source);

      return target;
    };

    environment.addFilter('number_format', numberFormat);
    environment.addFilter('phone_format', phoneFormat);
    environment.addFilter('implode_attrs', implodeAttributes);
    environment.addFilter('implode_classname', implodeClassName);
    environment.addFilter('merge', merge);
  };

  function requireUncached ($module) {
    delete require.cache[require.resolve($module)];

    return require($module);
  }

  // ToC.createToC();

  return src(config.src.templates + '/[^_]*.njk')
    // .pipe(debug())
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpIf(onlyChanged, changed(config.dest.html)))
    .pipe(data(function (file) {
      return requireUncached('../../dev/templates/data/' + path.basename(file.path, '.njk') + '.json');
    }))
    .pipe(data(function () {
      return requireUncached('../../dev/templates/data/global.json');
    }))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.templates],
      manageEnv: manageEnvironment
    }))
    .pipe(prettify({
      indent_size: 4,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: false,
      // unformatted: [],
      end_with_newline: true
    }))
    .pipe(dest(config.dest.html))
    .pipe(server.reload({stream: true}));
}

function html () {
  return renderHtml();
  // return src(`${config.src.templates}/*.html`)
  //   .pipe(changed(config.dest.html))
  //   .pipe(prettify({
  //     indent_size: 4,
  //     wrap_attributes: 'auto',
  //     preserve_newlines: false,
  //     // unformatted: [],
  //     end_with_newline: true
  //   }))
  //   .pipe(dest(config.dest.html))
  //   .pipe(server.reload({stream: true}));
}

exports.html = html;
