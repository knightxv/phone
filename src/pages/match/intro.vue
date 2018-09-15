<template>
<div>
  <div class="match-cover-img">
    <app-net-img :imgUrl="detail.mainImage" errorImgUrl="match_cover"></app-net-img>
  </div>
  <div class="info-container">
    <div class="detail-list-item flex">
      <div class="list-title">赛事名称</div>
      <div class="list-info">{{ detail.matchName }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">举办地点</div>
      <div class="list-info">{{ detail.matchAddress }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">报名时间</div>
      <div class="list-info">{{ $app.helps.formatDateBySecTime(detail.startSignUpTime) }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">比赛时间</div>
      <div class="list-info">{{ $app.helps.formatDateBySecTime(detail.startMatchTime) }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">主办方</div>
      <div class="list-info">{{ detail.matchHost }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">承包商</div>
      <div class="list-info">{{ detail.matchUndertake }}</div>
    </div>
    <div class="detail-list-item flex">
      <div class="list-title">冠名商</div>
      <div class="list-info">{{ detail.namingQuotient }}</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
@Component
export default class MatchIntro extends Vue {
  data() {
    return {
      detail: {},
    };
  }
  mounted() {
    this.getMatchIntro();
  }
  async getMatchIntro() {
    const matchId = this.$route.params.matchId;
    const res = await ApiMatch.detail(+matchId);
    this.$data.detail = res.data;
  }
}
</script>

<style scoped lang="less">
.match-cover-img {
  height: 300px;
}
.info-container {
  margin-top: 20px;
  background: #fff;
}
.detail-list-item {
  border-bottom: 1px solid #e9eaec;
  padding: 20px 8px;
}
.list-title {
  width: 200px;
  color: #cec6c6;
}
.list-info {
  width: 550px;
}
</style>