import { loginAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null,
    data: {}

  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_DATA(state, data) {
      state.data = data
    }

  },
  actions: {
    async LOGIN_ACTION({ commit }, data) {
      const res = await loginAPI(data)git
      commit('SET_TOKEN', res.data.token)
      commit('SET_DATA', res.data)
    }
  },
  getters: {

  }
}

