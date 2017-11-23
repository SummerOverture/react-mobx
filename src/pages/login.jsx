import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, message, Row } from 'antd';
import style from 'STYLE/login.scss';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import apiAuth from '@/api/auth';

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
    this.handleClick = this.handleClick.bind(this);
    this.uiStore = new UiStore();
    this.store = props.authStore;
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
      .catch((e) => {
        message.error(JSON.stringify(e));
      })
      .then(() => {
        this.uiStore.setLogin(false);
      });
  }

  render() {
    return (
      <div className="container">
        <div className={style.header}>
          PLEASE LOG IN122132312eqw
        </div>
        <div className="body">
          <Row>
            <Col span={12}>
              this is left side
            </Col>
            <Col span={12}>
              <div className={style['login-form']}>
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
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

Login.wrappedComponent.propTypes = {
  authStore: PropTypes.object.isRequired,
};

Login.defaultProps = {
  history: {},
};

export default Login;
