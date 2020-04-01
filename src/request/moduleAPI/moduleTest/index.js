/**
  * moduleTest 多模块的请求
  */

 import http, { methods } from '../../http'

 export default {
     // 新闻列表
     testList(cancelTokenIns) {
         return http(methods.get, '/test', {}, cancelTokenIns);
     },
     // 新闻详情,演示
     testDetail(id, params, cancelTokenIns) {
         return http(methods.get, '/testTopic', { id, ...params }, cancelTokenIns)
     },
     // post提交
     test(params, cancelTokenIns) {
         return http(methods.post, '/testAccesstoken', params, cancelTokenIns)
     }
 }

 