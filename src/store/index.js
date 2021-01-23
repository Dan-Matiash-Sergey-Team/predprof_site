import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {
      logged: false,
      username: '',
      password: ''
    }
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    userData: state => state.userData
  }
});
