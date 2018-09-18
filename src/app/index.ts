
import formatter from './formatter';
import * as typeDef from './typeDef';
import * as helps from './helps';
import * as wechat from './wechat';
import config from './config';
import AppUploadImg from './component/AppUploadImg.vue';
import AppNetImg from './component/AppNetImg.vue';
import AppLocalImg from './component/AppLocalImg.vue';
import AppIcon from './component/AppIcon.vue';
import { Toast } from 'mint-ui';

// export default {
//     formatter,
// }
class App {
    install(Vue: any, options: any) {
        Vue.prototype.$app = {
            formatter,
            typeDef,
            config,
            helps,
            wechat,
        };
        Vue.prototype.$message = {
          success(message: string) {
            Toast({
              message,
            });
          },
          error(message: string) {
            Toast({
              message,
            });
          },
        };
        Vue.component('app-upload-img', AppUploadImg);
        Vue.component('app-net-img', AppNetImg);
        Vue.component('app-local-img', AppLocalImg);
        Vue.component('app-icon', AppIcon);

        Vue.directive('init-parent-height', {
          update(el: any) {
            console.log(el.parentNode.offsetHeight);
            el.style.height = el.parentNode.offsetHeight + 'px';
          },
        });
    }
}

export default new App();
