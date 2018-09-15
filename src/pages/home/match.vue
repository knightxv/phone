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
            @click="goMatchDetail(item.id)"
            class="match-list-item"
          >
            <div class="match-cover">
              <app-net-img :imgUrl="item.mainImage" errorImgUrl="match_cover"></app-net-img>
            </div>
            <div class="match-item-info-wrap">
              <div class="match-item-info-name">{{ item.matchName }}</div>
              <div class="flex space-between">
                <div class="flex">
                  <app-icon class="icon" name="time"></app-icon>{{ $app.helps.formatDateBySecTime(item.startMatchTime) }}
                </div>
                <!-- <div class="flex">
                  <app-icon class="icon" name="user"></app-icon>
                    {{ item.matchAddress }}
                </div> -->
                <div class="flex">
                  <app-icon class="icon" name="position"></app-icon>
                  {{ item.matchHost }}
                </div>
              </div>
            </div>
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
export default class Match extends Vue {
  data() {
    return {
      allLoaded: false,
      loading: false,
      matchs: [],
      pageNum: 0,
      pageSize: 6,
    };
  }
  goMatchDetail(matchId: number) {
    this.$router.push(`/match/detail/${matchId}`);
  }
  mounted() {
    this.getMatchs();
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
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    const matchs = res.data.data;
    this.$data.matchs = [...this.$data.matchs, ...matchs];
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
.match-list-item {
  position: relative;
  height: 200px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.match-cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.match-item-info-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  color: #fff;
}
.match-item-info-name {
  color: @basic-color;
  font-size: 1.1em;
  padding: 10px 0;
}
</style>