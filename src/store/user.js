
import * as mUtils from '@/utils/mUtils'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { user } from './constJSON'

import User from '@/request/moduleAPI/user'  // 导入用户信息相关接口

const {logout, getUserInfo} = User;

export default {
    state: {
        name: '',
        avatar: '',
        token: getToken('Token'),
        roles: [],
        browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '小爱Admin'
    },
    getters: {
        [user.getters.token]: state => state.token,
        [user.getters.roles]: state => state.roles,
        [user.getters.avatar]: state => state.avatar,
        [user.getters.name]: state => state.name,
        [user.getters.browserHeaderTitle]: state => state.browserHeaderTitle,
    },
    mutations: {
        [user.mutations.SET_ROLES]: (state, roles) => {
            state.roles = Object.assign([], roles);
        },
        [user.mutations.SET_BROWSERHEADERTITLE]: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        },
        [user.mutations.SET_NAME]: (state, name) => {
            state.name = name
        },
        [user.mutations.SET_AVATAR]: (state, avatar) => {
            state.avatar = avatar
        }
    },
    actions: {
        //登出
        [user.actions.LogOut]({ commit, reqData }) {
            return new Promise((resolve, reject) => {
                logout(reqData).then(response => {
                    commit('SET_ROLES', [])
                    removeToken('Token')
                    resolve()
                })
            })
        },
        // 动态修改权限;本实例中,role和token是相同的;
        [user.actions.ChangeRoles]({ commit }, role) {
            return new Promise(resolve => {
                const token = role;
                setToken("Token", token)
                getUserInfo({ "token": token }).then(res => {
                    let data = res.data.userList;
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    resolve()
                })
            })
        },

    }
}