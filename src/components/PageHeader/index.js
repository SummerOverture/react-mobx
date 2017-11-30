import React, { Component } from 'react';
import { Breadcrumb, Card } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { peersMenus } from 'SRC/components/Layout/menuConfig';

import style from './pageHeader.scss';

@withRouter
class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  getAllHistory() {
    const { location } = this.props;
    const breadcrumbNameMap = peersMenus;
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const { name } = breadcrumbNameMap.find((item) => item.url === url);
      return (
        <Breadcrumb.Item key={url}>
          <span
            style={{ color: 'rgba(0, 0, 0, 0.45)' }}
            onClick={() => this.navigate(url)}
          >
            {name}
          </span>
        </Breadcrumb.Item>
      );
    });

    return [
      (
        <Breadcrumb.Item key="dashboard">
          <span onClick={() => this.navigate('/dashboard')}>首页</span>
        </Breadcrumb.Item>
      ),
    ].concat(extraBreadcrumbItems);
  }

  navigate(url) {
    this.props.history.replace(url);
  }

  render() {
    const Bread = this.getAllHistory();
    return (
      <Card
        noHovering
        className={style['content-page-header']}
      >
        {Bread}
        {this.props.children}
      </Card>
    );
  }
}

PageHeader.WrappedComponent.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.any,
};

PageHeader.defaultProps = {
  children: false,
};

export default PageHeader;
