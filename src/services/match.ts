import http from '@/app/http';

export default {
  matchs(params: { pageSize: number, pageNum: number }) {
    return http.post('/api-liveapp/appMatch/list', params);
  },
  detail(matchId: number) {
    return http.get(`/api-liveapp/appMatch/${matchId}`);
  },
  getSchedules(matchId: number) {
    return http.get(`/api-liveapp/appMatchSchedule/${matchId}`);
  },
  getTeams(matchId: number) {
    return http.get(`/api-liveapp/appMatchTeam/${matchId}`);
  },
  getSchedule(scheduleId: number) {
    return http.get(`/api-liveapp/appMatchSchedule/detail/${scheduleId}`);
  },
  /** 获取赛程分数 */
  getMatchScheduleCount(matchScheduleId: number, matchPlayerActionTypes: string[]) {
    return http.post(`/api-liveapp/appMatchData/matchScheduleCount`, {
      matchPlayerActionTypes,
      matchScheduleId,
    });
  },
  /** 赛事幻灯片列表 */
  matchScheduleSlideshow(matchScheduleId: string) {
    return http.get(`/api-liveapp/appMatchScheduleSlideshow/${matchScheduleId}`);
  },
};
