const Ajv = require('ajv');
const { name, version } = require('../../package.json');

const ajv = new Ajv({
  removeAdditional: true,
});
const ENUM_ENV = ['development', 'production', 'test', 'preproduction'];
const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['NODE_ENV', 'PORT'],
  properties: {
    NODE_ENV: {
      type: 'string',
      enum: ENUM_ENV,
    },
    REMOTE_LOGGER: {
      type: 'string',
      enum: ['on', 'off'],
    },
    PORT: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
    ENV_DUBBO: {
      type: 'string',
      enum: ENUM_ENV,
    },
    ENV_MEMCACHE: {
      type: 'string',
      enum: ENUM_ENV,
    },
    ENV_PATH: {
      type: 'string',
      enum: ENUM_ENV,
    },
    ENV_QINIU: {
      type: 'string',
      enum: ENUM_ENV,
    },
  },
};

const env = Object.assign({}, process.env);
const valid = ajv.validate(schema, env);

if (!valid) {
  throw new Error(`Config validation error: ${JSON.stringify(ajv.errorsText())}`);
}

const common = Object.assign({
  APP_NAME: name,
  APP_VERSION: version,
  PM2_ID: process.env.pm_id || '',
  PID: process.pid,
  REMOTE_LOGGER: 'off',
  ENV_DUBBO: '',
  ENV_MEMCACHE: '',
  ENV_PATH: '',
  ENV_QINIU: '',
}, env);

module.exports = Object.freeze(common);
