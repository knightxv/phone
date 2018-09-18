<template>
<div>
  <div class="list-item">
    <div class="item-title">赛事</div>
    <div class="item-label">{{ detail.matchScheduleName }}</div>
  </div>
  <div class="list-item item-extr">
    <div class="item-title">
      <span class="group-team-label">主队</span>
    </div>
    <div class="item-label">{{ detail.homeCourtTeam.teamName }}</div>
  </div>
  <div class="list-item item-extr">
    <div class="item-title">
      <span class="group-team-label">客队</span>
    </div>
    <div class="item-label">{{ detail.opponentTeam.teamName }}</div>
  </div>
  <div class="list-item item-extr">
    <div class="item-title">
      <app-icon class="position-icon" name="position"></app-icon>
    </div>
    <div class="item-label">{{ detail.matchAddress }}</div>
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
      detail: {
        homeCourtTeam: {},
        opponentTeam: {},
      },
    };
  }
  mounted() {
    this.getScheduleDetail();
  }
  async getScheduleDetail() {
    const scheduleId = this.$route.params.scheduleId;
    const res = await ApiMatch.getSchedule(+scheduleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.detail = {
      ...res.data,
    };
  }
}
</script>

<style scoped lang="less">
@import url('../../main.less');
.list-item {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 10px;
  margin-bottom: 15px;
}
.item-title {
  width: 120px;
  text-align: center;
  color: @gray;
}
.item-label {
  flex: 1;
}
.item-extr {
  margin-bottom: 5px;
}
.group-team-label {
  color: @basic-color;
  border: 1px solid @basic-color;
  border-radius: 6px;
  padding: 8px;
}
.position-icon {
  color: @basic-color;
  font-size: 36px;
}
</style>