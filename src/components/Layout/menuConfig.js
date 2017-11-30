const menus = [
  {
    name: '首页',
    icon: 'pie-chart',
    url: '/dashboard',
  }, {
    name: '产品',
    url: '/product',
    icon: 'plus-square-o',
    children: [
      {
        name: '产品列表',
        url: '/product/index',
        icon: 'minus-square-o',
      }, {
        name: '共享产品列表',
        url: '/about',
        icon: 'info-circle-o',
      },
    ],
  }, {
    name: '订单',
    url: '/order',
    icon: 'pay-circle-o',
    children: [
      {
        name: '订单列表',
        url: '/order/list',
        icon: 'pay-circle-o',
      },
    ],
  },
];

const getPeersMenu = (menu, parentKeyArr) => {
  let result = [];
  menu.forEach((item) => {
    result.push(Object.assign({}, item, {
      openKeys: parentKeyArr,
    }));
    if (!item.children) {
      result.push();
    } else {
      const key = item.name;
      const keyArr = parentKeyArr && parentKeyArr.length ? parentKeyArr.push(key) : [key];
      result = result.concat(getPeersMenu(item.children, keyArr));
    }
  });
  return result;
};

exports.menus = menus;

exports.peersMenus = getPeersMenu(menus, []);
