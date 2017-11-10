import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const { Header, Sider, Content } = Layout;

@inject('commonStore')
@withRouter
@observer
class LayoutDemo extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.commonStore;
    this.navigate = this.navigate.bind(this);
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
      <Breadcrumb.Item key="home">
        <a onClick={ () => this.navigate('home') }>Home</a>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
      <Layout>
        <Sider
          trigger={ null }
          collapsible
          collapsed={ this.state.collapsed }
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header onClick={ () => this.handleSuccess() } style={ { background: '#fff', padding: 0 } }>
            <Icon
              className="trigger"
              type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
              onClick={ this.toggle }
            />
          </Header>
          <Content
            className="layout"
            style={ {
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            } }>
            { breadcrumbItems }
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutDemo;
