export enum sex {
    GIRL = 'GIRL',
    BOY = 'BOY',
}
/** 全局事件 */
export enum globalEvent {
    NO_LOGIN = 'NO_LOGIN',
}
/** 权限菜单类型 */
export enum menuType {
    CATALOG = 'CATALOG',
    MENU = 'MENU',
    MODULE = 'MODULE',
    API = 'API',
}
/** 服务器返回code */
export enum serverCode {
  SUCCESS = 0,
  NO_LOGIN_ERROR_CODE = 401,
}
/**  图片上传的空间类型 */
export enum systemType {
  ADMIN = 'ADMIN',
  ACCOUNT = 'ACCOUNT',
  LIVEAPP = 'LIVEAPP',
}
/**  直播间类型 */
export enum liveType {
  BASKETBALL = 'BASKETBALL',

}
/**  直播人数显示类型 */
export enum personCountType {
  REAL = 'REAL',
  VIRTUAL = 'VIRTUAL',
}

export enum playerActionTypeMap {
  ASSIST = '助攻',
  BLOCK_SHOT = '盖帽',
  DEFENSIVE_REBOUND = '防守篮板球',
  REBOUND = '进攻篮板球',
  THREE_POINT_SHOT = '三分投篮',
  TWO_POINT_SHOT = '两分投篮',
  FREE_THROW = '罚球',
  STEAL = '抢断',
  TURNOVER = '失误',
  FOUL = '犯规',
}
export const playerActionTypeArr = [
  {
    toolVal: 'THREE_POINT_SHOT',
    toolName: playerActionTypeMap.THREE_POINT_SHOT,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 3,
  },
  {
    toolVal: 'TWO_POINT_SHOT',
    toolName: playerActionTypeMap.TWO_POINT_SHOT,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 2,
  },
  {
    toolVal: 'FREE_THROW',
    toolName: playerActionTypeMap.FREE_THROW,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 1,
  },
  {
    toolVal: 'ASSIST',
    toolName: playerActionTypeMap.ASSIST,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'BLOCK_SHOT',
    toolName: playerActionTypeMap.BLOCK_SHOT,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'DEFENSIVE_REBOUND',
    toolName: playerActionTypeMap.DEFENSIVE_REBOUND,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'REBOUND',
    toolName: playerActionTypeMap.REBOUND,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'STEAL',
    toolName: playerActionTypeMap.STEAL,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'TURNOVER',
    toolName: playerActionTypeMap.TURNOVER,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'FOUL',
    toolName: playerActionTypeMap.FOUL,
    actions: ['ADD', 'MINUS'],
  },
];

export enum matchStageTypeLab {
  UN_START = '未开始',
  PART_ONE = '第一节',
  PART_TWO = '第二节',
  PART_THREE = '第三节',
  PART_FOUR = '第四节',
  OVERTIME = '加时',
  // FIRST_HALF = '',
  // SECOND_HALF = '',
  END = '结束',
}
