<template>
<div class="container">
  <live-player></live-player>
  <div class="content-container">
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
    };
  }
  mounted() {
   this.getScheduleInfo();
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
  padding-top: 20px;
  flex: 1;
}
.tab-item-container {
  height: 100%; 
}
</style>