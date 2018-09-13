<template>
<div>
  <mt-header title="">
    <mt-button @click="$router.back()" icon="back" slot="left">返回</mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <router-view></router-view>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavbarLayout extends Vue {
}
</script>

<style scoped lang="less">
</style>