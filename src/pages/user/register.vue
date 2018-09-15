<template>
  <div class="container">
    <div class="form-wrap">
      <mt-field label="昵称" placeholder="2-16个字符" v-model="form.wechatName"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" v-model="form.phoneNum">
        <mt-button @click="getVerifyCode" size="small" type="primary">获取验证码</mt-button>
      </mt-field>
      <mt-field label="短信验证码" placeholder="请输入短信验证码" v-model="form.idCode"></mt-field>
    </div>
    <div class="list-item register-btn-wrap">
      <mt-button @click="registerSubmit" size="large" type="primary">注册</mt-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IUserInfoState } from '../../stores/modules/userInfo';
import { Mutation, Action } from 'vuex-class';
import { UPDATE_USER_INFO } from '../../stores/mutation-types';
import { UPDATE_USER_ACCOUNT_INFO_ASYNC } from '@/stores/action-types';
import ApiCom from '@/services/common';
import ApiAccount from '@/services/account';
@Component
export default class Register extends Vue {
  @Mutation UPDATE_USER_INFO!: (userInfo: IUserInfoState) => {};
  @Action UPDATE_USER_ACCOUNT_INFO_ASYNC!: () => {};
  data() {
    return {
      form: {
        username: '',
        password: '',
        phoneNum: '',
        idCode: '',
      },
    };
  }
  async getVerifyCode() {
    const phoneNum = this.$data.form.phoneNum;
    if (!phoneNum) {
      return;
    }
    const res = await ApiCom.getPhoneIdCodeByRegister(phoneNum);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('获取成功');
  }
  async registerSubmit() {
    const res = await ApiAccount.register(this.$data.form);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('注册成功');
    this.UPDATE_USER_INFO(res.data);
    this.UPDATE_USER_ACCOUNT_INFO_ASYNC();
    this.$router.push('/home/match');
  }
}
</script>

<style scoped lang="less">
.form-wrap {
  margin-top: 15px;
}
.register-btn-wrap {
  margin-top: 30px;
}
</style>