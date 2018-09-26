<template>
<div class="chat-wrap">
  <div class="chat-module">
    <virtual-list :size="40" :remain="15" style="height: 100%;">
      <div class="chat-item" v-for="(item, index) in chats" :key="index">
        <span class="chat-username">{{ item.fromName }}</span>
        : <span class="chat-message">{{ item.message }}</span>
      </div>
    </virtual-list>
  </div>
  <div class="flex center chat-input-wrap">
    <template v-if="userInfo.wxMpUserDTO || userInfo.accountDTO">
      <input class="chat-input" v-model="chatMessage" type="text" placeholder="输入聊天内容">
      <mt-button @click="sendChat" size="small" type="primary">发送</mt-button>
    </template>
    <template v-else>
      <div><span class="login-tip" @click="goLoginPage">登陆</span>即可发言</div>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ApiMatch from '@/services/match';
import ApiSocket from '@/services/socket';
import virtualList from 'vue-virtual-scroll-list';
@Component({
  props: {
    liveId: Number,
  },
  components: {
    virtualList,
  },
})
export default class ChatModule extends Vue {
  @State userInfo!: any;
  data() {
    return {
      chats: [],
      chatMessage: '',
    };
  }
  mounted() {
    this.registerRoom();
    this.addChatListener();
    ApiSocket.connect();
  }
  goLoginPage() {
    this.$router.push('/login');
  }
  sendChat() {
    const chatMessage = this.$data.chatMessage;
    if (!chatMessage) {
      return;
    }
    ApiSocket.sendChat(chatMessage);
    this.$data.chatMessage = '';
  }
  async registerRoom() {
    // const scheduleId = this.$route.params.scheduleId;
    // const res = await ApiMatch.getSchedule(+scheduleId);
    // if (!res.isSuccess) {
    //   return;
    // }
    // const liveId = (res.data.live.id).toString();
    const liveId = this.$props.liveId;
    ApiSocket.roomRegister(liveId);
  }
  addChatListener() {
    this.removeChatListener();
    ApiSocket.onChat((chatData: any) => {
      this.$data.chats.push(chatData);
    });
  }
  removeChatListener() {
    ApiSocket.offChat();
  }
  destroyed() {
    console.log('destroyed');
    this.removeChatListener();
    ApiSocket.closeSocket();
  }
}
</script>

<style scoped lang="less">
@import url('../../main.less');
.chat-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chat-module {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.chat-input-wrap {
  padding: 0 20px;
  background: #fff;
  height: 80px;
}
.chat-input {
  flex: 1;
  margin-right: 30px;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 500px;
  height: 50px;
  padding: 0 10px;
}
.chat-item {
  padding: 10px;
}
.chat-username {
  color: @basic-color;
}
.chat-message {
  color: #333;
}
.login-tip {
  color: @basic-color;
  cursor: pointer;
}
</style>