import request from './http';

export default {
  checkAuth() {
    return request.post({ url: '/login/checkAuth' });
  },

  login() {
    return request.post({ url: '/login' });
  },
};
