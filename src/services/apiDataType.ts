
/**
 * 所有的类型生命最好都使用 "I" 开头
 */
export interface IApiData {
    isSuccess: boolean;
    data: any;
    errMsg?: string;
}
/** liveapp */
// userInfo
export interface IUserListItem {
  accountId: string;
  belongUserId: string;
  createTime: number;
  loginTime: number;
  enable: boolean;
  loginId: string;
  password: string;
  phoneNum: string;
  systemType: string;
  wechatHeadImg: string;
  wechatId: string;
  wechatName: string;
  // account
  headImg: string;
  balance: number;
  id: number;
  userName: string;
}

export interface IWechatInfo {
  city: string;
  country: string;
  groupId: number;
  headImgUrl: string;
  language: string;
  nickname: string;
  openId: string;
  privileges: string[];
  province: string;
  qrScene: string;
  qrSceneStr: string;
  remark: string;
  sex: number;
  sexDesc: string;
  subscribe: boolean;
  subscribeScene: string;
  subscribeTime: number;
  tagIds: number[];
  unionId: string;
}

// lives
export interface ILiveInfoData extends IApiData {
  data: {
      data: ILiveInfoItem[];
      currentPage: number;
      pageSize: number;
      start: number;
      total: number;
  };
}
export interface ILiveInfoItem {
  id: number;
  /** 首页时显示的封面  */
  coverImage: string;
  createTime: number;
  createUser: number;
  deleted: boolean;
  /** 直播间未开播时显示的图片  */
  homeImage: string;
  /** 直播间简介  */
  liveRemark: string;
  liveTitle: string;
  /**  直播间类型 ['BASKETBALL']  */
  liveType: string;
  /**  主播名   */
  masterName: string;
  /** 电脑直播播放地址 */
  pcLiveUrl: string;
  /** 手机直播播放地址 */
  phoneLiveUrl: string;
  /** 直播人数显示类型 ['REAL', 'VIRTUAL'] */
  personCountType: string;
  /** 最高人数 */
  personCountMax: number;
  /** 最低人数 */
  personCountMin: number;
  updateTime: number;
  updateUser: number;
  /** 微信分享图标 */
  wechatShareIco: string;
  /** 微信分享详情  */
  wechatShareRemark: string;
  /** 微信分享标题 */
  wechatShareTitle: string;
}


// matchs
export interface IMatchInfoItem {
  matchName: string;
  matchAddress: string;
  mainImage: string;
  /** 主办方 */
  matchHost: string;
  /** 承办方 */
  matchUndertake: string;
  /** 冠名商 */
  namingQuotient: string;
  /** 比赛开始时间 */
  startMatchTime: number;
  /** 比赛结束时间 */
  endMatchTime: number;
  /** 报名开始时间 */
  startSignUpTime: number;
  /** 报名结束时间 */
  endSignUpTime: number;
  updateTime: number;
  updateUser: number;

  createTime?: number;
  createUser?: number;
  deleted?: boolean;
  enabled?: 'ON' | 'OFF';
  matchScheduleVOS: IMatchScheduleInfoItem[];
}

export interface IMatchScheduleInfoItem {
  createUser?: number;
  homeCourtTeam: any;
  liveId: any;
  matchAddress: string;
  matchScheduleName: string;
  matchId: number;
  opponentTeam: any;
  startTime: number;
}

export interface IMathTeamInfoItem {
  id: number;
  /** 赛事组 */
  matchGroup: string;
  /** 赛事id */
  matchId: number;
  /** 队员列表 */
  matchTeamPlayerVOs: ITeamPlayerVOs[];
  /** 教练名 */
  teamCoachName: string;
  /** 队标 */
  teamIco: string;
  /** 队伍宣传图 */
  teamImage: string;
  /** 队名 */
  teamName: string;
  /** 队伍积分 */
  teamPoints: string;
  // other
  createTime: number;
  createUser: string;
  updateTime: number;
  updateUser: string;
}

export interface ITeamPlayerVOs {
  /** 赛事队伍id */
  matchTeamId: number;
  /**  队员id */
  playerId: number;
  /** 队员名称 */
  playerName: number;
}

export interface IScheduleScoringInfoData extends IApiData {
  data: IScheduleScoringInfo;
}
export interface IScheduleScoringInfo {
  /** 主场球队 */
  homeCourtTeam: IHomeCourtTeam;
  /** 赛程id  */
  matchScheduleId: number;
  /** 客场球队 */
  opponentTeam: IHomeCourtTeam;
}
export interface IHomeCourtTeam {
  matchScheduleTeamPlayers: IScheduleTeamPlayerInfo[];
  matchTeamId: number;
  matchTeamName: string;
}
export interface IScheduleTeamPlayerInfo {
  playerId: number;
  playerTeamNum: number;
  playerName: string;
  /** 赛程阶段 */
  matchStageType: string; // 'UN_START', 'PART_ONE', 'PART_TWO', 'PART_THREE', 'PART_FOUR',
  // 'OVERTIME', 'FIRST_HALF', 'SECOND_HALF', 'END']
  matchTeamPlayerId: number;
  matchTeamPlmatchTeamIdayerId: number;
  /** 赛事球员比赛情况 */
  matchScheduleTeamPlayerActions: ISchedulePlayerActions[];
}
export interface ISchedulePlayerActions {
  id: number;
  failTimes: number;
  matchScheduleId: number;
  matchTeamPlayerId: number;
  matchStageType: string;
  successTimes: number;
  // 'ASSIST', 'BLOCK_SHOT', 'DEFENSIVE_REBOUND', 'OFFENSIVE_REBOUND', 'REBOUND', 'THREE_POINT_SHOT',
  // 'TWO_POINT_SHOT', 'FREE_THROW', 'STEAL', 'TURNOVER', 'FOUL']
  matchPlayerActionType: string;
}
