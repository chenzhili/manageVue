// import Vue from 'vue'
import Mock from 'mockjs'
// process.env.NODE_ENV === "development" ? Vue.use(Mock) : null;

import tableAPI from './money'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// 资金相关
Mock.mock(/\/money\/get/, 'get', tableAPI.getMoneyList)

export default Mock;