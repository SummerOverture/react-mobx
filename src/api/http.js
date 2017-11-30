import axios from 'axios';
import { notification } from 'antd';
import store from 'SRC/store/authStore';

const INTERCEPTOR_STATUS = {
  UNAUTHORIZED: 401,
  AUTHORIZED_EXPIRED: 403,
};

class Request {
  constructor() {
    this.prefix = ENABLE_API_PROXY ? '/api' : '';
  }

  get(uri) {
    return axios.get(uri);
  }

  post({ url, data }) {
    return axios
      .post(this.prefix + url, data)
      .then((response) => response.data)
      .catch(({ response }) => {
        switch (response.status) {
          case INTERCEPTOR_STATUS.UNAUTHORIZED:
            return store.setUnAuth();
          case INTERCEPTOR_STATUS.AUTHORIZED_EXPIRED:
            return store.setExpireAuth();
          default:
            notification.error({
              message: `请求错误 ${response.status}: ${response.url}`,
              description: response.statusText,
            });
            return Promise.reject(response);
        }
      });
  }
}

const request = new Request();

export default request;
