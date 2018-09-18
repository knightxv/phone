interface ITiowsConfig {
  wsProtocol: string;
  ip: string;
  port: number;
  paramStr: string;
  param: any;
  handler: any;
  heartbeatTimeout: number;
  reconnInterval: number;
  binaryType: string;
}

export default class Tiows {
  ws!: WebSocket | null;
  ip: string;
  url: string;
  binaryType: string;
  reconnUrl: string;
  port: number;
  param: any;
  handler: any;
  heartbeatTimeout: number;
  reconnInterval: number;
  heartbeatSendInterval: number;
  lastInteractionTimeValue: any;
  closeByUser: boolean;
  pingIntervalId: any; // Timer
  /**
   * @param {*} ws_protocol wss or ws
   * @param {*} ip
   * @param {*} port
   * @param {*} paramStr 加在ws url后面的请求参数，形如：name=张三&id=12
   * @param {*} param 作为tio.ws对象的参数，由业务自己使用，框架不使用
   * @param {*} handler
   * @param {*} heartbeatTimeout 心跳时间 单位：毫秒
   * @param {*} reconnInterval 重连间隔时间 单位：毫秒
   * @param {*} binaryType 'blob' or 'arraybuffer';//arraybuffer是字节
   */
  constructor(option: ITiowsConfig) {
    const { wsProtocol, ip, port, paramStr, param, handler, heartbeatTimeout, reconnInterval, binaryType } = option;
    this.ip = ip;
    this.port = port;
    this.url = wsProtocol + '://' + ip + ':' + port;
    this.binaryType = binaryType || 'arraybuffer';

    if (paramStr) {
      this.url += '?' + paramStr;
      this.reconnUrl = this.url + '&';
    } else {
      this.reconnUrl = this.url + '?';
    }
    this.reconnUrl += 'tiows_reconnect=true';
    this.param = param;


    this.handler = handler;
    this.heartbeatTimeout = heartbeatTimeout;
    this.reconnInterval = reconnInterval;
    this.heartbeatSendInterval = heartbeatTimeout / 2;
    this.lastInteractionTimeValue = null;
    this.ws = null;
    this.closeByUser = false;
  }
  lastInteractionTime(timeStamp?: number) {
    if (timeStamp == null) {
      return this.lastInteractionTimeValue;
    }
    return this.lastInteractionTimeValue = timeStamp;
  }
  connect(isReconnect: boolean = false) {
    if (isReconnect) {
      this.url = this.reconnUrl;
    }
    const ws = new WebSocket(this.url);
    this.ws = ws;
    this.closeByUser = false;
    ws.binaryType = this.binaryType as BinaryType; // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
    ws.onopen = (event) => {
      this.handler.onopen.call(this.handler, event, ws);
      this.lastInteractionTime(new Date().getTime());
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = setInterval(() => {
        this.ping();
      }, this.heartbeatSendInterval);
    };
    ws.onmessage = (event) => {
      this.handler.onmessage.call(this.handler, event, ws);
      this.lastInteractionTime(new Date().getTime());
    };
    ws.onclose = (event) => {
      clearInterval(this.pingIntervalId); // clear send heartbeat task
      try {
        this.handler.onclose.call(this.handler, event, ws);
      } catch (error) {
        console.log(error);
      }
      if (this.closeByUser) {
        return;
      }
      this.reconn(event);
    };
    ws.onerror = (event) => {
      this.handler.onerror.call(this.handler, event, ws);
    };
    return ws;
  }
  reconn(event: any) {
    setTimeout(() => {
      const ws = this.connect(true);
      this.ws = ws;
    }, this.reconnInterval);
  }
  ping() {
    const iv = new Date().getTime() - this.lastInteractionTime(); // 已经多久没发消息了
    // 单位：秒
    if ((this.heartbeatSendInterval + iv) >= this.heartbeatTimeout) {
      this.handler.ping(this.ws);
    }
  }
  send(data: any) {
    console.log('send data:', JSON.parse(data));
    if (this.ws == null) {
      return;
    }
    this.ws.send(data);
  }
  close() {
    if (this.ws == null) {
      return;
    }
    this.closeByUser = true;
    clearInterval(this.pingIntervalId);
    this.ws.close();
    this.ws = null;
  }
}

