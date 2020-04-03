/* 统一 全局 注册 组件 地方 */
import Vue from 'vue'
import RouterView from './RouterView.vue'
import IconSvg from './iconSvg/IconSvg.vue'
import BackTop from './backTop/index.vue'

function uniformRegister () {}

uniformRegister.install = () => {
    Vue.component(RouterView.name, RouterView);
    Vue.component(IconSvg.name, IconSvg);
    Vue.component(BackTop.name, BackTop);
}

Vue.use(uniformRegister);