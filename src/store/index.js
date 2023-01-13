import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    routeStatus: {
      userName: '',
      routeName: '',
      category: ''
    }
  },
  getters: {
    getIsAuthenticated: function (state) {
      return state.isAuthenticated
    },
    getRouteStatus: function (state) {
      return state.routeStatus
    }
  },
  mutations: {
    setIsAuthenticated: function (state, newVal) {
      state.isAuthenticated = newVal
    },
    setRouteStatus: function (state, newVal) {
      state.routeStatus = newVal
    }
  },
  actions: {},
  modules: {}
})
