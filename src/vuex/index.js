import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
// import * as action from './action'

Vue.use(Vuex)

const state = {
  login: false,
  userPower: '',
  usermsg: {}
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
