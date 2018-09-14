import http from '@/app/http';

export default {
  getUserInfo(params: { pageSize: number, pageNum: number }) {
    return http.post('/api-liveapp/appUser', params);
  },
  editUserHeadImg(headImg: string) {
    return http.put(`/appUser/editUserHeadImg/${headImg}`);
  },
  editUserName(userName: string) {
    return http.put(`/appUser/editUserName/${userName}`);
  },
};
