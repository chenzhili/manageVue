import { permission } from './constJSON'
/* 这里执行的时候顺序有问题，这里 拿不到值 */
import { asyncRouterMap, constantRouterMap } from '@/router/index'

console.log('permission核心加载');

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    // roles为权限身份数组
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    // 返回满足条件的子路由对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                // route.children重新过滤赋值;
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true // 返回该权限路由对象;
        }
        return false
    })
    return accessedRouters
}

export default {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        topRouters: [],
        topTitle: '',
        menuIndex: 0
    },
    getters: {
        [permission.getters.permission_routers]: state => state.routers, // 所有路由
        [permission.getters.addRouters]: state => state.addRouters,  // 权限过滤路由
        [permission.getters.topRouters]: state => state.topRouters,  // 顶部三级路由
        [permission.getters.topTitle]: state => state.topTitle, // 顶部的title
        [permission.getters.menuIndex]: state => state.menuIndex, // 顶部菜单的index
    },
    mutations: {
        [permission.mutations.INIT_ROUTES] (state, routes) {
            console.log('这里吗', routes);
            // 这里 用 Object.assign 有问题，可能 是有 这个 路由 是 由于 vueRouter 把它进行包装，内部状态在外部 让他发生了变化；
            state.routers = JSON.parse(JSON.stringify(routes))
        },
        [permission.mutations.SET_ROUTERS]: (state, routers) => {
            state.addRouters = Object.assign([], routers) // 权限路由
            state.routers = Object.assign([], constantRouterMap.concat(routers)) // 总路由
        },
        [permission.mutations.CLICK_INNER_LEFT_MENU]: (state, data) => { // titleList:arr
            state.topRouters = Object.assign([], data.titleList);
        },
        [permission.mutations.CLICK_TOP_MENU]: (state, data) => {
            state.topTitle = data.title
            state.menuIndex = data.menuIndex

        },
    },
    actions: {
        // 根据角色，重新设置权限路由;并保存到vuex中,SET_ROUTERS;
        [permission.actions.GENERATE_ROUTES]({ commit }, data) {
            return new Promise(resolve => {
                let roles = data.roles;
                let accessedRouters = '';
                if (roles.indexOf('admin') >= 0) {
                    // 如果是管理员，直接将权限路由赋值给新路由;
                    accessedRouters = asyncRouterMap
                } else {
                    // 非管理员用户,如roles:['editor','developer']，则需要过滤权限路由数据
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        },
        [permission.actions.CLICK_LEFT_INNER_MENU]({ commit }, data) {
            commit('CLICK_INNER_LEFT_MENU', data)
        },
        [permission.actions.CLICK_TOP_MENU]({ commit }, data) {
            commit('CLICK_TOP_MENU', data)
        }
    }
}
