<template>
<div>
  <mt-navbar v-model="active">
    <mt-tab-item v-for="(tab, index) in tabs" :key="index" :id="tab.id">
      {{ tab.label }}
    </mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="active" style="padding-top: 16px;">
    <mt-tab-container-item v-for="(tab, index) in tabs" :key="index" :id="tab.id">
      <match-intro v-if="tab.id==='intro' && active ==='intro'"></match-intro>
      <match-schedules v-if="tab.id==='schedules' && active ==='schedules'"></match-schedules>
      <match-teams v-if="tab.id==='teams' && active ==='teams'"></match-teams>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MatchIntro from './intro.vue';
import MatchTeams from './teams.vue';
import MatchSchedules from './schedules.vue';
@Component({
  components: {
    MatchIntro,
    MatchTeams,
    MatchSchedules,
  },
})
export default class MatchDetail extends Vue {
  data() {
    return {
      active: 'intro',
      tabs: [
        {
          id: 'intro',
          label: '概况',
        },
        {
          id: 'schedules',
          label: '赛程',
        },
        {
          id: 'teams',
          label: '球队',
        },
      ],
    };
  }
}
</script>

<style scoped lang="less">
</style>