/* 
  这是 store 封装的 解决方案
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import { parents } from './constJSON'

// import  引入
import user from './user'
import aModule from './aModule'
import bModule from './bModule'
import menu from './menu'
import permission from './permission'
// const modules = {user, aModule, bModule, menu, permission};
// console.log(process.env.NODE_ENV);

/* 
  这里注释哈，对于 store 中的 所有 数据，如果 过多，可以 分 文件夹下的 不同 文件的 mutations,actions,state... 等 进行 文件的管理引入，目前不需要；

*/
const requireModule = require.context("./", true, /.js$/);
const modules = {};
const reg = /^\.\/index//* , nameReg = /^[\w\W]+?\/([a-zA-Z_]+)\.js$/ */;
const nameReg = /^\.\/([\S\s]+)\.js$/;
let module;
let moduleName = '';
requireModule.keys().forEach(rc => {
  moduleName = rc.replace(nameReg, '$1');
  if (reg.test(rc) === false && rc.indexOf('constJSON') === -1) {
    module = requireModule(rc).default;
    console.log("执行");
    modules[moduleName] = module;
  }
})
export default new Vuex.Store({
  // 严格按照 commit 的方法进行 state 的修改，不然会报错
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state: {
    count: 1,
    network: true,
    list: [{ title: "test", id: '12323' }],
  },

  // 这个是唯一能够改变 state 状态的 地方
  mutations: {
    [parents.mutations.CHANGE_NETWORK](state, status) {
      console.log(status);
      status = status == null ? true : status;
      state.network = status;
    },
    [parents.mutations.CHANGE_COUNT](...args) {
      console.log(args);
      // console.log(state);
      // state.count++;
    },
    [parents.mutations.ADD_TO_CART](state) {
      state.list.push({ title: "aaaa", id: "2" });
    },

    // // 测试 用的 写的不是很严格
    // changeAuth(state, boolean = false) {
    //   state.auth = boolean;
    // }
  },

  // 跟 vue 实例 内的 computed 一样，但是 当他 (state,getters)=>params=>fun 这时候 不会 缓存
  getters: {},

  // 这里 做 异步 状态 的请求 和 控制 
  actions: {},

});

