import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";

//需要区分当前环境(deveLopment)还是生产环境(productione)
let ispro = process.env.NODE_ENV === "production";

const http = axios.create({
  baseURL: ispro ? "http://116.63.172.55:8089/online" : "http://192.168.112.32:8001/online", //http://192.168.112.32:8001/online
  timeout: 10000,
});

//请求拦截
http.interceptors.request.use((config) => {
  nprogress.start()
  //配置token token是鉴权的一种方式
  //在登陆成功之后 会返回当前用户的token 存本地
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => {
  nprogress.done()
  return Promise.reject(err)
});


//响应拦截
http.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    nprogress.done();
    //请求失败
    let stutas = err.response && err.response.status;
    //状态码
    if (stutas === 400) {
      Message.error("参数错误");
    }
    if (stutas === 401) {
      Message.error("没有权限");
    }
    if (stutas === 403) {
      Message.error("登陆过期");
    }
    if (stutas === 404) {
      Message.error("路径错误");
    }
    if (stutas === 500) {
      Message.error("服务器错误");
    }
    if (stutas === 503) {
      Message.error("服务器在维护");
    }
  }
);

export default http
