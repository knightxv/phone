import Vue from 'vue';
import { Commit } from 'vuex';
import { UPDATE_MY_USER_INFO, UPDATE_USER_INFO } from '../mutation-types';
import { TOKEN, MY_USER_INFO } from '../getters-types';
import { IUserListItem } from '../../services/apiDataType';

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
