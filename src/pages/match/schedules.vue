<template>
<div>
  <div v-for="(item, index) in schedules" :key="index" class="schedule-list-item">
    <div class="item-team-info flex space-between">
      <div class="flex">
        <div class="team-icon-wrap">
          <app-net-img
            :imgUrl="item.homeCourtTeam.teamIco"
            errorImgUrl="team_icon"
            radius
          >
          </app-net-img>
        </div>
        <span class="team-name">
          {{ item.homeCourtTeam.teamName }}
        </span>
      </div>
      <span class="vs-label">VS</span>
      <div class="flex">
        <div class="team-name">
          {{ item.opponentTeam.teamName }}
        </div>
        <div class="team-icon-wrap">
          <app-net-img
            :imgUrl="item.opponentTeam.teamIco"
            errorImgUrl="team_icon"
            radius
          >
          </app-net-img>
        </div>
      </div>
    </div>
    <div class="flex space-between item-extra-info">
      <span>{{ $app.helps.formatDateBySecTime(item.startTime, 'MM-dd') }}开始</span>
      <span class="schedule-name">开始广汽丰田汽车有限公司</span>
      <span v-if="item.matchStageType === 'UN_START'">未开始</span>
      <span
        v-if="item.matchStageType
        && item.matchStageType !== 'UN_START'
        && item.matchStageType !== 'END'"
      >
        比赛中
      </span>
      <span v-if="item.matchStageType === 'END'">已结束</span>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
@Component
export default class MatchSchedule extends Vue {
  data() {
    return {
      schedules: [],
    };
  }
  mounted() {
    this.getSchedules();
  }
  async getSchedules() {
    const matchId = this.$route.params.matchId;
    const res = await ApiMatch.getSchedules(+matchId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.schedules = res.data;
  }
}
</script>

<style scoped lang="less">
@import url('../../main.less');
.schedule-list-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #fff;
  padding: 20px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #e9eaec;
}
.team-name {
  width: 260px;
  .text-hide();
}
.item-team-info {
  padding: 0 10px 20px;
}
.vs-label {
  color: @basic-color;
  font-weight: 700;
  font-size: 1.2em;
}
.item-extra-info {
  color: #cec6c6;
}
.schedule-name {
  width: 360px;
  .text-hide();
}
.team-icon-wrap {
  width: 50px;
  height: 50px;
  display: inline-block;
}
</style>