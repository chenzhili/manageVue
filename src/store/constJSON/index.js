import aModule from './aModule'
import bModule from './bModule'
import permission from './permission'
import menu from './menu'
import user from './user'

export { aModule , bModule, permission, menu, user };

export const parents = Object.freeze({
    mutations: {
        ADD_TO_CART: 'addToCart',
        CHANGE_NETWORK: 'changeNetwork',
        CHANGE_COUNT: 'changeCount'
    },
    actions: {

    }
})