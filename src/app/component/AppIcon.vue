<template>
<i :class="`iconfont icon-${name}`"></i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    name: {
      type: String,
    },
  },
})
export default class AppIcon extends Vue {
}
</script>

<style scoped lang="less">
</style>