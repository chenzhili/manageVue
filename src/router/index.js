import Vue from 'vue'
import VueRouter from 'vue-router'
import { type } from '../utils'

import config from './config'

Vue.use(VueRouter);

/* 这里 处理 config 获取到的 配置 */
const requireModules = require.context("../views", true, /.vue$/);
const reg = /^\.\/([\S\s]+)/;
const modules = {};
let key;
requireModules.keys().forEach(rc => {
  console.log(rc);
  key = rc.replace(reg, '$1');
  if (rc.indexOf('vue') !== -1) {
    modules[key] = requireModules(rc).default;
  }
});
console.log(modules);

function resultRoutes(config) {
  if (type(config) !== 'array' || !config.length) { return []; }
  const routes = [];
  recurseRouter(config, routes, true);
  return routes;
}
function recurseRouter(targets, result, root) {
  if (!targets.length) { return result; }
  let tempObj, params;
  targets.forEach((target) => {
    tempObj = {};
    params = '';
    // 对于 url 参数的 处理
    if (target.query) {
      if (type(target.query) === 'string') {
        params += `/:${target.query}`;
      }
      if (type(target.query) === 'array') {
        target.query.forEach(q => { params += `/:${q}` })
      }
    }

    tempObj.path = root === true ? `/${target.keyword}${params}` : `${target.keyword}${params}`;
    if (root === true) {
      tempObj.name = `${target.keyword.slice(0, 1).toLocaleUpperCase()}${target.keyword.slice(1)}`
    }

    // 判断 当前 渲染 的是 单个组件 还是 视图型组件
    if (target.components) {
      if (type(target.components) === 'array' && target.components.length) {
        /* map 对于 遍历获取的时候，只能获取 enumerable 的 值，所以 对于 vue 的实例 可能 不支持，目前看来 是应为 数据 结构 有问题 */
        /* tempObj.components = target.components.map((com, i) => {
          const key = i === 0 ? 'default' : com.viewName;
          const value = com.async === false ? modules[com.component] : () => import(`@/views/${com.component}`);
          // return { [key]: value};
          const obj = { [key]: value};
          console.log(obj);
          return obj;
        }); */
        // 编译后也有问题
        const len = target.components.length;
        let i = 0;
        tempObj.components = {};
        let com;
        while (i < len) {
          com = target.components[i];
          // 这里循环 import 的时候 出现，引用的 文件 是 同一个 文件 , 这里的原因 是 由于 在 import() 出现 变量的 时候，一律 当成 *  号处理的 正则，其实 这里 循环的 import 中 的  内容 是一样的
          // tempObj.components[i === 0 ? 'default' : com.viewName] = (com.async === false ? modules[com.component] : () => import(`@/views/${com.component}`));
          tempObj.components[i === 0 ? 'default' : com.viewName] = modules[com.component];
          i++;
        }
      }

      if (type(target.components) === 'object') {
        tempObj.components = target.components;
      }

    } else {
      tempObj.component = (target.async === false ? modules[target.component] : target.component);
    }

    // 对于 当前 如果 有 子视图的 操作

    if (target.children && type(target.children) === 'array' && target.children.length) {
      tempObj.children = [];
      recurseRouter(target.children, tempObj.children)
    }

    // 如果还有其他的参数 直接放进去； 目前先 简单点，后期 如果 参数多了，在 批量处理
    if (type(target.beforeEnter) === 'function') {
      tempObj.beforeEnter = target.beforeEnter;
    }
    if (type(target.redirect === 'string')) {
      tempObj.redirect = target.redirect;
    }

    result.push(tempObj);
  });
}

// const routes = [
//   {
//     path: '/home/:id/:test',
//     name: 'Home',
//     components: {
//       default: () => import(`${'../views/Home.vue'}`),
//       about: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

//     }
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ];

// console.log(routes);

const routesNews = resultRoutes(config);

/* 配置 首次进入 时 匹配的 从定向 */
routesNews.unshift({
  path: '*',
  redirect: '/home/1/1'
});

/* 断网的刷新页面 */
routesNews.push({
  path: '/refresh',
  name: 'Refresh',
  component: () => import('@/views/NoNetWork.vue')
});

console.log(routesNews);
const router = new VueRouter({
  routes: routesNews
});
// 路由进入 的 钩子
router.beforeEach((to, from, next) => {
  // ...
  // 钩子的 完成 需要 用到的 resolve
  next();
})
// 路由 退出的 钩子
router.afterEach((to, from) => {
  // ...

})

export default router
