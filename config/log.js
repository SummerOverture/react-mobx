const mkdirp = require('mkdirp');
const log4js = require('log4js');
const { PATH, PM2_ID } = require('./index');

const configLog = {
  appenders: [
    {
      type: 'console',
    }, {
      type: 'logLevelFilter',
      level: 'ERROR',
      exclude: 'http',
      appender: {
        type: 'dateFile',
        filename: `${PATH.LOG}/error-${PM2_ID}`,
        pattern: '-dd-hh.log',
        alwaysIncludePattern: false,
      },
    }, {
      type: 'logLevelFilter',
      level: 'DEBUG',
      appender: {
        type: 'file',
        filename: `${PATH.LOG}/debug-${PM2_ID}.log`,
        maxLogSize: 10485760,
        numBackups: 10,
      },
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/http-${PM2_ID}`,
      pattern: '-dd-hh.log',
      alwaysIncludePattern: false,
      category: 'http',
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/request-${PM2_ID}`,
      pattern: '-dd-hh.log',
      alwaysIncludePattern: false,
      category: 'request',
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/monitor-${PM2_ID}`,
      pattern: '-dd.log',
      alwaysIncludePattern: false,
      category: 'monitor',
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/dubbo-${PM2_ID}`,
      pattern: '-dd.log',
      alwaysIncludePattern: false,
      category: 'dubbo',
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/dubbo_longtime-${PM2_ID}`,
      pattern: '-dd-hh.log',
      alwaysIncludePattern: false,
      category: 'dubbo_longtime',
    }, {
      type: 'dateFile',
      filename: `${PATH.LOG}/memcache-${PM2_ID}`,
      pattern: '-dd-hh.log',
      alwaysIncludePattern: false,
      category: 'memcache',
    },
  ],
};

try {
  mkdirp.sync(PATH.LOG);
} catch (e) {
  if (e.code !== 'EEXIST') {
    /* eslint-disable no-console */
    console.log(`Could not set up log directory, error was: ${e.message}`);
    process.exit(1);
  }
}

log4js.configure(configLog);

exports.closeLog = () =>
  new Promise((resolve) => {
    log4js.shutdown(resolve);
  });
