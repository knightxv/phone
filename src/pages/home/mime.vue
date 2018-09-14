<template>
<div>
  <div class="header-userinfo">
    <div class="flex">
      <div class="user-avatar">
        <router-link to="/user/editInfo">
          <app-net-img :imgUrl="myUserInfo.headImg" radius></app-net-img>
        </router-link>
      </div>
      <div class="user-info-wrap">
        <div class="user-info-name">{{ myUserInfo.wechatName || '无名者2222' }}</div>
        <div class="role-tag">球迷</div>
      </div>
    </div>
  </div>
  <div class="possessions-info-module module-item">
    <mt-cell title="我的钱包" value="余额:0.0金币" is-link></mt-cell>
    <mt-cell title="我的竞猜" value="积分:0" is-link></mt-cell>
    <mt-cell title="实名认证" value="未认证" is-link></mt-cell>
  </div>
  <div class="helper-info-module module-item">
    <mt-cell title="新手帮助" is-link></mt-cell>
    <router-link to="/help/feedback">
      <mt-cell title="意见反馈" is-link></mt-cell>
    </router-link>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MY_USER_INFO } from '@/stores/getters-types';
import { IUserListItem } from '@/services/apiDataType';
import { Getter, Action, State } from 'vuex-class';
@Component
export default class Mime extends Vue {
  @Getter(MY_USER_INFO) myUserInfo!: IUserListItem;
  created() {
    console.log(this.myUserInfo);
  }
}
</script>

<style scoped lang="less">
.user-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 30px 20px;
  position: relative;
}
.header-userinfo {
  background: url("../../app/assets/img/mime_header_bg.jpg");
  color: #fff;
}
.user-info-name {
  padding-bottom: 20px;
}
.module-item {
  margin-top: 20px;
}
.role-tag {
  font-size: 24px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #fff;
  text-align: center;
  display: inline-block;
}
// .possessions-info-module {
//   margin-top: 20px;
// }
</style>