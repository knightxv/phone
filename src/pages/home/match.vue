<template>
<div>
  <mt-loadmore
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    key="b"
  >
    <div>
      <div v-for="item in 50" :key="item">{{ item }}</div>
    </div>
  </mt-loadmore>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Loadmore } from 'mint-ui';
@Component({
  components: {
    [Loadmore.name]: Loadmore,
  },
})
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
    console.log('scroll bottom', this.$refs.loadmore);
    this.$data.allLoaded = true; // 若数据已全部获取完毕
    (this.$refs.loadmore as any).onBottomLoaded();
  }
  mounted() {
    this.scrollToTop();
  }
  scrollToTop() {
    const scrollTarget = (this.$refs.loadmore as any).scrollEventTarget;
    if (!scrollTarget) {
      return;
    }
    scrollTarget.scrollTo(0, 0);
  }
}
</script>

<style scoped lang="less">
</style>