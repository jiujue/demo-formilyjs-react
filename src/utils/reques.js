import axios from 'axios';
import { message } from 'antd';

const httpCode = { // 这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
};

const instance = axios.create({
  timeout: 3000, // 设置超时时间10s
  baseURL: '',
});

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) { // 判断token是否存在
      config.headers.Authorization = localStorage.getItem('token'); // 将token设置成请求头
    }
    return config;
  },
  (err) => Promise.reject(err),
);
/** 添加响应拦截器  * */
instance.interceptors.response.use((response) => {
  if (response.status === 200) { // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
    return Promise.resolve(response.data);
  }
  message.error('响应超时');
  return Promise.reject('响应超时');
}, (error) => {
  // hide();
  if (error.response) {
    // 根据请求失败的http状态码去给用户相应的提示
    const tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
    message.error(tips);
    if (error.response.status === 401) {
      // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
      // 针对框架跳转到登陆页面
      this.props.history.push('/login');
    }
    if (error.response.status === 400 && error.response.config.url.endsWith('login')) {
      message.error(error.response.data.msg);
    }
    return Promise.reject(error);
  }
  message.error('请求超时, 请刷新重试');
  return Promise.reject('请求超时, 请刷新重试');
});

/* 统一封装get请求 */
export const get = (url, params, config = {}) => new Promise((resolve, reject) => {
  instance({
    method: 'get',
    url,
    params,
    ...config,
  }).then((response) => {
    resolve(response);
  }).catch((error) => {
    reject(error);
  });
});

/* 统一封装post请求  */
export const post = (url, data, config = {}) => new Promise((resolve, reject) => {
  instance({
    method: 'post',
    url,
    data,
    ...config,
  }).then((response) => {
    resolve(response);
  }).catch((error) => {
    reject(error);
  });
});

export default instance;
