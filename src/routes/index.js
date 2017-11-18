import React, { Component } from 'react';
import asyncComponent from '@/components/AsyncImport';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

@inject('loginStore')
@observer
class Routes extends Component {
  constructor(props) {
    super(props);
    this.loginStore = props.loginStore;
  }

  routes = [
    {
      path: '/login',
      component: asyncComponent(() => import('@/pages/login')),
    },
    {
      path: '/',
      component: (e) => {
        if (e.location.pathname === '/login' || !this.loginStore.login) {
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
            path: '/topics/:id',
            component: asyncComponent(() => import('@/pages/topicDetail')),
          }, {
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
               exact={ item.exact }
               render={ (props) => <item.component children={ child } { ...props } /> }>
        </Route>);
    });
    return (
      <Switch>
        {
          result
        }
      </Switch>
    );
  }

  render() {
    const AllRoute = this.loopChildren([], this.routes);
    return (<Router>
      <div>
        <ul>
          {
            AllRoute
          }
        </ul>
      </div>
    </Router>);
  }
}

export default Routes;
