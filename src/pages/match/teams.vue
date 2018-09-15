<template>
<div>
  <div v-for="(item, index) in teams" :key="index" class="team-item-container">
    <div class="flex space-between team-list-item">
      <span class="team-name">{{ item.teamName || '无' }}</span>
      <div class="point-info">积分：
        <span class="point">{{ item.teamPoints }}</span>
      </div>
    </div>
    <div class="team-coach-name">教练：{{ item.teamCoachName || '无' }}</div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
@Component
export default class MatchTeams extends Vue {
  data() {
    return {
      teams: [],
    };
  }
  mounted() {
    this.getTeams();
  }
  async getTeams() {
    const matchId = this.$route.params.matchId;
    const res = await ApiMatch.getTeams(+matchId);
    if (!res.isSuccess) {
      return;
    }
    console.log(res.data);
    this.$data.teams = res.data;
  }
}
</script>

<style scoped lang="less">
@import url('../../main.less');
.team-item-container {
  background: #fff;
  padding: 20px 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #e9eaec;
}
.team-list-item {
  
}
.team-name {
  font-size: 1.2em;
}
.point-info {
  
}
.point {
  color: @basic-color;
}
.team-coach-name {
  padding-top: 8px;
  color: #cec6c6;
  font-size: .9em;
}
</style>