
import {menu} from './constJSON'

export default { 
    state :{
        minLeftMenuWidth:35,
        maxLeftMenuWidth:180,
        sidebar: {
            opened: true,  
            width: 180
        },
        isCollapse:false, // 菜单默认展开
        isFooter:false
    },
    getters : {
        sidebar:state => state.sidebar,
        isCollapse:state => state.isCollapse,
        isFooter:state => state.isFooter
    },
    mutations:{
        [menu.mutations.HANDLE_LEFT_MENU] (state) {  
            if(state.sidebar.opened){//true
                state.sidebar.width = state.minLeftMenuWidth;
            }else{
                state.sidebar.width = state.maxLeftMenuWidth;
            }
           state.sidebar.opened = !state.sidebar.opened
        },
        [menu.mutations.INIT_LEFT_MENU] (state) {  
            state.sidebar = Object.assign({}, state.sidebar)
        },
        [menu.mutations.SET_LEFT_COLLAPSE] (state) {  
            state.isCollapse = !state.isCollapse 
        },
        [menu.mutations.SET_FOOTER_SHOW] (state) {  
            state.isFooter = true
        }
       
    },
    actions:{
        handleLeftMenu:({ commit }) => {  
           commit(menu.mutations.HANDLE_LEFT_MENU)  
        },
        initLeftMenu:({ commit }) => {  
           commit(menu.mutations.INIT_LEFT_MENU)  
        },
        setLeftCollapse:({ commit}) => {  
           commit(menu.mutations.SET_LEFT_COLLAPSE)  
        }
    }
    
}