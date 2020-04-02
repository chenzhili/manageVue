import http, { methods } from '../http'

export default {
    
    login(params) {
        return http(methods.get, '/user/login', params);
    },

    
    logout(params) {
        return http(methods.get,'/user/logout', params)
    },

    
    getUserInfo(params) {
        return http(methods.get, '/user/info/get', params)
    },
    
    getUserList(params, cancelTokenIns) {
        return http(methods.post, '/user/list/get', params, cancelTokenIns)
    },
}



