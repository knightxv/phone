<template>
<vuetable v-bind="$attrs" :css="css"></vuetable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Vuetable from 'vuetable-2';
@Component({
  components: {
    Vuetable,
  },
})
export default class AppVueTable extends Vue {
  data() {
    return {
      css: {
        tableWrapper: 'table-wrapper',
        tableHeaderClass: 'table-header',
        // tableBodyClass: 'mb-0',
        tableClass: 'table table-bordered table-hover',
        loadingClass: 'loading',
        detailRowClass: 'vuetable-detail-row',
      },
    };
  }
}
</script>

<style lang="less">
@import url('../../main.less');
.table-wrapper {
  margin-top: 20px;
  background: #fff;
  text-align: center;
}
@borderColor: #e9ecea;
.table {
  width: 100%;
  background: #fff;
  margin: 1em 0;
  border: 1px solid @borderColor;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 10px;
  text-align: center;
  color: rgba(0,0,0,.87);
  border-collapse: separate;
  border-spacing: 0;
  box-sizing: inherit;
  td, th {
    padding: 10px 0;
    text-align: center;
    // border-right: 1px solid #e9ecea;
    border-bottom: 1px solid @borderColor;
  }
}
.vuetable {
  width: 100%;
}
// .vuetable-td-label {
//   max-width: 180px;
//   .text-hide();
// }
</style>