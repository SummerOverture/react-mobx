import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './exception.scss';

class Exception extends Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.message = props.message;
  }

  render() {
    return (
      <div className={style.wrap}>
        <h2 className={style.font}>
          {this.type}
        </h2>

        <span>{this.message}</span>
      </div>
    );
  }
}

Exception.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
};

Exception.defaultProps = {
  message: '',
};

export default Exception;
