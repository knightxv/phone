import Vue from 'vue';
import { Commit } from 'vuex';
import { UPDATE_MY_USER_INFO, UPDATE_USER_INFO, UPDATE_USER_WECHAT_INFO } from '../mutation-types';
import { TOKEN, MY_USER_INFO, MY_WECHAT_INFO } from '../getters-types';
import { UPDATE_USER_ACCOUNT_INFO_ASYNC } from '../action-types';
import { IUserListItem, IWechatInfo } from '../../services/apiDataType';
import ApiUser from '@/services/user';
export interface IUserInfoState {
  token: string;
  accountDTO: IUserListItem | null;
  wxMpUserDTO: IWechatInfo | null;
}
interface IStore {
    commit: Commit;
    state: IUserInfoState;
}

export default {
    state: {
      token: '',
      accountDTO: null,
      wxMpUserDTO: null,
    } as IUserInfoState,
    mutations: {
      [UPDATE_MY_USER_INFO](state: IUserInfoState, newUserInfo: IUserListItem) {
        state.accountDTO = {
          ...state.accountDTO,
          ...newUserInfo,
        };
      },
      [UPDATE_USER_INFO](state: IUserInfoState, newUserInfo: IUserInfoState) {
          // tslint:disable-next-line:forin
          for (const attr in newUserInfo) {
              Vue.set(state, attr, (newUserInfo as any)[attr]);
          }
      },
      [UPDATE_USER_WECHAT_INFO](state: IUserInfoState, wxMpUserDTO: IWechatInfo) {
        console.log('UPDATE_USER_WECHAT_INFO', wxMpUserDTO);
        Vue.set(state, 'wxMpUserDTO', wxMpUserDTO);
      },
    },
    actions: {
      async [UPDATE_USER_ACCOUNT_INFO_ASYNC]({ commit }: IStore) {
        const res = await ApiUser.getUserInfo();
        if (!res.data) {
          return;
        }
        commit(UPDATE_MY_USER_INFO, res.data);
      },
      // async [LOGOUT]({ commit }: IStore) {
      //   await ApiLogin.logout();
      //   commit(UPDATE_USER_INFO, {
      //       token: '',
      //       router: [],
      //       user: {
      //           username: '',
      //       },
      //   });
      // },
    },
    getters: {
      [TOKEN](state: IUserInfoState): string {
        return state.token;
      },
      [MY_USER_INFO](state: IUserInfoState): IUserListItem | any {
          return state.accountDTO || {};
      },
      [MY_WECHAT_INFO](state: IUserInfoState): IWechatInfo | any {
          return state.wxMpUserDTO || {};
      },
    },
};
