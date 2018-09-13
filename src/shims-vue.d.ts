declare module '*.vue' {
  import Vue from 'vue';
  export const $app: any;
  export const $message: { success: (message: string) => {}, error: (message: string) => {} };
  export default Vue;
}


declare module 'mint-ui';
declare module 'fastclick';

// declare module 'vue-lazyload';

// declare module 'vue-icon-font-pro';

// declare module 'vue-event-calendar-pro';
// declare module '@xunlei/vue-lazy-component';
// declare module 'vue-skeleton-loading';
