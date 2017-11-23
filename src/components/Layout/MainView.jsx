import { Layout } from 'antd';
import React from 'react';
import style from 'STYLE/layout.scss';
import PropTypes from 'prop-types';

import logo from '@/assets/logo.svg';

import Navbar from './Navbar';
import SiderMenu from './SiderMenu';

const { Header, Sider, Content } = Layout;

const LayoutHome = (props) => (
  <Layout>
    <Sider
      trigger={null}
      collapsible
      collapsed={false}
    >
      <div className={style.logo}>
        <img
          alt="这是logo"
          src={logo}
        />
      </div>
      <SiderMenu />
    </Sider>
    <Layout className={style.layout}>
      <Header
        className={style['layout-header']}
        style={{
          background: '#fff',
          padding: 0,
        }}
      >
        <Navbar className={style.navbar} />
      </Header>
      <Content className={style['layout-content']}>
        {props.children}
      </Content>
    </Layout>
  </Layout>
);

LayoutHome.propTypes = {
  children: PropTypes.any,
};

LayoutHome.defaultProps = {
  children: {},
};

export default LayoutHome;
