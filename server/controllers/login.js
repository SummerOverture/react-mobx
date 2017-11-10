const router = require('express').Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/index', (req, res, next) => {
  res.send('hello world');
});

router.post('/', (req, res, next) => {
  res.send('ddddd');
});
