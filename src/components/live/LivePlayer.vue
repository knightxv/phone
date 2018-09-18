<template>
<div>
  <mt-header>
    <mt-button @click="$router.back()" icon="back" slot="left">返回</mt-button>
  </mt-header>
  <div class="player-box"></div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LivePlayer extends Vue {
}
</script>

<style scoped lang="less">
.player-box {
  background: black;
  height: 200px;
}
</style>