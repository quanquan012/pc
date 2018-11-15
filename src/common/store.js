import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters:{
    token(state){
      if(!state.token){
        state.token = sessionStorage.getItem('token')
      }
      return state.token
    }
  },
  mutations: {
    set_token (state, token) {
      sessionStorage.setItem('token',token)
      state.token = token
    },
    del_token (state) {
      sessionStorage.removeItem('token')
      state.token = ''
    }
  }
})
