import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { action, observable } from 'mobx';
import apiAuth from 'SRC/api/auth';

const FormItem = Form.Item;

class UiStore {
  @observable loading = false;

  @action
  setLogin(val) {
    this.loading = val;
  }
}

@inject('authStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.uiStore = new UiStore();
    this.store = props.authStore;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.uiStore.setLogin(true);
    apiAuth
      .login()
      .then((data) => {
        this.store.setUserInfo(data);
        this.store.setAuthState(200);
        this.props.history.push('/');
      })
      .catch((e) => {
        message.error(JSON.stringify(e));
      })
      .then(() => {
        this.uiStore.setLogin(false);
      });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 200 }}>
          <Row>
            <Col span={12}>
              <Col span={12} />
              <pre>
                无需输入账号密码
                点击登录即可
              </pre>
            </Col>
            <Col span={12}>
              <Col span={12}>
                <Form>
                  <FormItem>
                    <Input type="text" />
                  </FormItem>
                  <FormItem>
                    <Input type="password" />
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      loading={this.uiStore.loading}
                      onClick={this.handleClick}
                    >
                      LOG IN
                    </Button>
                  </FormItem>
                </Form>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

Login.wrappedComponent.propTypes = {
  authStore: PropTypes.object.isRequired,
};

export default Login;
