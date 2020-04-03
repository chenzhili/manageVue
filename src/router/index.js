import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
process.env.NODE_ENV === "development" && import('nprogress/nprogress.css')

import { type } from '../utils'

import config, { asyncLoadRoutes } from './config'

import store from '../store';
import { permission, user } from '../store/constJSON'
import User from "@/request/moduleAPI/user";

const {getUserInfo} = User;
import {
  setTitle
} from '@/utils/mUtils' // 设置浏览器头部标题

// 布局
import { Layout } from "@/layout";


import { getToken } from '@/utils/auth' // 验权(从cookie中获取)
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true 
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login'] // 不重定向白名单

Vue.use(VueRouter);

/* 这里 处理 config 获取到的 配置 */
const modules = {};
const reg = /^\.\/([\S\s]+)/;
let key;

const requireModules = require.context("../views", true, /.vue$/);
requireModules.keys().forEach(rc => {
  key = rc.replace(reg, '$1');
  if (rc.indexOf('vue') !== -1) {
    modules[key] = requireModules(rc).default;
  }
});

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
      tempObj.name = type(target.keyword.slice(0, 1)) === 'string' ? `${target.keyword.slice(0, 1).toLocaleUpperCase()}${target.keyword.slice(1)}` : target.keyword;
    }

    // 判断 当前 渲染 的是 单个组件 还是 视图型组件
    if (target.components) {
      if (type(target.components) === 'array' && target.components.length) {

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

const routesNews = resultRoutes(config);

/* 配置 首次进入 时 匹配的 从定向 */

routesNews.unshift({
  path: '/',
  component: Layout,
  redirect: '/index/index'
});

/* 断网的刷新页面 */
routesNews.push({
  path: '/refresh',
  name: 'Refresh',
  component: () => import('@/views/errorPage/NoNetWork.vue')
});

/* 访问权限页面 */
routesNews.push({
  path: '/401',
  name: '401',
  component: () => import('@/views/errorPage/401.vue')
});
/* 页面不存在 */
routesNews.push({
  path: '/404',
  name: '404',
  component: () => import('@/views/errorPage/404.vue')
});

console.log(routesNews);
const router = new VueRouter({
  routes: routesNews
});


/* 真实的 权限加载的路由 */
export const asyncRouterMap = [...resultRoutes(asyncLoadRoutes)];

/* 真实的 同步 路由 */
export const constantRouterMap = [...routesNews];

console.log(constantRouterMap);


// 路由进入 的 钩子
router.beforeEach((to, from, next) => {
  // 设置浏览器头部标题
  const browserHeaderTitle = to.meta.title
  store.commit(user.mutations.SET_BROWSERHEADERTITLE, {
    browserHeaderTitle: browserHeaderTitle
  })
  console.log('before to');
 // 点击登录时，拿到了token并存入了cookie,保证页面刷新时,始终可以拿到token
 if (getToken('Token')) {
   if(to.path === '/login') {
    //  next({ path: '/' })  
    next();
     NProgress.done() 
   } else {
     // 用户登录成功之后，每次点击路由都进行了角色的判断;
     if (store.getters.roles.length === 0) {
       let token = getToken('Token');
      //  getUserInfo({"token":token}).then().then(res => { // 根据token拉取用户信息
      //    let userList = res.data.data.userList;
      //    store.commit(user.mutations.SET_ROLES, userList.roles);
      //    store.commit(user.mutations.SET_NAME, userList.name);
      //    store.commit(user.mutations.SET_AVATAR, userList.avatar);
      //    store.dispatch(permission.actions.GENERATE_ROUTES, { "roles":userList.roles }).then(() => { // 根据roles权限生成可访问的路由表
      //      //router.addRoutes(store.getters.addRouters) // 动态添加可访问权限路由表
      //      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      //    })
      //  }).catch((err) => {
      //    store.dispatch(user.actions.LogOut).then(() => {
      //      Vue._message.error(err || 'Verification failed, please login again')
      //      next({ path: '/' })
      //    })
      //  })
      next();
     } else {
       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
       if (hasPermission(store.getters.roles, to.meta.roles)) {
         next()//
       } else {
         next({ path: '/401', replace: true, query: { noGoBack: true }})
       }
     }
   }
 } else {
   if (whiteList.indexOf(to.path) !== -1) {
     // 点击退出时,会定位到这里
     next()
   } else {
     next('/login')
     NProgress.done()
   }
 }
})
// 路由 退出的 钩子
router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)

})

export default router
