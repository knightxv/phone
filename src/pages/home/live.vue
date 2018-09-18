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
            v-if="isShowMatch(item)"
            class="live-list-item"
          >
            <div class="match-cover">
              <app-net-img :imgUrl="item.mainImage" errorImgUrl="live_cover"></app-net-img>
            </div>
            <div class="item-match-name">{{ item.matchName }}</div>
            <template v-if="item.matchScheduleVOS">
              <div
                v-for="(schedule, index) in item.matchScheduleVOS"
                v-if="isToDayLive(schedule)"
                :key="index"
                class="flex space-between schedule-item"
              >
                <div class="schedule-item-block">
                  <div class="flex space-between">
                    <div class="schedule-intro-item-left">{{ schedule.live.masterName }}</div>
                    <div class="flex">
                      <div class="team-belong-label">主|</div>
                      <div class="item-team-name">{{ schedule.homeCourtTeam.teamName }}</div>
                    </div>
                  </div>
                  <div class="flex space-between">
                    <div class="flex schedule-intro-item-left">
                      <app-icon class="time-icon" name="time"></app-icon>
                      <span class="start-time-label">{{ $app.helps.formatDateBySecTime(schedule.startTime, 'HH:mm') }}</span>
                      <div class="schedule-address">{{ schedule.matchAddress }}</div>
                    </div>
                    <div class="flex">
                      <div class="team-belong-label">客|</div>
                      <div class="item-team-name">{{ schedule.opponentTeam.teamName }}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <mt-button @click="goLiveRoom(schedule.id)" size="small" type="primary">观看直播</mt-button>
                </div>
              </div>
            </template>
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
import { IMatchScheduleInfoItem, IMatchInfoItem } from '@/services/apiDataType';
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
  /** 进入直播房间 */
  goLiveRoom(scheduleId: string) {
    this.$router.push({
      name: 'liveRoom',
      params: {
        scheduleId,
      },
    });
  }
  /** 是否显示赛事 */
  isShowMatch(item: IMatchInfoItem) {
    const liveLength = item.matchScheduleVOS.reduce((before: number, cur: IMatchScheduleInfoItem) => {
      const isToDayLive = this.isToDayLive(cur);
      if (isToDayLive) {
        return before + 1;
      }
      return before;
    }, 0);
    return liveLength !== 0;
  }
  isToDayLive(schedule: IMatchScheduleInfoItem) {
    const todayTimestamp = this.$app.helps.getDayTimeStamp();
    const startTimestamp = schedule.startTime * 1000;
    return startTimestamp >= todayTimestamp;
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
  box-sizing: border-box;
  min-height: calc(100vh - 94px);
}
.icon {
  font-size: 42px;
}
.live-list-item {
  margin-bottom: 20px;
  background: #fff;
  box-sizing: border-box;
}
.match-cover {
  height: 380px;
}
.item-match-name {
  padding: 16px 20px;
  font-size: 30px;
}
.team-belong-label {
  color: @basic-color;
  width: 60px;
}
.schedule-item {
  height: 120px;
  padding: 10px 20px;
  .border-bottom();
}
.time-icon {
  color: @basic-color;
  font-size: 36px;
}
.schedule-item-block {
  width: 490px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.schedule-intro-item-left {
  width: 200px;
  overflow: hidden;
}
.item-team-name {
  width: 200px;
  .text-hide();
}
.start-time-label {
  font-size: 28px;
  color: @gray;
}
.schedule-address {
  font-size: 28px;
  padding-left: 10px;
  width: 80px;
  color: @gray;
  .text-hide();
}
</style>