import Vue from 'vue'

const requireModule = require.context("./moduleAPI", true, /.js$/);

const httpModuleConfig = {};
const reg = /^\.\/([\S\s]+)\.js$/;
let key = null;
requireModule.keys().forEach(rc => {
    console.log(rc);
    key = rc.replace(reg, '$1');
    httpModuleConfig[key] = requireModule(rc).default;
});

httpModuleConfig.install = function () {
    Object.defineProperty(Vue.prototype, '$http', {
        get() {
            return httpModuleConfig;
        }
    })
}
Vue.use(httpModuleConfig);

