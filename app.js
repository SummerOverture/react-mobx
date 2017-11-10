const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compress = require('compression');
const fallback = require('connect-history-api-fallback');
const { NODE_ENV, PORT, PATH } = require('./config');
const NODE_ENV_TYPE = require('./constants/NODE_ENV_TYPE.json');
const logger = require('log4js').getLogger('process');

const app = express();

require('./config/global');
// 只有预生产环境和生产环境才开启安全策略
if (NODE_ENV === NODE_ENV_TYPE.PREPRODUCTION || NODE_ENV === NODE_ENV_TYPE.PRODUCTION) {
  app.use(helmet({
    noCache: false,
    dnsPrefetchControl: false,
    frameguard: false,
  }));
}

// 生产环境开启HSTS策略
if (NODE_ENV === NODE_ENV_TYPE.PRODUCTION) {
  app.use(helmet.hsts({
    force: true,
    includeSubDomains: false,
  }));
}

app.use(bodyParser.json({
  limit: '300kb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(compress());

// 开启html5 model供前端使用
app.use(fallback());

app.use(express.static(PATH.STATIC));

require('./server')(app);

const server = app.listen(PORT, () => {
  logger.info(`Express server listening on port ${PORT} ${NODE_ENV}`);
});

const errLogger = (msg) => {
  // eslint-disable-next-line no-console
  console.error(`${new Date().pattern('yyyy-MM-dd HH:mm:ss')}\t${msg}`);
};

process.on('uncaughtException', (err) => {
  errLogger(`.Process crashed.\n${err.message}\n${err.stack}`);
  if (err.code === 'EADDRINUSE') {
    process.exit(1);
  }
});

const log = require('./config/log');

process.on('SIGINT', () => {
  Promise
    .all([
      server.close(),
    ])
    .then(() => log.closeLog())
    .catch((err) => {
      errLogger(`Server shutdown with error.${err.message}`);
    })
    .then(() => {
      process.exit();
    });
});
