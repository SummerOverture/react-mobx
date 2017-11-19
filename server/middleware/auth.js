// const session = require('../libs/session');

module.exports = (req, res, next) => {
  if (!req.cookies.sessionId) {
    return res.status(401).send('');
  }

  next();

  // 刷新session存在的时间
};
