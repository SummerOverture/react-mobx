import Request from './http';

export default {
  getData(data) {
    return Request.post({ url: '/login', data });
  },
};
