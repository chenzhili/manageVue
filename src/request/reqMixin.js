import Vue from 'vue'
import { type } from '../utils'
const requestMixin = {
    data() {
        return {
            // 存储所有 request 的 请求 cancelToken
            reqTokenInsConfig: {},
        }
    },
    destroyed () {
        /* 统一加入 对于 当前组件销毁 ，如果 有 未完成的 请求 直接取消掉 */
        let reqIns = null;
        Object.keys(this.reqTokenInsConfig).forEach(key => {
            reqIns = this.reqTokenInsConfig[key];
            type(reqIns) === 'function' && reqIns();
        })
    }
}
/* 目前用 全局混入的方式去做 */
Vue.mixin(requestMixin);



