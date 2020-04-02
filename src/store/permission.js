import { permission } from './constJSON'
export default {
    state:{
        [permission.state.USER_INFO]: {
            token: '',
            del: true,
        }
    },
    mutations:{
        [permission.mutations.CHANGE_AUTH] (state, type) {
            console.log(2312312313);
            if (state[permission.state.USER_INFO][type] != null) {
                state[permission.state.USER_INFO][type] = false;
            }
        }
    },
    actions:{
        
    },
    getters:{

    }
}