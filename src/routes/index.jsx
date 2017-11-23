import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asyncComponent from '@/components/AsyncImport';
import { inject, observer } from 'mobx-react';
// import Fallback from '@/pages/fallback';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

@inject('authStore')
@observer
class Routes extends Component {
  constructor(props) {
    super(props);
    this.authStore = props.authStore;
  }

  loopChildren(result = [], route) {
    route.forEach((item, index) => {
      let child = null;
      const key = index + Math.random();
      if (item.route && item.route.length) {
        child = this.loopChildren([], item.route);
      }
      result.push(
        <Route
          key={key}
          path={item.path}
          exact={typeof item.exact === 'undefined' ? true : item.exact}
          render={(props) => (
            <item.component {...props}>
              {child}
            </item.component>)}
        />);
    });
    return (
      <Router>
        <Switch>
          {
            result
          }
        </Switch>
      </Router>
    );
  }

  routes = [
    {
      path: '/login',
      component: asyncComponent(() => import('@/pages/login')),
    },
    {
      path: '/',
      exact: false,
      component: (e) => {
        if (e.location.pathname !== '/login' && this.authStore.authState !== 200) {
          return <Redirect to="/login" />;
        }
        const Layout = asyncComponent(() => import('@/components/Layout/MainView'));
        return <Layout {...e} />;
      },
      route: [
        {
          path: '/about',
          component: () => <div>WELCOME HOME PAGE</div>,
        },
      ],
    },
  ];

  render() {
    return this.loopChildren([], this.routes);
  }
}

Routes.wrappedComponent.propTypes = {
  authStore: PropTypes.object.isRequired,
};

export default Routes;
