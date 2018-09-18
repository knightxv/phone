<template>
<div v-if="detail">
  <div class="flex center team-score-wrap">
    <div class="team-intro-wrap">
      <div class="team-intro-side">主队</div>
      <div class="team-icon">
        <app-net-img errorImgUrl="team_icon"></app-net-img>
      </div>
      <div class="team-intro-name">{{ detail.homeCourtTeam.matchTeamName }}</div>
      <div>{{ getHomeTeamScore() }}</div>
    </div>
    <div class="vs-tip">VS</div>
    <div class="team-intro-wrap">
      <div class="team-intro-side">客队</div>
      <div class="team-icon">
        <app-net-img errorImgUrl="team_icon"></app-net-img>
      </div>
      <div class="team-intro-name">{{ detail.opponentTeam.matchTeamName }}</div>
      <div>{{ getOpponentScore() }}</div>
    </div>
  </div>
  <div>
    <app-vue-table
      ref="vuetable"
      :fields="fields"
      :api-mode="false"
      :data="count"
    ></app-vue-table>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
import ApiSocket from '@/services/socket';
import { IScheduleTeamPlayerInfo } from '@/services/apiDataType';
import AppVueTable from '@/components/common/AppVueTable.vue';
@Component({
  components: {
    AppVueTable,
  },
  computed: {
    count(): any[] {
      const self = this as MatchDataDisplay;
      const detail = this.$data.detail;
      if (!detail.homeCourtTeam || !detail.opponentTeam) {
        return [];
      }
      const homeTeamTeamPlayers = detail.homeCourtTeam.matchScheduleTeamPlayers;
      const oppomentTeamPlayers = detail.opponentTeam.matchScheduleTeamPlayers;
      let homeTeamScoreData = {
        label: detail.homeCourtTeam.matchTeamName,
        partOne: self.getPartScore(homeTeamTeamPlayers, 'PART_ONE'),
        partTwo: self.getPartScore(homeTeamTeamPlayers, 'PART_TWO'),
        partThree: self.getPartScore(homeTeamTeamPlayers, 'PART_THREE'),
        partFour: self.getPartScore(homeTeamTeamPlayers, 'PART_FOUR'),
        overTime: self.getPartScore(homeTeamTeamPlayers, 'OVERTIME'),
      };
      let oppomentTeamScoreData = {
        label: detail.opponentTeam.matchTeamName,
        partOne: self.getPartScore(oppomentTeamPlayers, 'PART_ONE'),
        partTwo: self.getPartScore(oppomentTeamPlayers, 'PART_TWO'),
        partThree: self.getPartScore(oppomentTeamPlayers, 'PART_THREE'),
        partFour: self.getPartScore(oppomentTeamPlayers, 'PART_FOUR'),
        overTime: self.getPartScore(oppomentTeamPlayers, 'OVERTIME'),
      };
      if (homeTeamTeamPlayers) {
        homeTeamScoreData = {
          ...homeTeamScoreData,
        };
      }
      if (oppomentTeamPlayers) {
        oppomentTeamScoreData = {
          ...oppomentTeamScoreData,
        };
      }
      return [ homeTeamScoreData, oppomentTeamScoreData];
    },
  },
})
export default class MatchDataDisplay extends Vue {
  data() {
    return {
      // detail: {
      //   homeCourtTeam: {},
      //   opponentTeam: {},
      // },
      detail: null,
      fields: [
        {
          title: '球队',
          name: 'label',
        },
        {
          title: '第一节',
          name: 'partOne',
        },
        {
          title: '第二节',
          name: 'partTwo',
        },
        {
          title: '第三节',
          name: 'partThree',
        },
        {
          title: '第四节',
          name: 'overTime',
        },
        {
          title: '加时',
          name: 'partFour',
        },
      ],
    };
  }
  mounted() {
    this.getScheduleCountDetail();
    ApiSocket.onMatchDataUpdate((data: any) => {
      this.$data.detail = data;
    });
  }
  destroyed() {
     ApiSocket.offMatchDataUpdate();
  }
  getHomeTeamScore() {
    const detail = this.$data.detail;
    if (!detail.homeCourtTeam) {
      return 0;
    }
    const matchScheduleTeamPlayers = detail.homeCourtTeam.matchScheduleTeamPlayers;
    if (!matchScheduleTeamPlayers) {
      return 0;
    }
    return matchScheduleTeamPlayers.reduce((before: number, cur: IScheduleTeamPlayerInfo) => {
      return this.scoreFormatter(cur) + before;
    }, 0);
  }
  getOpponentScore() {
    const detail = this.$data.detail;
    if (!detail.opponentTeam) {
      return 0;
    }
    const matchScheduleTeamPlayers = detail.opponentTeam.matchScheduleTeamPlayers;
    if (!matchScheduleTeamPlayers) {
      return 0;
    }
    return matchScheduleTeamPlayers.reduce((before: number, cur: IScheduleTeamPlayerInfo) => {
      return this.scoreFormatter(cur) + before;
    }, 0);
  }
  async getScheduleCountDetail() {
    const scheduleId = this.$route.params.scheduleId;
    const matchPlayerActionTypes = ['THREE_POINT_SHOT', 'TWO_POINT_SHOT', 'FREE_THROW'];
    const res = await ApiMatch.getMatchScheduleCount(+scheduleId, matchPlayerActionTypes);
    if (!res.isSuccess) {
      return;
    }
    this.$data.detail = {
      ...res.data,
    };
  }
  scoreFormatter(row: IScheduleTeamPlayerInfo) {
    if (row.matchScheduleTeamPlayerActions == null) {
      return 0;
    }
    return row.matchScheduleTeamPlayerActions.reduce((before, cur) => {
      const { matchPlayerActionType, successTimes } = cur;
      const score = this.getScoreByMatchPlayerActionType(matchPlayerActionType) * successTimes;
      return before + score;
    }, 0);
  }
  /** 通过工具来获取分数 */
  getScoreByMatchPlayerActionType(matchPlayerActionType: string): number {
    let score = 0;
    this.$app.typeDef.playerActionTypeArr.some((actionInfo: { toolVal: string, score: number }) => {
      if (actionInfo.score == null) {
        return false;
      }
      if (matchPlayerActionType === actionInfo.toolVal) {
        score = actionInfo.score;
        return true;
      }
      return false;
    });
    return score;
  }
  /** 获取一节的分数 */
  getPartScore(teamPlayers: any[], partName: string): number {
    return teamPlayers.reduce((before: number, current: IScheduleTeamPlayerInfo) => {
      if (current.matchScheduleTeamPlayerActions == null) {
        return before;
      }
      return current.matchScheduleTeamPlayerActions.reduce((bef, cur) => {
        if (cur.matchStageType !== partName) {
          return bef;
        }
        const { matchPlayerActionType, successTimes } = cur;
        const score = this.getScoreByMatchPlayerActionType(matchPlayerActionType) * successTimes;
        return bef + score;
      }, 0);
    }, 0);
  }
}
</script>

<style scoped lang="less">
@import url('../../main.less');
.team-score-wrap {
  text-align: center;
  background: #fff;
  padding: 30px 0;
}
.team-intro-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 180px;
  
}
.team-icon {
  width: 75px;
  height: 75px;
}
.team-intro-side {
  color: @basic-color;
}
.team-intro-name {
  width: 230px;
  .text-hide()
}
.vs-tip {
  padding: 0 30px;
}

// table
.table {

}
</style>