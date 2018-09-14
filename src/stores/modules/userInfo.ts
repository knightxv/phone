import Vue from 'vue';
import { Commit } from 'vuex';
import { UPDATE_MY_USER_INFO, UPDATE_USER_INFO } from '../mutation-types';
import { TOKEN, MY_USER_INFO } from '../getters-types';
import { UPDATE_USER_ACCOUNT_INFO_ASYNC } from '../action-types';
import { IUserListItem } from '../../services/apiDataType';
import ApiUser from '@/services/user';
export interface IUserInfoState {
  token: string;
  accountDTO: IUserListItem;
}
interface IStore {
    commit: Commit;
    state: IUserInfoState;
}

export default {
    state: {
      token: '',
      accountDTO: {},
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
      [MY_USER_INFO](state: IUserInfoState): IUserListItem {
          return state.accountDTO;
      },
    },
};
