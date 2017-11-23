import React, { Component } from 'react';
import style from 'STYLE/layout.scss';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

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
        <Breadcrumb.Item key={url}>
          <span onClick={() => this.navigate(url)}>{breadcrumbNameMap[url]}</span>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      (
        <Breadcrumb.Item key="about">
          <span onClick={() => this.navigate('/about')}>Home</span>
        </Breadcrumb.Item>
      ),
    ].concat(extraBreadcrumbItems);
    return (
      <div className={style.navbar}>
        <div className={style['layout-bread']}>
          {
            breadcrumbItems
          }
        </div>
        <div className={style['auth-menu']}>
          欢迎您 {this.nickName}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  authStore: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

Navbar.defaultProps = {
  authStore: {},
  history: {},
  location: {},
};

export default Navbar;
