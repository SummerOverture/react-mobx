/* eslint-disable global-require */
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import './style/app.scss';
import App from './App';

if (process.env === 'development') {
  const RedBox = require('redbox-react').default;
  const { AppContainer } = require('react-hot-loader');

  const render = (Component) => {
    ReactDOM.render(
      <AppContainer
        errorReporter={({ error }) => <RedBox error={error} />}
        warnings={false}
      >
        <Component />
      </AppContainer>,
      document.getElementById('app'),
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('./App', () => {
      render(App);
    });
  }
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
}

