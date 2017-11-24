import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import routes from 'SRC/routes/routes';
import { withRouter } from 'react-router-dom';

@withRouter
class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.location = props.location;
  }

  getAllHistory() {
    const { location } = this.props;
    const breadcrumbNameMap = this.loopRoute(routes);
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <span
            style={{ color: 'rgba(0, 0, 0, 0.45)' }}
            onClick={() => this.navigate(url)}
          >
            {breadcrumbNameMap[url]}
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

  loopRoute(route) {
    let result = {};
    route.forEach((item) => {
      result[item.path] = item.name;

      if (item.route) {
        const childRoute = this.loopRoute(item.route);
        result = Object.assign({}, result, childRoute);
      }
    });
    return result;
  }

  navigate(url) {
    this.props.history.replace(url);
  }

  render() {
    return this.getAllHistory();
  }
}

PageHeader.WrappedComponent.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default PageHeader;
