/**
 * Created by bootdo.
 */
import axios from 'axios';
import store from '../stores/store';
import localVue from '../main';
import { Toast } from 'mint-ui';

// http://21b97p5647.imwork.net:32799 http://192.168.1.10:8002
const baseURL: string = 'http://192.168.1.10:8012';
import { IApiData } from '../services/apiDataType';
import { globalEvent, serverCode } from './typeDef';

// axios.defaults.timeout =  60000;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 配置请求头

interface IApiRes {
  code: number;
  currentTime: string;
  data: any;
  msg: string;
}


// 添加一个请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    // const usrInfo = (store.state as any).userInfo;
    // if (!usrInfo || !usrInfo.token) {
    //     return config;
    // }
    // config.headers.Authorization = usrInfo.token;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
// 添加一个响应拦截器
axios.interceptors.response.use(
    (response: any) => {
      const res: IApiRes = response.data;
      if (!res) {
        return Promise.reject('发生未知错误');
      }
      if (res.code === serverCode.NO_LOGIN_ERROR_CODE) {
        localVue.$emit(globalEvent.NO_LOGIN);
      }
      return response;
    },
    (error: any) => {
        // Do something with response error
        return Promise.reject(error);
    },
);

class Http {
    resolveResponse(requestPromise: Promise<any>, url: string, type: string): Promise<IApiData> {
        return requestPromise
        .then((res) => res.data)
        .then((res: IApiRes) => {
            console.group(`response[${type}]:${url}`);
            console.log('data :', res);
            console.groupEnd();
            if (res == null) {
                return {
                    isSuccess: false,
                    errMsg: '发生未知错误',
                    data: null,
                };
            }
            if (res.code !== serverCode.SUCCESS) {
                return {
                    isSuccess: false,
                    errMsg: res.msg,
                    data: null,
                };
            }
            return {
                isSuccess: true,
                data: res.data,
            };
        })
        .catch((err: Error) => {
            console.log(err);
            return {
                isSuccess: false,
                errMsg: '服务器请求异常',
                data: null,
            };
        })
        .then((res: IApiData) => {
            if (!res.isSuccess) {
              Toast({
                    message: res.errMsg,
                    duration: 2000,
                });
            }
            return res;
        });
    }
    public post(url: string, params?: any): Promise<IApiData> {
        console.group(`request[post]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
        return this.resolveResponse(axios.post(`${baseURL}${url}`, params), url, 'post');
    }
    public get(url: string, params?: any): Promise<IApiData> {
        console.group(`request[get]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
        return this.resolveResponse(axios.get(`${baseURL}${url}`, {
            params,
        }), url, 'get');
    }
    public put(url: string, params?: any): Promise<IApiData> {
        console.group(`request[put]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
        return this.resolveResponse(axios.put(`${baseURL}${url}`, params), url, 'put');
    }
    public delete(url: string, params?: any): Promise<IApiData> {
        console.group(`request[delete]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
        return this.resolveResponse(axios.delete(`${baseURL}${url}`, {
            params,
        }), url, 'delete');
    }
    public patch(url: string, params?: any): Promise<IApiData> {
        console.group(`request[patch]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
        return this.resolveResponse(axios.patch(`${baseURL}${url}`, params), url, 'patch');
    }
}

export default new Http();
