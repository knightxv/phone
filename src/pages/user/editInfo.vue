<template>
  <div class="form-wrap">
    <mt-cell title="头像">
      <div class="user-head-img-wrap">
        <app-upload-img
          :imgUrl="userInfo.headImg"
          :on-success="onUploadImgSuccess"
        >
        </app-upload-img>
      </div>
    </mt-cell>
    <router-link to="/user/edit/userName">
      <mt-cell title="昵称" value="说明文字" is-link></mt-cell>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/user';
import { Getter, Action } from 'vuex-class';
import { MY_USER_INFO } from '@/stores/getters-types';
import { UPDATE_USER_ACCOUNT_INFO_ASYNC } from '@/stores/action-types';
import { IUserListItem } from '@/services/apiDataType';
@Component
export default class EditInfo extends Vue {
  @Action UPDATE_USER_ACCOUNT_INFO_ASYNC!: () => {};
  @Getter(MY_USER_INFO) userInfo!: IUserListItem;
  async onUploadImgSuccess(imgUrl: string) {
    await ApiUser.editUserHeadImg(imgUrl);
    this.UPDATE_USER_ACCOUNT_INFO_ASYNC();
  }
}
</script>

<style scoped lang="less">
.form-wrap {
  margin-top: 20px;
  touch-action: none;
}
.user-head-img-wrap {
  width: 125px;
  height: 125px;
  padding: 10px 0;
  
}
</style>