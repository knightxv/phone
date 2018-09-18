import ApiWechat from '@/services/wechat';
const wx = window.wx;
const jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
// let isInitWechatSdkSuccess = false;
interface IShareData {
  /** 分享标题 */
  title: string;
  /** 分享标题 */
  desc: string;
  /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */
  link: string;
  /** 分享图标 */
  imgUrl: string;
}
export const initWechatSdk = async () => {
  const res = await ApiWechat.getWechatConfig();
  if (!res.isSuccess) {
    return;
  }
  const { appId, nonceStr, signature, timestamp } = res.data;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList, // 必填，需要使用的JS接口列表
  });
};
initWechatSdk();

export const updateShareData = (shareData: IShareData): Promise<boolean> => {
  return new Promise((resolve) => {
    // wx.updateAppMessageShareData(shareData, (res: any) => {
    //   console.log('updateShareData callBack', res);
    //   resolve(true);
    // });
    // wx.updateTimelineShareData(shareData);
    wx.ready(() => {
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
    });
  });
};
