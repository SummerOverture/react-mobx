import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Forbidden.propTypes = {
  history: PropTypes.object,
};

Forbidden.defaultProps = {
  history: {},
};
