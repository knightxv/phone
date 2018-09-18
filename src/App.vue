<template>
  <div id="app">
    <router-view></router-view>
    <!-- <keep-alive>
    </keep-alive> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { globalEvent } from './app/typeDef';
@Component({
})
export default class App extends Vue {
  public routerTimer!: any;
  public created() {
    this.$root.$on(globalEvent.NO_LOGIN, () => {
      clearTimeout(this.routerTimer);
      this.routerTimer = setTimeout(() => {
        clearTimeout(this.routerTimer);
        this.$router.push('/login');
      }, 300);
    });
  }
  destroyed() {
    console.log('app destroy');
    // tslint:disable-next-line:no-debugger
    debugger;
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body, html {
  margin: 0;
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
a {
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

// common
.container {
  height: 100%;
  background: #f3f3f3;
}
.list-item {
  padding: 0 20px;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  &.space-between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
  &.flex-end {
    justify-content: flex-end;
  }
}
// miti
.mint-field-core {
  background: none;
}
</style>
