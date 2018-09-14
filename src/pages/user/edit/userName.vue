<template>
<div class="form-wrap">
  <mt-field label="昵称" placeholder="请输入新昵称" v-model="username"></mt-field>
  <div class="list-item btn-wrap">
    <mt-button @click="onSubmit" size="large" type="primary">提交</mt-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/user';

@Component
export default class EditUserName extends Vue {
  data() {
    return {
      username: '',
    };
  }
  async onSubmit() {
    const username = this.$data.username;
    if (!username) {
      this.$message.success('昵称不能为空');
      return;
    }
    const res = await ApiUser.editUserName(username);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('昵称修改成功');
    this.$router.back();
  }
}
</script>

<style scoped lang="less">
.form-wrap {
  margin-top: 15px;
}
.btn-wrap {
  margin-top: 30px;
}
</style>