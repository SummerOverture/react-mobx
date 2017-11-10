import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'antd';

class Test extends Component {
  async handleClick() {
    const data = await axios.post('/api/');

    if (data) {
      this.props.history.replace('/login');
    }
  }

  render() {
    return (
      <div>
        <Button type="error" onClick={ () => this.handleClick() }>
          this is slot
        </Button>
        <div> this is a test page 1w</div>
      </div>
    );
  }
}

export default Test;
