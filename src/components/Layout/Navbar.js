import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import style from './layout.scss';

@inject('authStore')
@withRouter
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.nickName = props.authStore.nickName;
  }

  navigate(url) {
    this.props.history.replace(url);
  }

  render() {
    return (
      <div className={style.navbar}>
        <div className={style['auth-menu']}>
          欢迎您 {this.nickName}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  authStore: PropTypes.object,
  history: PropTypes.object,
};

Navbar.defaultProps = {
  authStore: {},
  history: {},
};

export default Navbar;
