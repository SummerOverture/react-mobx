import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import style from '@/style/login.scss';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('loginStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.loginStore;
  }

  handleClick() {
    this.store.setLogin(true);
    this.props.history.replace('/');
  }

  render() {
    return (
      <div className="container">
        <div className={ style.header }>
          PLEASE LOG IN
        </div>
        <div className="body">
          <Row>
            <Col span={ 12 }>
              this is left side
            </Col>
            <Col span={ 12 }>
              <div className={ style['login-form'] }>
                <Form>
                  <FormItem>
                    <Input type="text"/>
                  </FormItem>
                  <FormItem>
                    <Input type="password"/>
                  </FormItem>
                  <FormItem>
                    <Button onClick={ this.handleClick.bind(this) } type="primary">
                      LOG IN
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
