import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asyncComponent from 'SRC/components/AsyncImport';
import { inject, observer } from 'mobx-react';
// import Fallback from 'SRC/pages/fallback';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';

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
            <item.component {...props} authStore={this.authStore}>
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
          <Route component={asyncComponent(() => import('SRC/pages/Exception/404'))} />
        </Switch>
      </Router>
    );
  }

  render() {
    return this.loopChildren([], routes);
  }
}

Routes.wrappedComponent.propTypes = {
  authStore: PropTypes.object.isRequired,
};

export default Routes;
