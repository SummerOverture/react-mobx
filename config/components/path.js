const path = require('path');
const { NODE_ENV, ENV_PATH } = require('./common');

const rootPath = path.join(__dirname, '../../');
const PATH = {
  development: {
    ROOT: rootPath,
    APP: path.join(rootPath, 'server'),
    STATIC: path.join(rootPath, 'static'),
    LOG: path.join(rootPath, 'logs'),
    UPLOAD: path.join(rootPath, 'upload'),
  },
  test: {
    ROOT: rootPath,
    APP: path.join(rootPath, 'server'),
    STATIC: path.join(rootPath, 'static'),
    LOG: path.join(rootPath, '../logs/demo'),
    UPLOAD: path.join(rootPath, '../upload'),
  },
  preproduction: {
    ROOT: rootPath,
    APP: path.join(rootPath, 'server'),
    STATIC: path.join(rootPath, 'dist'),
    LOG: path.join(rootPath, '../logs/demo'),
    UPLOAD: path.join(rootPath, '../upload'),
  },
  production: {
    ROOT: rootPath,
    APP: path.join(rootPath, 'server'),
    STATIC: path.join(rootPath, 'dist'),
    LOG: path.join(rootPath, '../logs/demo'),
    UPLOAD: path.join(rootPath, '../upload'),
  },
};

module.exports = Object.freeze({ PATH: PATH[ENV_PATH || NODE_ENV] });
