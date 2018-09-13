import http from '@/app/http';

export default {
  // uploadImage() {
  //   const imgFormData = {};
  //   return http.post('/upload/image/admin', {
  //     file: imgFormData,
  //   });
  // },
  getPhoneIdCode(phoneNum: string, smsType: string) {
    return http.post('/api-common-server/phoneSms/getPhoneIdCode', {
      phoneNum,
      smsType,
      systemType: 'LIVEAPP', // LIVEAPP, ACCOUNT
    });
  },
  getPhoneIdCodeByRegister(phoneNum: string) {
    return this.getPhoneIdCode(phoneNum, 'ADD_ACCOUNT');
  },
  getPhoneIdCodeByLogin(phoneNum: string) {
    return this.getPhoneIdCode(phoneNum, 'ADD_ACCOUNT');
  },
};
