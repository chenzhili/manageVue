export default Object.freeze({
    state: {
        USER_INFO : 'userInfo'
    },
    getters: {
       permission_routers: 'permission_routers',
       addRouters: 'addRouters',
       topRouters: 'topRouters',
       topTitle: 'topTitle',
       menuIndex: 'menuIndex'
    },
    mutations: {
        SET_ROUTERS: 'SET_ROUTERS',
        CLICK_INNER_LEFT_MENU: 'CLICK_INNER_LEFT_MENU',
        CLICK_TOP_MENU: 'CLICK_TOP_MENU'
    },
    actions: {
        GENERATE_ROUTES: 'GenerateRoutes',
        CLICK_LEFT_INNER_MENU: 'ClickLeftInnerMenu',
        CLICK_TOP_MENU: 'ClickTopMenu'
    }
})