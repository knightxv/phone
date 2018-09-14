import http from '@/app/http';

export default {
  getUserInfo() {
    return http.get('/api-liveapp/appUser');
  },
  editUserHeadImg(headImg: string) {
    return http.put(`/api-liveapp/appUser/editUserHeadImg?headImg=${headImg}`);
  },
  editUserName(userName: string) {
    return http.put(`/api-liveapp/appUser/editUserName/${userName}`);
  },
};
