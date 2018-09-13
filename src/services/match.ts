import http from '@/app/http';

export default {
  matchs(params: { pageSize: number, pageNum: number }) {
    return http.post('/api-liveapp/appMatch/list', params);
  },
};
