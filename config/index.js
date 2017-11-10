const fs = require('fs');

const config = {};
const dirName = `${__dirname}/components`;

fs.readdirSync(dirName)
  .forEach((fileName) => Object.assign(config, require(`${dirName}/${fileName}`)));

module.exports = config;
