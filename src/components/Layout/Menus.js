import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
// import { withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

const menus = [{
  name: '首页',
  icon: 'pie-chart',
  url: '/dashboard',
}, {
  name: '产品',
  icon: 'plus-square-o',
  children: [
    {
      name: '产品列表',
      icon: 'minus-square-o',
    }, {
      name: '共享产品列表',
      icon: 'info-circle-0',
    },
  ],
}];

class Menus extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  getAllMenus() {
    return menus.map((item, index) => {
      const key = index + Math.random();
      if (!item.children) {
        return (
          <Menu.Item key={key}>
            <Icon type={item.type} />
            <span onClick={() => this.handleClick(item)}>{item.name}</span>
          </Menu.Item>
        );
      }
      return (
        <SubMenu key={key} title={<span><Icon type={item.type} /><span>{item.name}</span></span>}>
          {item.children.map((_item, i) => {
            const cKey = key + i;
            return (
              <Menu.Item key={cKey}>
                <Icon type={_item.type} />
                <span onClick={() => this.handleClick(item)}>{_item.name}</span>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  }

  handleClick(item) {
    console.log(item);
  }

  render() {
    const A = this.getAllMenus();
    return <div><A /></div>;
  }
}

export default Menus;
