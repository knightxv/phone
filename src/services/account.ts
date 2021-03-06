import http from '@/app/http';

export default {
  register(params: {
    idCode: string,
    phoneNum: string,
  }) {
    return http.post('/api-account/appAccount/phoneAdd', {
      smsType: 'ADD_ACCOUNT',
      systemType: 'LIVEAPP', // LIVEAPP, ACCOUNT
      ...params,
    });
  },
  login(params: {
    idCode: string,
    phoneNum: string,
  }) {
    return http.post('/api-account/appAccount/phoneLogin', {
      smsType: 'LOGIN_ACCOUNT',
      systemType: 'LIVEAPP', // LIVEAPP, ACCOUNT
      ...params,
    });
  },
  getAccountInfo() {
    return http.get('/api-account/appAccount/getAccountInfo');
  },
};
