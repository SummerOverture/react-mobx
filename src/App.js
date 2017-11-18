import { Spin } from 'antd';
import React, { Component } from 'react';
import store from '@/store/common';
import Helmet from 'react-helmet';
import loginState from '@/store/loginState';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import Routes from '@/routes';

const stores = {
  commonStore: store,
  loginStore: loginState,
};

useStrict(true);

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      initial: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      stores.loginStore.setLogin(true);
      this.setState({
        initial: true,
      });
    }, 1000);
  }

  render() {
    const AsyncRoutes = () => {
      if (this.state.initial) {
        return <Routes />;
      }
      return <Spin />;
    };
    return (
      <Provider { ...stores }>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{ stores.commonStore.title }</title>
            <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
          </Helmet>
          <AsyncRoutes />
        </div>
      </Provider>
    );
  }
}

export default App;
