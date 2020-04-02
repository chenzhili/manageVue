import http, { methods } from '../http'

export default {
    
    getSalesTableList(params) {
        return http(methods.get, '/sales/get', params);
    },

}