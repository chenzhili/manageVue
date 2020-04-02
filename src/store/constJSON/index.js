import aModule from './aModule'
import bModule from './bModule'
import permission from './permission'

export { aModule , bModule, permission };

export const parents = Object.freeze({
    mutations: {
        ADD_TO_CART: 'addToCart',
        CHANGE_NETWORK: 'changeNetwork',
        CHANGE_COUNT: 'changeCount'
    },
    actions: {

    }
})