<template>
    <div class="app-container">
      <transition
          mode="out-in"
          enter-active-class="fadeIn"
          leave-active-class="fadeOut"
          appear
      >
          <router-view></router-view>
      </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
    },
})
export default class Layout extends Vue {
}
</script>

<style scoped lang="less">
.app-container {
    height: 100vh;
}
.app-header {
    background: #373d41;
    color: #fff;
}

</style>