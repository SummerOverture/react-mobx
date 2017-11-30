import { Layout } from 'antd';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from 'SRC/assets/logo.svg';
import NotFound from 'SRC/pages/Exception/404';

import style from './layout.scss';
import Navbar from './Navbar';
import SiderMenu from './SiderMenu';

const { Header, Sider, Content } = Layout;

class LayoutHome extends Component {
  constructor(props) {
    super(props);
    this.getRouteData = this.props.getRouteData;
  }

  render() {
    return (
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
            <Switch>
              {
                this.getRouteData('LayoutHome').map((item) => (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    render={() => {
                      const Comp = item.component;
                      return <Comp />;
                    }}
                  />
                ))
              }
              <Redirect
                exact
                from="/"
                to="/dashboard"
              />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>);
  }
}

LayoutHome.propTypes = {
  getRouteData: PropTypes.func.isRequired,
};

export default LayoutHome;
