const { NODE_ENV } = require('./common');

const MINIAPP = {
  development: {
    qrcode: [{ type: 1, count: 20 }, { type: 2, count: 20 }, { type: 3, count: 20 }],
  },
  test: {
    qrcode: [{ type: 1, count: 20 }, { type: 2, count: 20 }, { type: 3, count: 20 }],
  },
  preproduction: {
    qrcode: [{ type: 1, count: 20 }, { type: 2, count: 20 }, { type: 3, count: 20 }],
  },
  production: {
    qrcode: [{ type: 1, count: 60000 }, { type: 2, count: 20000 }, { type: 3, count: 10000 }],
  },
};

module.exports = Object.freeze({ MINIAPP: MINIAPP[NODE_ENV] });
