import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  month: beforeMonth(),
  city:'A33',
  loadinShow:false
}
const getters = {
  month (state) {
    return state.month
  },
  city () {
    return state.city
  },
  loadinShow () {
    return state.loadinShow
  }
}
const mutations = {
  setMonth (state, param) {
    state.month = param
  },
  setCity (state, param) {
    state.city = param
  },
  setLoadShow(state, param){
    state.loadinShow = param
  }
}
const actions = {
  monthAction (context, param) {
    context.commit('setMonth', param)
  },
  cityAction(context, param){
    context.commit('setCity', param)
  },
  loadAction(context, param){
    context.commit('setLoadShow', param)
  }
}
var vuexStore = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})


function beforeMonth () {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 3) {
    year -= 1
    month = 10 + month
  } else {
    month = month - 2
  }
  return month < 10 ? `${year}0${month}` : `${year}${month}`
}
export default vuexStore
