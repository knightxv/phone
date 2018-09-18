import http from '@/app/http';

export default {
  uploadImage(file: File) {
    const imgFormData = new FormData();
    imgFormData.append('file', file);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data'},
    };
    return http.post('/api-common-server/upload/image/LIVEAPP', imgFormData, config);
  },
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
  getPhoneIdCodeByWechatBindPhone(phoneNum: string) {
    return this.getPhoneIdCode(phoneNum, 'WX_BINDING_ACCOUNT');
  },
};
