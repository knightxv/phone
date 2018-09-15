<template>
<div class="container">
  <div class="list-container">
    <div>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :autoFill="false"
      >
        <div class="loadmore-body">
          <div
            v-for="item in matchs"
            :key="item.id"
            class="live-list-item"
          >
            fff
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
@Component
export default class Live extends Vue {
  data() {
    return {
      allLoaded: false,
      loading: false,
      matchs: [],
      pageNum: 0,
      pageSize: 6,
    };
  }
  async loadTop() {
    console.log('refresh');
    this.$data.pageNum = 0;
    this.$data.allLoaded = false;
    this.$data.matchs = [];
    await this.getMatchs();
    (this.$refs.loadmore as any).onTopLoaded();
  }
  async loadBottom() {
    console.log('loadBottom');
    await this.getMatchs();
    (this.$refs.loadmore as any).onBottomLoaded();
  }
  mounted() {
    this.getMatchs();
  }
  async getMatchs() {
    if (this.$data.loading) {
      return;
    }
    const params = {
      pageNum: this.$data.pageNum,
      pageSize: this.$data.pageSize,
    };
    this.$data.loading = true;
    const res = await ApiMatch.matchs(params);
    if (!res.isSuccess) {
      return;
    }
    this.$data.loading = false;
    const matchs = res.data.data;
    this.$data.matchs = [...this.$data.matchs, ...matchs];
    console.log('load', this.$data.matchs.length, res.data.total);
    if (this.$data.matchs.length >= res.data.total) {
      this.$data.allLoaded = true;
    }
    this.$data.pageNum ++;
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
@import url('../../main.less');
.container {
  display: flex;
  flex-direction: column;
}
.list-container {
  flex: 1;
  overflow: auto;
}
.loadmore-body {
  padding: 15px;
  box-sizing: border-box;
}
.icon {
  font-size: 42px;
}
.live-list-item {
  position: relative;
  height: 200px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
</style>