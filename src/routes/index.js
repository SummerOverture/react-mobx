import React from 'react';
import asyncComponent from '@/components/AsyncImport';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import loginStore from '@/store/loginState';

const routes = [
  {
    path: '/login',
    component: asyncComponent(() => import('@/pages/login')),
  },
  {
    path: '/',
    component: (e) => {
      if (e.location.pathname === '/login' || !loginStore.login) {
        return <Redirect to={ {
          pathname: '/login',
        } } />;
      }
      const Layout = asyncComponent(() => import('@/components/Layout'));
      return <Layout { ...e } />;
    },
    route: [
      {
        path: '/about',
        component: asyncComponent(() => import('@/pages/test')),
      }, {
        path: '/topics',
        component: asyncComponent(() => import('@/pages/topics')),
        route: [{
          name: 'topic A',
          path: '/topics/a',
          component: () => (<div>456</div>),
        }, {
          name: 'topic B',
          path: '/topics/asd/:id',
          component: () => (<div>123</div>),
        }],
      },
    ],
  },
];

const loopChildren = (result = [], route) => {
  route.forEach((item, index) => {
    let child = null;

    if (item.route && item.route.length) {
      child = loopChildren([], item.route);
    }
    result.push(<Route key={ index + Math.random() }
                       path={ item.path }
                       exact={ item.exact }
                       render={ (props) => <item.component children={ child } { ...props } />
                       }>
    </Route>);
  });
  return (
    <Switch>
      {
        result
      }
    </Switch>
  );
};

const getRoutes = (route) => {
  const result = loopChildren([], route);
  return result;
};

const Allroute = getRoutes(routes);
export default () => <Router>
  <div>
    <ul>
      {
        Allroute
      }
    </ul>
  </div>
</Router>;
