import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Spin } from 'antd';

const checkAuth = (path) => new Promise((res) => {
  if (path.includes('/about')) {
    setTimeout(() => {
      res();
    }, 1000);
  } else {
    res(true);
  }
});

export default function asyncComponent(importComponent) {
  @withRouter
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      this.time = true;
      this.setSpin();
      const result = await checkAuth(this.props.location.pathname);

      let component = null;
      if (result) {
        const { default: Comp } = await importComponent();
        component = Comp;
      } else {
        component = () => (<Redirect to="/403" />);
      }

      if (this.time) {
        this.renderComp(component);
      }
    }

    componentWillUnmount() {
      this.time = false;
    }

    setSpin() {
      this.setState({
        component: () => <Spin className="global-spin c-global-spin" />,
      });
    }

    renderComp(component) {
      this.setState({
        component,
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  AsyncComponent.WrappedComponent.propTypes = {
    location: PropTypes.object.isRequired,
  };

  return AsyncComponent;
}
