import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:sessionStorage.getItem("name"),
    mobile:sessionStorage.getItem("mobile"),
    ticketType:'',
    ticketType2:'',
  },
  getters: {
  },
  mutations: {
    login(state,user){
      state.name=user.name
      state.mobile=user.mobile

      //session 存储的数据，在刷新后不会消失
      sessionStorage.setItem("mobile",user.mobile);
      sessionStorage.setItem("name",user.name);
    },



    changeOrder(state,payload){
      state.ticketType=payload.ticketType
      state.ticketType2=payload.ticketType2
      console.log(state.ticketType,state.ticketType2)
    }
  },
  actions: {
  },
  modules: {
  }
})
