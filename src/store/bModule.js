import { bModule } from './constJSON'
export default {
    state:{
        countB:1
    },
    mutations:{
        [bModule.mutations.INCREMENT](state){
            state.countB++;
        }
    },
    actions:{
        async [bModule.actions.INCREMENT_ACTION_A](context){
            console.log(context);
        }
    },
    getters:{}
}