<template>
  <div @click="touchUpload" class="img-wrap">
    <app-net-img radius :imgUrl="imgUrl" />
    <croppa
      v-show="false"
      v-model="croppa"
      ref="croppa"
      @file-choose="handleCroppaFileChoose"
      >
    </croppa>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IApiData } from '@/services/apiDataType';
import { systemType } from '../typeDef';
import { Getter } from 'vuex-class';
import { TOKEN } from '../../stores/getters-types';
import ApiCommon from '@/services/common';

@Component({
  props: {
    imgUrl: String,
    onSuccess: {
      type: Function,
      default: (imgUrl: string) => {
        console.log('upload success:', imgUrl);
      },
    },
    onFail: {
      type: Function,
      default: (err: any) => {
        console.log('upload fail:', err);
      },
    },
  },
})
export default class AppUploadImg extends Vue {
  @Getter TOKEN!: string;
  data() {
    return {
      croppa: {},
    };
  }
  async handleCroppaFileChoose(file: File) {
    const res = await ApiCommon.uploadImage(file);
    if (!res.isSuccess) {
      this.$props.onFail(res.errMsg);
      return;
    }
    const imrUrl = res.data.resourceUrl;
    this.$props.onSuccess(imrUrl);
    this.$emit('update:imgUrl', imrUrl);
  }
  beforeAvatarUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
      this.$message.error('上传头像图片只能是JPG|PNG格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
  touchUpload() {
    const refCroppa = this.$refs.croppa as any;
    refCroppa.chooseFile();
  }
}
</script>

<style scoped lang="less">
@avatarSize: 100px;
.img-wrap {
  width: 100%;
  height: 100%;
}
.setAvatarSize() {
  width: @avatarSize;
  height: @avatarSize;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>