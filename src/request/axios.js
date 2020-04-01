/**
  * axios封装
  * https://blog.csdn.net/qq_40128367/article/details/82735310
  * 请求拦截、响应拦截、错误统一处理
  */

import axios from 'axios';
import router from '../router';
import store from '../store';
// 这个要用 element-ui 替代
// import { Toast } from 'vant';
import Vue from 'vue';

import { parents } from '../store/constJSON'

import { errorRequest } from './baseURL'

/* axios 的理解
    1、可以先做默认 设置 ，来代替 每个 请求的 配置；
        这里就出现了一个 优先级：
            The order is library defaults found in lib/defaults.js, then defaults property of the instance, and finally config argument for the request
            翻译：node_modules/axios/lib/defaults.js < instance的默认配置 < 请求实例的 配置
    2、在 请求 或者 相应 发出的时候，都有 钩子 可以 做 一些事情
        const myInterceptor = axios.interceptors.request.use(callback);
        // 取消拦截
        axios.interceptors.request.eject(myInterceptor);
        axios.interceptors.response.use(callback);

    3、自定义 状态码 抛出错误 => validateStatus 

    4、阻止当前的 请求

*/
/**
  * 提示函数
  * 禁止点击蒙层、显示一秒后关闭
  */
const tip = (msg, type) => {
    Vue._message({
        message: msg,
        type: type,
        showClose: true,
    })

}

/**
  * 跳转登录页
  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  */
const toLogin = () => {
    router.replace({
        path: '/login',
        // 目前不需要重定向上个页面
        /* query: {
            redirect: router.currentRoute.fullPath
        } */
    });
}

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
  */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录', 'warning');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在', 'error');
            break;
        default:
            console.log(other);
    }
}

// 创建axios实例
// 这里实例 不需要 加入 baseURL 可能 ，不然灵活性不高
var instance = axios.create({ timeout: 1000 * 10 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function changeNetWorkStatus(boolean) {
    boolean = boolean == undefined ? true : boolean;
    const network = store.state.network;
    console.log(network);
    if (boolean && network === false) {
        store.commit(parents.mutations.CHANGE_NETWORK, boolean);
    }
}
/**
  * 请求拦截器
  * 每次请求前，如果存在token则在请求头中携带token
  * 如果 当前 请求的 网络状态 是 未联网状态，请求的 时候默认为  联网
  */
instance.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        changeNetWorkStatus();
        return config;
    },
    error => {
        changeNetWorkStatus();
        return Promise.error(error);
    })

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    // 这里 成功可能不只是这个状态码
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            let errorMess = error.toString().toLocaleLowerCase();
            // 对于断网的问题
            switch (errorMess) {
                // 当前请求取消的时候
                case 'cancel':
                    return Promise.reject(error);
                case 'error: network error':
                    store.commit(parents.mutations.CHANGE_NETWORK, false);
                    break;
                default:
                    console.log('其他错误', error);
            }
        }
    });
export const CancelToken = axios.CancelToken;

export default instance;
