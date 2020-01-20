import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters.js'
import {mutations} from './mutations.js'
import {actions} from './actions.js'

Vue.use(Vuex);
 
export  const store = new Vuex.Store({
      // namespaced: true, //开启路径访问
      state :{
          goodsList:[],
          dialogVisible:[]
      },
      getters,
      mutations,
      actions,
})