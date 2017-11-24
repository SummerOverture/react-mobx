import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './exception.scss';

class Exception extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
  }

  render() {
    return (
      <div className={style.wrap}>
        <h2 className={style.font}>
          {this.type}
        </h2>
      </div>
    );
  }
}

Exception.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Exception;
