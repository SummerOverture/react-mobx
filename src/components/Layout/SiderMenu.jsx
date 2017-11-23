import React from 'react';
import { Icon, Menu } from 'antd';

const SiderMenu = () => (
  <div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
    >
      <Menu.Item key="1">
        <Icon type="user" />
        <span>nav 1</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="video-camera" />
        <span>nav 2</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="upload" />
        <span>nav 32</span>
      </Menu.Item>
    </Menu>
  </div>);

export default SiderMenu;
