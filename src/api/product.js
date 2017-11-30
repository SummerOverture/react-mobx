import request from './http';

export default {
  getList(data) {
    return request.post({ url: '/product/getList', data });
  },
};
