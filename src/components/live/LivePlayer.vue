<template>
<div>
  <div class="player-box">
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @ready="playerReadied"
      :events="['fullscreenchange']"
      @fullscreenchange="fullscreenchange"
    >
    </video-player>
    <!-- <div id="app-video-wrap">
      <div class="menu-wrap">
        <div @click="$router.back()" >
          <app-icon name="back" class="menu-item"></app-icon>
        </div>
        <div @click="$router.back()" class="menu-item">分享</div>
      </div>
    </div> -->
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { videoPlayer } from 'vue-video-player';
// require videojs style
import videojs from 'video.js';
window.videojs = videojs;
// import '@/libs/video.less';
import 'video.js/dist/video-js.css';
// hls plugin for videojs6
// tslint:disable-next-line:no-var-requires
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

@Component({
  props: {
    liveUrl: {
      type: String,
    },
    poster: {
      type: String,
    },
  },
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      const self = this as any;
      return self.$refs.videoPlayer.player;
    },
    isFullscreen() {
      const self = this as any;
      if (!self.$refs.videoPlayer) {
        return false;
      }
      return self.player.isFullscreen();
    },
  },
})
export default class LivePlayer extends Vue {
  data() {
    return {
      // videojs options
      playerOptions: {
        width: 750,
        height: 300,
        autoplay: false,
        muted: false,
        language: 'en',
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        // videojs and plugin options
        sources: [{
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: this.$props.liveUrl,
        }],
        controlBar: {
          volumePanel: false,
          // liveDisplay: false,
          playbackRateMenuButton: false,
        },
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }},
        poster: this.$props.poster || 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg',
      },
    };
  }
  mounted() {
    console.log(this.$route.params);
    const { scheduleId } = this.$route.params;
  }
  playerReadied(player: any) {
    const hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
    player.tech_.hls.xhr.beforeRequest = (options: any) => {
      // console.log(options);
      return options;
    };
    // tslint:disable-next-line:no-shadowed-variable
    // const Component = videojs.getComponent('Component');
    // const layout = new Component(player);
    // layout.ready();
    // player.addChild(layout);
    // const layDom = document.getElementById('app-video-wrap');
    // layout.el().appendChild(layDom);
    // console.log(layout.el());
    // layout.addChild();
    // videojs.registerComponent('Layout', Layout);
  }
  fullscreenchange(player: any) {
    console.log('fullscreenchange');
  }
}
// add component
// var Dan = videojs.getComponent('Button');
//     var DanButton = videojs.extend(Dan, {
//       constructor() {
//         Dan.apply(this, arguments);
//         this.controlText("弹幕");
//       },
//       buildCSSClass() {
//         return "icon-danmaku vjs-control vjs-button";
//       },
//       handleClick() {
//         console.log('handleClick');
//       },
//     });
//     videojs.registerComponent('DanButton', DanButton);
//     player.getChild('controlBar').addChild('DanButton', {}, 3);
</script>

<style lang="less">
.player-box {
  position: relative;
  width: 100%;
  height: 100%;
  // background: black;
  // height: 200px;
}
.video-js .vjs-live-control {
  flex: 1;
}
.vjs-custom-skin > .video-js {
  width: 100%;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}
.video-js .vjs-big-play-button {
  left: 50%;
  top: 50%;
  margin-top: -0.7em;
  margin-left: -1.5em;
}
// .vjs-user-inactive {
//   #app-video-wrap {
//     visibility: hidden;
//   }
// }
// .vjs-user-active {
//   #app-video-wrap {
//     visibility: visible;
//   }
// }
// #app-video-wrap {
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   .menu-wrap {
//     color: #fff;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//   }
//   .menu-item {
//     padding: 20px;
//     font-size: 50px;
//     display: block;
//   }
// }

</style>

