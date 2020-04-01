import { aModule } from './constJSON'
export default {
    namespaced: true,
    state:{
        countA:1
    },
    mutations:{
        [aModule.mutations.INCREMENT](state){
            state.countA++;
        }
    },
    actions:{
        async [aModule.actions.INCREMENT_ACTION_A](context){
            console.log(context);
        }
    },
    getters:{}
}