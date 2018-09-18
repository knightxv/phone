<template>
<div>wechat login</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiAccount from '@/services/account';
import { Mutation } from 'vuex-class';
import { UPDATE_USER_INFO } from '../../stores/mutation-types';
@Component
export default class WechatLogin extends Vue {
  @Mutation UPDATE_USER_INFO!: (userInfo: any) => {};
  mounted() {
    const code = this.$route.query.code;
    if (code == null) {
      this.goHomePage();
      return;
    }
    this.wechatLogin(code);
  }
  async wechatLogin(code: string) {
    const res = await ApiAccount.wechatLogin(code);
    if (!res.isSuccess) {
      this.goHomePage();
      return;
    }
    this.UPDATE_USER_INFO(res.data);
    this.goHomePage();
  }
  goHomePage() {
    this.$router.push('/home/match');
  }
}
</script>

<style scoped lang="less">
</style>