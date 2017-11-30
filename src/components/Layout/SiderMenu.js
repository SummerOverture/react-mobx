import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { menus, peersMenus } from './menuConfig';

const { SubMenu } = Menu;

const allMenus = () => menus.map((item) => {
  if (!item.children) {
    return (
      <Menu.Item
        key={item.url}
      >
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </Menu.Item>
    );
  }
  return (
    <SubMenu
      key={item.url}
      title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
    >
      {item.children.map((_item) => (
        <Menu.Item
          key={_item.url}
        >
          <Icon type={_item.icon} />
          <span>{_item.name}</span>
        </Menu.Item>
      ))}
    </SubMenu>
  );
});

@inject('commonStore', 'queryStore')
@withRouter
@observer
class Menus extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.store = props.commonStore;
    this.peersMenus = peersMenus;
  }

  componentWillMount() {
    const selectMenu = this.peersMenus.find((item) => item.url === window.location.pathname) || {
      url: '/',
      name: '微点开放平台',
      openKeys: [],
    };
    this.store.setSelectedMenu(selectMenu);
  }

  handleClick(a, url) {
    this.props.queryStore.clearQuery();
    this.history.push(url);
  }

  render() {
    return (
      <div>
        <Menu
          onSelect={({ item, key }) => this.handleClick(item, key)}
          theme="dark"
          mode="inline"
          defaultOpenKeys={this.store.selectMenu.openKeys.slice()}
          defaultSelectedKeys={[this.store.selectMenu.url]}
        >
          {allMenus()}
        </Menu>
      </div>
    );
  }
}

Menus.WrappedComponent.propTypes = {
  history: PropTypes.object.isRequired,
  queryStore: PropTypes.object.isRequired,
  commonStore: PropTypes.object.isRequired,
};

export default Menus;
