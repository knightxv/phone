import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/store';
import Fastclick from 'fastclick';
import './mint-ui/mint-ui';
import './app/assets/icon/iconfont.css';

// picture upload
import Croppa from 'vue-croppa';
Vue.use(Croppa);

import app from './app/index';
Vue.use(app);

// 兼容ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      Fastclick.attach(document.body);
    },
    false,
  );
  // 解决videojs下，重复点击问题
  const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0;
  const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  Fastclick.prototype.needsClick = (target: any) => {
    switch (target.nodeName.toLowerCase()) {
      // Don't send a synthetic click to disabled inputs (issue #62)
      case 'button':
      case 'select':
      case 'textarea':
        if (target.disabled) {
          return true;
        }
        break;
      case 'input':
        // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
        if ((deviceIsIOS && target.type === 'file') || target.disabled) {
          return true;
        }
        break;
      case 'label':
      case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
      case 'video':
        return true;
    }
    return (/\bneedsclick\b/).test(target.className) || /\bvjs/.test(target.className);
  };
}

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
