const fs = require('fs');
const path = require('path');

const services = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  }).forEach(function (file) {
    services[file.replace('.js', '')] = require(path.join(__dirname, file));
  });

module.exports = services;