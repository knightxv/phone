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
};
