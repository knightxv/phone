<template>
  <img :class="{ radius: !!radius}" v-if="imgSource" :src="imgSource" >
  <app-local-img :class="{ radius: !!radius}" v-else imgUrl="default_avatar" ></app-local-img>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    imgUrl: String,
    radius: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imgSource() {
      return this.$props.imgUrl ? `http://${this.$props.imgUrl}` : '';
    },
  },
})
export default class  extends Vue {
}
</script>

<style scoped lang="less">
.radius {
  border-radius: 50%;
}
</style>