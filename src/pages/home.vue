<template>
  <div class="container">
    <mt-tab-container v-model="active">
      <mt-tab-container-item :id="tab.id" v-for="tab in tabs" :key="tab.id">
        <div class="tab-container">
          <match v-if="tab.id == 'match'"></match>
          <live v-if="tab.id == 'live'"></live>
          <mime v-if="tab.id == 'mime'"></mime>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="active">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">
        {{ tab.label }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUserInfoState } from '../stores/modules/userInfo';
import { Getter, Action, State } from 'vuex-class';
import ApiMatch from '@/services/match';
import live from './home/live.vue';
import match from './home/match.vue';
import mime from './home/mime.vue';

@Component({
  components: {
    live,
    match,
    mime,
  },
  watch: {
    active(newVal: string, oldVal: string) {
      this.$router.replace(`/home/${newVal}`);
    },
  },
})
export default class Home extends Vue {
  @State('userInfo') userInfo!: IUserInfoState;
  public data() {
    return {
      active: 'match',
      tabs: [
        {
          id: 'match',
          label: '赛事',
        },
        {
          id: 'live',
          label: '直播',
        },
        {
          id: 'mime',
          label: '我的',
        },
      ],
    };
  }
  public created() {
    this.$data.active = this.$route.params.tabName || this.$data.tabs[0];
  }
  async getMatchs() {
    const params = {
      pageSize: 5,
      pageNum: 0,
    };
    const res = await ApiMatch.matchs(params);
  }
}
</script>

<style scoped lang="less">
.container {
  overflow: auto;
}
.tab-container {
  padding-bottom: 30px;
}
</style>