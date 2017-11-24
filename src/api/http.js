import axios from 'axios';
import { message } from 'antd';
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

  post({ url, params }) {
    return axios
      .post(this.prefix + url, params)
      .then(({ data }) => {
        message.success(JSON.stringify(data));
        return data;
      })
      .catch(({ response }) => {
        switch (response.status) {
          case INTERCEPTOR_STATUS.UNAUTHORIZED:
            return store.setUnAuth();
          case INTERCEPTOR_STATUS.AUTHORIZED_EXPIRED:
            return store.setExpireAuth();
          default:
            return Promise.reject(response);
        }
      });
  }
}

const request = new Request();

export default request;
