
import http from '@/app/http';
import store from '@/stores/store';
import Tiows from '@/libs/tiows';


interface IMessageEvent {
  messageType: 'OBJECT' | 'TEXT';
  event: string;
  data: any;
}

let tiows: Tiows | null;

const createMsg = (eventType: string, data: any): string => {
  const usrInfo = (store.state as any).userInfo;
  if (!usrInfo || !usrInfo.token) {
      return '';
  }
  const msgData = {
    messageType: typeof data === 'object' ? 'object' : 'text',
    data,
    token: usrInfo.token,
    serverId: 'LIVEAPP',
    event: eventType,
  };
  return JSON.stringify(msgData);
};

class SocketHandler {
  roomId!: string;
  cacheArr: string[];
  eventMap: any;
  constructor() {
    this.cacheArr = [];
    this.eventMap = {};
  }
  sendMsg(eventType: string, data: any = '') {
    const msg = createMsg(eventType, data);
    if (!msg) {
      return;
    }
    if (!tiows || !tiows.ws || tiows.ws.readyState !== WebSocket.OPEN) {
      this.cacheArr.push(msg);
      return;
    }
    tiows.send(msg);
  }
  sendAndClearCacheMsgArr() {
    this.cacheArr.forEach((msg) => {
      if (tiows == null) {
        return;
      }
      tiows.send(msg);
    });
    this.cacheArr = [];
  }
  onopen() {
    this.sendAndClearCacheMsgArr();
  }
  onmessage(msgEvent: { data: string }) {
    const dataStr = msgEvent.data;
    try {
      const msgData: IMessageEvent = JSON.parse(dataStr);
      console.log(`onmessage[${msgData.event}]`, msgData.data);
      this.trigger(msgData.event, msgData.data);
    } catch (err) {
      console.log('onmessage', msgEvent);
    }
  }
  onclose() {
    console.log('onclose');
  }
  onerror() {
    console.log('onerror');
  }
  ping() {
    const heartMsg = JSON.stringify({messageType: 'heartbeat'});
    if (tiows == null) {
      return;
    }
    tiows.send(heartMsg);
  }
  on(eventType: string, callBack: (...arg: any[]) => {}) {
    if (!this.eventMap[eventType]) {
      this.eventMap[eventType] = [];
    }
    this.eventMap[eventType].push(callBack);
  }
  trigger(eventType: string, body: any) {
    const eventArr: any[] = this.eventMap[eventType];
    if (!eventArr) {
      return;
    }
    eventArr.forEach((callBack: (...arg: any[]) => void) => {
      if (Object.prototype.toString.call(callBack) !== '[object Function]') {
        return;
      }
      callBack(body);
    });
  }
  off(eventType?: string, callBack?: any) {
    if (eventType == null) {
      this.eventMap = {};
      return;
    }
    if (callBack == null) {
      delete this.eventMap[eventType];
    }
    const eventArr: any[] = this.eventMap[eventType];
    if (!eventArr) {
      return;
    }
    for (let i = eventArr.length; i > 0; i --) {
      if (eventArr[i] === callBack) {
        eventArr.splice(i, 1);
      }
    }
  }
  closeSocket() {
    this.cacheArr = [];
    this.eventMap = {};
    if (!tiows) {
      return;
    }
    tiows.close();
  }
}
const handler = new SocketHandler();
const initWs = async () => {
  const res = await http.get('/api-socket/socket/getChatConnect');
  if (!res.isSuccess) {
    return null;
  }
  const { address, port } = res.data;
  const paramStr = 'name=kebi&name=kuli&name=kuli&token=11&userid=adfadsf';
  const param = 'token=11&userid=adfadsf';
  const wsProtocol = 'ws'; // ws 或 wss
  const heartbeatTimeout = 5000; // 心跳超时时间，单位：毫秒
  const reconnInterval = 1000; // 重连间隔时间，单位：毫秒
  const binaryType = 'blob'; // 'blob' or 'arraybuffer';//arraybuffer是字节
  tiows = new Tiows({
    wsProtocol, ip: address, port, paramStr, param, handler,
    heartbeatTimeout, reconnInterval, binaryType,
  });
  return tiows;
};
initWs();

enum SocketEvent {
  CHAT = 'chat',
  PUSH_PLAYER_DATA = 'PUSH_PLAYER_DATA',
}

export default {
  connect() {
    if (tiows == null) {
      return;
    }
    tiows.connect();
  },
  closeSocket() {
    handler.closeSocket();
  },
  roomRegister(roomId: string) {
    handler.roomId = String(roomId);
    handler.sendMsg('roomRegister', handler.roomId);
  },
  sendChat(message: string) {
    const usrInfo = (store.state as any).userInfo;
    if (!usrInfo || !usrInfo.accountDTO) {
        return '';
    }
    handler.sendMsg(SocketEvent.CHAT, {
      roomId: handler.roomId,
      fromName: usrInfo.accountDTO.userName,
      message,
    });
  },
  onChat(callBack: any) {
    handler.on(SocketEvent.CHAT, callBack);
  },
  offChat() {
    handler.off(SocketEvent.CHAT);
  },
  /**  */
  onMatchDataUpdate(callBack: any) {
    handler.on(SocketEvent.PUSH_PLAYER_DATA, callBack);
  },
  offMatchDataUpdate() {
    handler.off(SocketEvent.PUSH_PLAYER_DATA);
  },
};
