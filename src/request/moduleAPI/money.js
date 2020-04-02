import http, { methods } from '../http'

export default {
    
    getMoneyIncomePay(params) {
        return http(methods.get, '/money/get', params);
    },

    
    addMoney(params) {
        return http(methods.get,'/money/add', params)
    },

    
    removeMoney(params) {
        return http(methods.get, '/money/remove', params)
    },
    
    batchremoveMoney(params, cancelTokenIns) {
        return http(methods.post, '/money/batchremove', params, cancelTokenIns)
    },

    updateMoney(params, cancelTokenIns) {
        return http(methods.get, '/money/edit', params, cancelTokenIns)
    }
}