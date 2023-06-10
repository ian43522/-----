#!/usr/bin/env node
const fs = require('fs');
const config = require('./gulp/config.js');

const args = process.argv.slice(2);
let pageTitle;

if (args[0].length) {
  pageTitle = args[0];
} else {
  pageTitle = 'newpage';
}

newPage(pageTitle);

function newPage (pageTitle) {
  createJSON(pageTitle);
  createHTML(pageTitle);
}

function createJSON (filename) {
  const filepath = config.src.data + '/' + filename + '.json';
  const fileContent = '{}';

  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;

    console.log(filename + '.json was succesfully saved!');
  });
}

function createHTML (filename) {
  const stream = fs.createWriteStream(config.src.templates + '/' + filename + '.njk');

  stream.once('open', (fd) => {
    stream.write('{# Параметры страницы #}\n\n');
    stream.write('{% set pageType = "innerPage" %}\n');
    stream.write('{% set pageWidth = "normalWidth" %}\n');
    stream.write('{% set pageTitle = "Детальная" %}\n\n');
    stream.write('{# Параметры страницы #}\n\n');
    stream.write('{% extends "layouts/_layout.njk" %}\n');
    stream.write('{% block content %}\n\n\n\n');
    stream.write('{% endblock %}');

    stream.end();
  });

  console.log(filename + '.njk was succesfully saved!');
}
