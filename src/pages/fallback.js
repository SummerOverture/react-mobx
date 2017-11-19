import React, { Component } from 'react';
import { message } from 'antd';

export default class Forbidden extends Component {
  componentDidMount() {
    setTimeout(() => {
      message.error('u have no permission');
      this.props.history.push('/login');
    }, 0);
  }

  render() {
    return <div>u have no permission</div>;
  }
}
