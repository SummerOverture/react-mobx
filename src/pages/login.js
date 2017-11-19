import React, { Component } from 'react';
import { Row, Col, Form, message, Input, Button } from 'antd';
import style from '@/style/login.scss';
import apiAuth from '@/api/auth';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

class UiStore {
  @observable loading = false;

  @action setLogin(val) {
    this.loading = val;
  }
}

@inject('authStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.uiStore = new UiStore();
    this.store = this.props.authStore;
  }

  handleClick() {
    this.uiStore.setLogin(true);
    apiAuth
      .login()
      .then((data) => {
        this.store.setUserInfo(data);
        this.store.setAuthState(200);
        this.props.history.push('/about');
      })
      .catch(() => {
        message.error('请求失败');
      })
      .then(() => {
        this.uiStore.setLogin(false);
      });
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
                    <Input type="text" />
                  </FormItem>
                  <FormItem>
                    <Input type="password" />
                  </FormItem>
                  <FormItem>
                    <Button loading={ this.uiStore.loading } onClick={ this.handleClick.bind(this) } type="primary">
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
