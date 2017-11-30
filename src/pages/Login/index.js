import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.params = props.match.params.params;
    setTimeout(() => {
      this.props.history.push('/');
    }, 2000);
  }

  render() {
    return (
      <div>
        <div>您的参数是：{this.params}</div>
        即将跳转
      </div>
    );
  }
}

Login.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Login;
