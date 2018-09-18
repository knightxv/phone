<template>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiWechat from '@/services/wechat';
@Component
export default class Transfer extends Vue {
  mounted() {
     this.accordingToSystemToRouter();
  }
  accordingToSystemToRouter() {
    if (this.$app.helps.inWechatBrowser()) {
      this.jumpToWechatAuth();
      return;
    }
    this.$router.replace('/home/match');
  }
  async jumpToWechatAuth() {
    const originUrl = window.location.origin;
    const url = `${originUrl}/wechat/login`;
    const res = await ApiWechat.getOAuth2Url(url);
    if (!res.isSuccess) {
      this.$message.error('获取微信验证失败');
      this.$router.replace('/home/match');
      return;
    }
    const wechatAuthUrl = res.data;
    location.href = wechatAuthUrl;
  }
}
</script>

<style scoped lang="less">
</style>