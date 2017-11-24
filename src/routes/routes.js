import { Redirect } from 'react-router-dom';
import React from 'react';
import asyncComponent from 'SRC/components/AsyncImport';

export default [
  {
    path: '/login',
    name: '登录',
    component: asyncComponent(() => import('SRC/pages/login')),
  },
  {
    path: '/',
    exact: false,
    name: '首页',
    component: (data) => {
      if (data.location.pathname !== '/login' && data.authStore.authState !== 200) {
        return <Redirect to="/login" />;
      }
      const Layout = asyncComponent(() => import('SRC/components/Layout'));
      return <Layout {...data} />;
    },
    route: [
      {
        path: '/about',
        name: '关于',
        component: asyncComponent(() => import('SRC/pages/About')),
      },
    ],
  },
];
