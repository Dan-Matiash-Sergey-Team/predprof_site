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
            state.accessToken = payload.access
        },
        newRefresh(state, payload) {
            state.refreshToken = payload.refresh
        },
        addRecord(state, payload){
            state.records.push(payload)
        },
        editRecord(state, payload){
          state.records[state.records.length-1] = payload
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
