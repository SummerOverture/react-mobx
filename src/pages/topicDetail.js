import React, { Component } from 'react';
import { Button, Col, Row } from 'antd';
import api from '@/api/getData';

class Test extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.match.params.id;
  }

  async handleClick() {
    const data = await api.getData('/');

    if (data) {
      this.props.history.replace('/login');
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={ 12 }>
            hello { this.name },
            the jobs is for u
          </Col>
          <Col span={ 12 }>
            <Button type="danger" onClick={ this.goBack.bind(this) }>
              go back
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Test;
