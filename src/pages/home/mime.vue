<template>
<div v-if="userInfo.accountDTO && userInfo.accountDTO.accountId">
  <div class="header-userinfo">
    <div class="flex">
      <div class="user-avatar">
        <router-link to="/user/editInfo">
          <app-net-img :imgUrl="userHeadImg" errorImgUrl="default_avatar" radius></app-net-img>
        </router-link>
      </div>
      <div class="user-info-wrap">
        <div class="user-info-name">{{ userName || '未知用户' }}</div>
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
<div v-else-if="userInfo.wxMpUserDTO && userInfo.wxMpUserDTO.openId" class="bind-phone-tip-container">
  <mt-button type="primary" @click="goWechatBindPhonePage">微信绑定手机</mt-button>
</div>
<div v-else class="bind-phone-tip-container">
  <mt-button type="primary" @click="goLoginPage">点击登陆</mt-button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MY_USER_INFO } from '@/stores/getters-types';
import { IUserListItem } from '@/services/apiDataType';
import { Getter, Action, State } from 'vuex-class';
@Component({
  computed: {
    userHeadImg() {
      const self = this as Mime;
      return self.myUserInfo.headImg || self.userInfo.wxMpUserDTO.headImgUrl;
    },
    userName() {
      const self = this as Mime;
      return self.myUserInfo.userName || self.userInfo.wxMpUserDTO.nickname;
    },
  },
})
export default class Mime extends Vue {
  @Getter(MY_USER_INFO) myUserInfo!: IUserListItem;
  @State userInfo!: any;
  goLoginPage() {
    this.$router.push('/login');
  }
  goWechatBindPhonePage() {
    this.$router.push('/wechat/bindPhone');
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
.bind-phone-tip-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>