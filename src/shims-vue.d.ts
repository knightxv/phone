declare module '*.vue' {
  import Vue from 'vue';
  export const $app: any;
  export const $message: { success: (message: string) => {}, error: (message: string) => {} };
  export default Vue;
}


declare module 'mint-ui';
declare module 'fastclick';
declare module 'vue-croppa';

declare module 'vue-virtual-scroll-list';
// https://www.vuetable.com/guide/fields-definition.html#field-options
declare module 'vuetable-2';

// [demo] https://surmon-china.github.io/vue-video-player/
// [doc] https://docs.videojs.com/tutorial-options.html
declare module 'vue-video-player';
declare module 'video.js';
declare module 'videojs-contrib-hls/*';

// declare module 'vue-lazyload';

// declare module 'vue-icon-font-pro';

// declare module 'vue-event-calendar-pro';
// declare module '@xunlei/vue-lazy-component';
// declare module 'vue-skeleton-loading';
