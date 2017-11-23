import { message, Spin } from 'antd';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { useStrict } from 'mobx';
import { observer, Provider } from 'mobx-react';
import Routes from '@/routes';
// store
import authStore from '@/store/authStore';
import store from '@/store/common';

const stores = {
  authStore,
  commonStore: store,
};

useStrict(true);

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
    };
  }

  componentWillMount() {
    if (window.location.pathname !== '/login') {
      authStore
        .checkAuth()
        .then(() => {
          const { authState } = authStore;
          if (authState === 401) {
            message.error('身份校验失败，请登录');
            this.toLogin();
          } else if (authState === 403) {
            message.error('身份已过期，请重新登陆');
            this.toLogin();
          } else if (authState !== 200) {
            message.error('未知错误，请先登录');
            this.toLogin();
          }

          this.setInitial();
        });
    } else {
      this.setInitial();
    }
  }

  setInitial() {
    this.setState({
      initial: true,
    });
  }

  toLogin() {
    window.location.pathname.replace('/login');
  }

  render() {
    return (
      <Provider {...stores}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{stores.commonStore.title}</title>
            <link
              rel="shortcut icon"
              href="/favicon.ico"
              type="image/vnd.microsoft.icon"
            />
          </Helmet>
          {
            this.state.initial ? <Routes /> : <Spin />
          }
        </div>
      </Provider>
    );
  }
}

export default App;
