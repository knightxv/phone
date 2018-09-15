
import formatter from './formatter';
import * as typeDef from './typeDef';
import * as helps from './helps';
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
    }
}

export default new App();
