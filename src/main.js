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

Vue.config.productionTip = false

new Vue({
  // mixins: [reqMixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
