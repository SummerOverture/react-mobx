import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      this.time = true;
      const { default: component } = await importComponent();
      if (this.time) {
        this.setState({
          component,
        });
      }
    }

    componentWillUnmount() {
      this.time = false;
    }

    render() {
      const C = this.state.component;
      return C ? <C { ...this.props } /> : null;
    }
  }

  return AsyncComponent;
}
