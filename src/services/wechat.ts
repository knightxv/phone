import http from '@/app/http';

export default {
  getWechatConfig() {
    const url = window.location.href.split('#')[0];
    return http.get('/api-wechat/wechat/portal/createJsapiSignature', {
      url,
    });
  },
  getOAuth2Url(url: string) {
    return http.get('/api-wechat/wechat/portal/getOAuth2Url', {
      url,
    });
  },
};
