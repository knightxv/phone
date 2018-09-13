<template>
  <img v-if="imgSource" :src="imgSource" >
  <app-local-img v-else imgUrl="default_avatar" ></app-local-img>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: ['imgUrl'],
})
export default class  extends Vue {
  data() {
    return {
      imgSource: '',
    };
  }
  mounted() {
    this.$data.imgSource = this.$props.imgUrl ? `http://${this.$props.imgUrl}` : '';
  }
}
</script>

<style scoped lang="less">
</style>