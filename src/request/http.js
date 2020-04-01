/**
  * article模块接口列表
  */

import base from './baseURL'; // 导入接口域名列表
import axiosIns, { CancelToken } from './axios'; // 导入axios中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import { type } from '../utils'

export const methods = Object.freeze({
    get: 'get',
    post: 'post'
})

// 匹配当前是否是 绝对路径
const regURL = /^http:/;
// 匹配当前是否 存储了当前 request 的 cancelToken
const regCancelToken = /reqins$/;

function http(method, url, params, ...others) {
    if (!regURL.test(url)) {
        url = `${base.baseURL}${url}`
    }
    params = params ? params : {};
    let config = {};
    let cancelTokenIns = null;
    
    if (others.length) {
        cancelTokenIns = others.filter(item => (type(item) === 'function' && regCancelToken.test(item.name.toLocaleLowerCase())))[0];
        
        if (cancelTokenIns) {
            config.cancelToken = new CancelToken((cancel) => {
                cancelTokenIns(cancel);
            });
        }
        // 这里 可能还需要处理 其他的 参数值
    }
    // console.log(url);

    if (method === methods.get) {
        config.params = params;
        return axiosIns.get(url, config, {
            
        });
    }

    // config = {...config, ...params};//qs.stringify(params)
    return axiosIns.post(url, params, config)

}
export default http;

/* 这里 集成 axios 的需求
   1、如何集成 取消请求的 方法；
   2、断网处理 和 router 以及 vuex 一起用
   3、token 失效 的做法
   4、把这个 模块 以 插件的 方式 集成 到 vue 中 ，Vue.use()
*/
