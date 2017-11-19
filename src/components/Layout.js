import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import style from 'STYLE/layout.scss';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const { Header, Sider, Content } = Layout;

@inject('authStore')
@withRouter
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.nickName = props.authStore.nickName;
  }

  navigate(url) {
    this.props.history.replace(url);
  }

  render() {
    const { location } = this.props;
    const breadcrumbNameMap = {
      '/': '首页',
      '/about': '关于我们',
      '/topics': '文章',
    };
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={ url }>
          <a onClick={ () => this.navigate(url) }>{ breadcrumbNameMap[url] }</a>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="about">
        <a onClick={ () => this.navigate('/about') }>Home</a>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
      <div className={ style.navbar }>
        <div className={ style['layout-bread'] }>
          {
            breadcrumbItems
          }
        </div>
        <div className={ style['auth-menu'] }>
          欢迎您 { this.nickName }
        </div>
      </div>
    );
  }
}

@inject('commonStore')
@withRouter
@observer
class LayoutHome extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.commonStore;
  }

  componentDidMount() {
    this.store.setName(this.props.location.pathname);
  }

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider
          trigger={ null }
          collapsible
          collapsed={ this.state.collapsed }
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
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
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={ style['layout-header'] } style={ { background: '#fff', padding: 0 } }>
            <Icon
              className="trigger"
              type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
              onClick={ this.toggle }
            />
            <Navbar className={style.navbar} />
          </Header>
          <Content
            className="layout"
            style={ {
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            } }>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutHome;
