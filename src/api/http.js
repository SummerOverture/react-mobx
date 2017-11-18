import axios from 'axios';

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
      .then(({ data }) => data);
  }
}

const request = new Request();

export default request;
