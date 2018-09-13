<template>
  <!-- <el-upload
    class="avatar-uploader"
    :action="`${$app.config.REMOTE_URL}/api-common-server/upload/image/${systemType}`"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="{Authorization: TOKEN}"
    :before-upload="beforeAvatarUpload">
    <img v-if="imgUrl" :src="`http://${imgUrl}`" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload> -->
  <div></div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
// import { IApiData } from '@/services/apiDataType';
// import { systemType } from '../typeDef';
// import { Getter } from 'vuex-class';
// import { TOKEN } from '../../stores/getters-types';


// @Component({
//   props: {
//     imgUrl: String,
//     systemType: {
//       type: String,
//       default: systemType.ADMIN,
//     },
//   },
// })
// export default class AppUpload extends Vue {
//   @Getter TOKEN!: string;
//   handleAvatarSuccess(res: any, file: any) {
//     if (res.code !== this.$app.typeDef.serverCode.SUCCESS) {
//       this.$message.error(res.msg || '上传失败');
//       return;
//     }
//     const imrUrl = res.data.resourceUrl;
//     this.$emit('update:imgUrl', imrUrl);
//   }
//   beforeAvatarUpload(file: any) {
//     const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isJPG) {
//       this.$message.error('上传头像图片只能是JPG|PNG格式!');
//     }
//     if (!isLt2M) {
//       this.$message.error('上传头像图片大小不能超过 2MB!');
//     }
//     return isJPG && isLt2M;
//   }
// }
</script>

<style scoped lang="less">
@avatarSize: 100px;
.setAvatarSize() {
  width: @avatarSize;
  height: @avatarSize;
}
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #ccc;
  .setAvatarSize();
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  .setAvatarSize();
  line-height: @avatarSize;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>