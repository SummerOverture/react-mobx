const router = require('express').Router();
const auth = require('../middleware/auth');

module.exports = (app) => {
  app.use('/login', router);
};

router.post('/checkAuth', auth, (req, res) => {
  res.send({
    nickName: 'yanglu',
  });
});

router.post('/', (req, res) => {
  res.cookie('sessionId', '123456', {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  setTimeout(() => {
    res.send({
      nickName: 'yanglu',
    });
  }, 1000);
});
