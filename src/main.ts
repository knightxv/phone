import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/store';
import Fastclick from 'fastclick';
import './mint-ui/mint-ui';

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
}

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
