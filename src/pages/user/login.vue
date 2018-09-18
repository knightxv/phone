<template>
  <div class="login-container">
    <div class="login-wrap">
      <app-local-img imgUrl="logo"></app-local-img>
    </div>
    <div class="form-wrap">
      <mt-field class="app-field" label="手机号" placeholder="请输入手机号" v-model="loginForm.phoneNum">
        <mt-button @click="getVerifyCode" size="small" type="primary">获取验证码</mt-button>
      </mt-field>
      <mt-field class="app-field" label="短信验证码" placeholder="请输入短信验证码" v-model="loginForm.idCode"></mt-field>
      <div class="list-item flex flex-end">
        <router-link to="/user/register">
          <p>注册新账号</p>
        </router-link>
      </div>
    </div>
    <div class="list-item">
      <mt-button @click="loginSubmit" size="large" type="primary">登陆</mt-button>
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
export default class Login extends Vue {
  @Mutation UPDATE_USER_INFO!: (userInfo: IUserInfoState) => {};
  @Action UPDATE_USER_ACCOUNT_INFO_ASYNC!: () => {};
  data() {
    return {
      loginForm: {
        phoneNum: '',
        idCode: '',
      },
    };
  }
  async getVerifyCode() {
    const { phoneNum } = this.$data.form;
    if (!phoneNum) {
      return;
    }
    const res = await ApiCom.getPhoneIdCodeByLogin(phoneNum);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('获取成功');
  }
  async loginSubmit() {
    const res = await ApiAccount.login(this.$data.loginForm);
    if (!res.isSuccess) {
      return;
    }
    this.UPDATE_USER_INFO(res.data);
    this.UPDATE_USER_ACCOUNT_INFO_ASYNC();
    this.$router.push('/home/match');
  }
}
</script>

<style scoped lang="less">
.app-field {
  background: #fcfaee40;
  input {
    background: none!important;
  }
}
.login-container {
  height: 100%;
  // background: #f3f3f3;
  background: url(../../app/assets/img/login_bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.login-wrap {
  width: 130px;
  margin: 0 auto;
  padding: 20px 0;
}
.form-wrap {
  margin-top: 50px;
}
</style>