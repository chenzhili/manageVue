import Vue from 'vue'
import '@/element';
import '@/registerServiceWorker'

import App from '@/App.vue'
import '@/request'

import router from '@/router'
import store from '@/store'

// mixin
// import reqMixin from './request/reqMixin'
import '@/request/reqMixin';

// 全局 注册 的 自定义组件
import '@/components/index'

// 数据模拟
import '@/mockjs'

// 权限的指令
import '@/directive/permission'

// i18n国际化
import i18n from "@/lang";

Vue.config.productionTip = false

new Vue({
  // mixins: [reqMixin],
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
