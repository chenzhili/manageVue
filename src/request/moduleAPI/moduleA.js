/**
  * article模块接口列表
  */
 
import http, { methods } from '../http'

export default {
    // 新闻列表
    articleList(cancelTokenIns) {
        return http(methods.get, '/services', {}, cancelTokenIns);
    },
    // 新闻详情,演示
    articleDetail(id, params, cancelTokenIns) {
        return http(methods.get, '/topic', { id, ...params }, cancelTokenIns)
    },
    // post提交
    getList(params, cancelTokenIns) {
        return http(methods.post, '/services', params, cancelTokenIns)
    }
}

/* 这里 集成 axios 的需求
   1、如何集成 取消请求的 方法；
   2、断网处理 和 router 以及 vuex 一起用
   3、token 失效 的做法
   4、把这个 模块 以 插件的 方式 集成 到 vue 中 ，Vue.use()
*/
