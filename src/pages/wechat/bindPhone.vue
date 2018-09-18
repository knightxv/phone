<template>
  <div class="container">
    <div class="form-wrap">
      <mt-field class="app-field" label="手机号" placeholder="请输入手机号" v-model="form.phoneNum">
        <mt-button @click="getVerifyCode" size="small" type="primary">获取验证码</mt-button>
      </mt-field>
      <mt-field class="app-field" label="短信验证码" placeholder="请输入短信验证码" v-model="form.idCode"></mt-field>
      <div class="list-item flex flex-end">
        <router-link to="/user/register">
          <p>注册新账号</p>
        </router-link>
      </div>
    </div>
    <div class="list-item">
      <mt-button :disabled="!form.phoneNum || !form.idCode" @click="submit" size="large" type="primary">绑定</mt-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiCom from '@/services/common';
import ApiAccount from '@/services/account';
import { Getter, Mutation, Action } from 'vuex-class';
import { MY_WECHAT_INFO } from '@/stores/getters-types';
import { UPDATE_USER_ACCOUNT_INFO_ASYNC } from '@/stores/action-types';
import { UPDATE_USER_INFO } from '@/stores/mutation-types';
import { IWechatInfo } from '@/services/apiDataType';
@Component
export default class WechatBindPhone extends Vue {
  @Getter(MY_WECHAT_INFO) wechatInfo!: IWechatInfo;
  @Mutation UPDATE_USER_INFO!: (userInfo: any) => {};
  @Action UPDATE_USER_ACCOUNT_INFO_ASYNC!: () => {};
  data() {
    return {
      form: {
        phoneNum: '',
        idCode: '',
      },
    };
  }
  async submit() {
    const { phoneNum, idCode } = this.$data.form;
    const res = await ApiAccount.bindingPhone({
      idCode,
      phoneNum,
      smsType: 'WX_BINDING_ACCOUNT',
      systemType: 'LIVEAPP',
      wechatHeadImg: this.wechatInfo.headImgUrl,
      wechatId: this.wechatInfo.openId,
      wechatName: this.wechatInfo.nickname,
    });
    if (!res.isSuccess) {
      this.$message.error('绑定失败，试试注册新号?');
      return;
    }
    this.$message.success('绑定成功');
    this.UPDATE_USER_INFO(res.data);
    this.UPDATE_USER_ACCOUNT_INFO_ASYNC();
    this.$router.push('/home/match');
  }
  async getVerifyCode() {
    const { phoneNum } = this.$data.form;
    if (!phoneNum) {
      return;
    }
    const res = await ApiCom.getPhoneIdCodeByWechatBindPhone(phoneNum);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('获取成功');
  }
}
</script>

<style scoped lang="less">
.container {
  padding-top: 30px;
}
</style>