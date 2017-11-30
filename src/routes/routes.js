import React from 'react';
import asyncComponent from 'SRC/components/AsyncImport';
import NoAuth from 'SRC/pages/Exception/403';

export default [
  {
    path: '/',
    exact: false,
    layout: 'LayoutHome',
    component: asyncComponent(() => import('SRC/components/Layout')),
    children: [
      {
        path: '/403',
        component: () => <NoAuth />,
      },
      {
        path: '/dashboard',
        component: asyncComponent(() => import('SRC/pages/Dashboard')),
      },
      {
        path: '/about',
        component: asyncComponent(() => import('SRC/pages/About')),
      },
      {
        path: '/product/index',
        component: asyncComponent(() => import('SRC/pages/Product')),
      },
    ],
  },
];
