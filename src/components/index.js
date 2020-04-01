/* 统一 全局 注册 组件 地方 */
import Vue from 'vue'
import RouterView from './RouterView.vue'

function uniformRegister () {}

uniformRegister.install = () => {
    Vue.component(RouterView.name, RouterView);
}

Vue.use(uniformRegister);