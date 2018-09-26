<template>
<div class="container">
  <live-player v-if="liveUrl" :liveUrl="liveUrl" :poster="livePoster"></live-player>
  <div class="no-live-tip" v-else>
    直播还未开播，请稍等!!!
  </div>
  <div class="content-container">
    <template v-if="matchScheduleSlideshows">  
      <mt-swipe class="swiper">
        <mt-swipe-item v-for="(item, index) in matchScheduleSlideshows" :key="index">
          <div @click="onSwipeItemTouch(item)">
            <app-net-img :imgUrl="item.coverImg" errorImgUrl="match_cover" />
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </template>
    <mt-navbar v-model="active">
      <mt-tab-item v-for="(tab, index) in tabs" :key="index" :id="tab.id">
        {{ tab.label }}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active" class="tab-container">
      <mt-tab-container-item class="tab-item-container" v-for="(tab, index) in tabs" :key="index" :id="tab.id">
        <chat-module :live-id="liveId" v-if="tab.id=== tabs[0].id && liveId"></chat-module>
        <match-data-display v-if="tab.id===tabs[1].id"></match-data-display>
        <match-intro v-if="tab.id===tabs[2].id"></match-intro>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiMatch from '@/services/match';
import LivePlayer from '@/components/live/LivePlayer.vue';
import ChatModule from '@/components/live/ChatModule.vue';
import MatchDataDisplay from '@/components/live/MatchDataDisplay.vue';
import MatchIntro from '@/components/live/MatchIntro.vue';
@Component({
  components: {
    LivePlayer,
    ChatModule,
    MatchDataDisplay,
    MatchIntro,
  },
})
export default class LiveRoom extends Vue {
  data() {
    return {
      active: 'chat',
      tabs: [
        {
          id: 'chat',
          label: '聊天',
        },
        {
          id: 'data',
          label: '数据',
        },
        {
          id: 'intro',
          label: '概况',
        },
      ],
      liveId: undefined,
      liveUrl: '',
      livePoster: '',
      matchScheduleSlideshows: null,
    };
  }
  mounted() {
   this.getScheduleInfo();
   this.getMatchScheduleSlideshow();
  }
  async getMatchScheduleSlideshow() {
    const scheduleId = this.$route.params.scheduleId;
    const res = await ApiMatch.matchScheduleSlideshow(scheduleId);
    if (!res.isSuccess) {
      return;
    }
    if (res.data[0] == null) {
      return;
    }
    this.$data.matchScheduleSlideshows = res.data[0].slideshowVO.slideshowContentVOS;
  }
  async getScheduleInfo() {
    const scheduleId = this.$route.params.scheduleId;
    const res = await ApiMatch.getSchedule(+scheduleId);
    if (!res.isSuccess) {
      return;
    }
    const liveInfo = res.data.live;
    if (liveInfo == null) {
      return;
    }
    this.$data.liveId = liveInfo.id;
    this.$data.liveUrl = liveInfo.phoneLiveUrl;
    this.$data.livePoster = `http://${liveInfo.coverImage}`;
    const { wechatShareIco, wechatShareRemark, wechatShareTitle, liveTitle } = liveInfo;
    const originUrl = window.location.origin;
    const shareUrl = window.location.href.split('#')[0];
    this.$app.wechat.updateShareData({
      title: wechatShareTitle || liveTitle || '奇点直播',
      desc: wechatShareRemark || '是男人就来奇点直播',
      link: shareUrl,
      imgUrl: wechatShareIco || `${originUrl}/share_default.jpg`,
    });
  }
  onSwipeItemTouch(slideContent: any) {
    if (slideContent == null) {
      return;
    }
    const { slideshowContentType, id, link } = slideContent;
    if (slideshowContentType === 'URL_LINK' && link) {
      console.log('jump to', link);
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
}
.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.tab-container {
  // padding-top: 20px;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.tab-item-container {
  // flex: 1;
  height: 100%;
  position: absolute;
}
.no-live-tip {
  height: 350px;
  background: #000;
  line-height: 350px;
  text-align: center;
  color: #fff;
}
.swiper {
  height: 250px;
}
</style>