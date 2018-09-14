<template>
  <div class="form-wrap">
    <mt-cell title="头像" is-link>
      <div class="user-head-img-wrap">
        <app-net-img></app-net-img>
      </div>
    </mt-cell>
    <router-link to="/user/edit/userName">
      <mt-cell title="昵称" value="说明文字" is-link></mt-cell>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditInfo extends Vue {
}
</script>

<style scoped lang="less">
.form-wrap {
  margin-top: 20px;
}
.user-head-img-wrap {
  width: 125px;
  height: 125px;
  padding: 10px 0;
}
</style>