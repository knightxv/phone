<template>
<div>
  <mt-loadmore
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
  >
    <ul>
      <li v-for="item in 50" :key="item">{{ item }}</li>
    </ul>
  </mt-loadmore>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Match extends Vue {
  data() {
    return {
      allLoaded: false,
    };
  }
  loadTop() {
    console.log('refresh');
    (this.$refs.loadmore as any).onTopLoaded();
  }
  loadBottom() {
    console.log('scroll bottom');
    this.$data.allLoaded = true; // 若数据已全部获取完毕
    (this.$refs.loadmore as any).onBottomLoaded();
  }
}
</script>

<style scoped lang="less">
</style>