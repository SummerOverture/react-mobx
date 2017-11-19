import React, { Component } from 'react';
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
        const Layout = asyncComponent(() => import('@/components/Layout'));
        return <Layout { ...e } />;
      },
      route: [
        {
          path: '/about',
          component: asyncComponent(() => import('@/pages/test')),
        }, {
          name: 'topic A',
          path: '/topics/:id',
          component: asyncComponent(() => import('@/pages/topicDetail')),
        }, {
          path: '/topics',
          component: asyncComponent(() => import('@/pages/topics')),
          route: [{
            name: 'topic B',
            path: '/topics/asd/:id',
            component: () => (<div>123</div>),
          }],
        },
      ],
    },

  ];

  loopChildren(result = [], route) {
    route.forEach((item, index) => {
      let child = null;

      if (item.route && item.route.length) {
        child = this.loopChildren([], item.route);
      }
      result.push(
        <Route key={ index + Math.random() }
               path={ item.path }
               exact={ typeof item.exact === 'undefined' ? true : item.exact }
               render={ (props) => <item.component children={ child } { ...props } /> }>
        </Route>);
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

  getRoutes() {
    return this.loopChildren([], this.routes);
  }

  render() {
    const AllRoute = this.getRoutes();
    return (
      <div>
        <ul>
          {
            AllRoute
          }
        </ul>
      </div>
    );
  }
}

export default Routes;
