const router = require('express').Router();
const auth = require('../middleware/auth');

module.exports = (app) => {
  app.use('/product', router);
};

router.all('*', auth);

router.post('/getList', (req, res) => {
  setTimeout(() => {
    res.send({
      list: [
        {
          ...req.body,
          key: '1' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '2' + Math.random(),
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '12' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '11' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '10' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '9' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '8' + Math.random(),
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '7' + Math.random(),
          name: '胡彦斌' + Math.random(),
          age: 32 + Math.random(),
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '6' + Math.random(),
          name: '胡彦斌' + Math.random(),
          age: 32 + Math.random(),
          address: '西湖区湖底公园1号',
        }, {
          ...req.body,
          key: '5' + Math.random(),
          name: '胡彦斌' + Math.random(),
          age: 32 + Math.random(),
          address: '西湖区湖底公园1号',
        },
      ],
      total: 50,
    });
  }, 1000);
});
