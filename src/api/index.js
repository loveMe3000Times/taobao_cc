import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.defaults.baseURL = "http://192.168.127.1:3001"; // 配置axios请求的地址
axios.defaults.crossDomain = true
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = window.localStorage.getItem("Token");
        token && (config.headers.Token = token);
        const id = window.localStorage.getItem("Id");
        id && (config.headers.Id = id);
        return config;
    },
    error => {
        return Promise.error(error);
    }
);

axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response && response.status === 200) {
            let data = response.data;
            switch (data.code) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    Toast.fail("身份验证失败，请关闭重新进入。");
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast.fail("登录过期，请关闭重新进入。");
                    // 清除token
                    break;

                // 404请求不存在
                case 404:
                    Toast.fail("您访问的网页不存在。");
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    // Toast.fail(data.data.msg);
                    break;
            }
            return data;
        } else {
            Toast.fail("服务器出现问题，请联系管理员解决");
            return Promise.reject(response);
            // return { code: 404, data: { msg: "服务器出现问题，请联系管理员解决" } }
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.status) {
            return Promise.reject(error);
        }
    }
);

export default axios