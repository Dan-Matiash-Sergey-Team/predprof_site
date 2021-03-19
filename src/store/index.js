import {createStore} from "vuex";

export default createStore({
    state: {
        accessToken: '',
        refreshToken: '',
        records: [],
        logged: false,
        
    },
    mutations: {
        newAccess(state, payload) {
            state.logged = true
            state.accessToken = payload
        },
        newRefresh(state, payload) {
            state.refreshToken = payload
        },
        addRecord(state, payload){
            state.records.push(payload)
        },
        editRecord(state, payload){
            let a = 0
            for(let i=0;i<state.records.length;i++){
                if(state.records[i].date === payload.date){
                    a = i;
                    break
                }
            }
            state.records[a] = payload
        },
        setRecords(state, payload){
            state.records = payload
        }
    },
    actions: {},
    modules: {},
    getters: {
        access: state => state.accessToken,
        refresh: state => state.refreshToken,
        records: state => state.records,
        logged: state => state.logged
    }
});
