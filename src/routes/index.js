import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import deepCopy from 'SRC/utils/deepCopy';
import getPlainNode from 'SRC/utils/utils';
import routeData from './routes';
import asyncComponent from '../components/AsyncImport';

function getRouteData(navData, path) {
  if (!navData.some((item) => item.layout === path) ||
    !(navData.filter((item) => item.layout === path)[0].children)) {
    return null;
  }
  const route = deepCopy(navData.filter((item) => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some((item) => item.layout === path) ||
    !(navData.filter((item) => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter((item) => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

@inject('authStore')
@observer
class Routes extends Component {
  constructor(props) {
    super(props);
    this.authStore = props.authStore;
    this.passProps = {
      routeData,
      getRouteData: (path) => getRouteData(routeData, path),
    };
  }

  render() {
    const Layout = getLayout(routeData, 'LayoutHome').component;
    return (
      <Router>
        <Switch>
          <Route
            path="/login/:params"
            component={asyncComponent(() => import('SRC/pages/Login'))}
          />
          <Route
            path="/"
            render={(props) => <Layout {...props} {...this.passProps} />}
          />
        </Switch>
      </Router>
    );
  }
}

Routes.wrappedComponent.propTypes = {
  authStore: PropTypes.object.isRequired,
};

export default Routes;
