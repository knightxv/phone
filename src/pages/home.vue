<template>
  <div class="container">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUserInfoState } from '../stores/modules/userInfo';
import { Getter, Action, State } from 'vuex-class';
// import { MY_USER_NAME } from '../stores/getters-types';
import ApiMatch from '@/services/match';

@Component
export default class Home extends Vue {
  @State('userInfo') userInfo!: IUserInfoState;
  public data() {
    return {
      selected: '344',
    };
  }
  public created() {
    this.getMatchs();
  }
  async getMatchs() {
    const params = {
      pageSize: 10,
      pageNum: 0,
    };
    const res = await ApiMatch.matchs(params);
  }
}
</script>
