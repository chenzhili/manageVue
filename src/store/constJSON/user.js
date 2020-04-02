export default Object.freeze({
    getters: {
        token: 'token',
        roles: 'roles',
        avatar: 'avatar',
        name: 'name',
        browserHeaderTitle: 'browserHeaderTitle'
    },
    mutations: {
        SET_ROLES: 'SET_ROLES',
        SET_BROWSERHEADERTITLE: 'SET_BROWSERHEADERTITLE',
        SET_NAME: 'SET_NAME',
        SET_AVATAR: 'SET_AVATAR'
    },
    actions: {
        LogOut: 'LogOut',
        ChangeRoles: 'ChangeRoles',
    }
})