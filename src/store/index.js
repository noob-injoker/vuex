import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import roles from './roles/roles'
import orders from './orders/orders'
import goods from './goods/goods'
import sort from './sort/sort'
import attributes from './attributes/attributes'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //存储共享的数据
  },
  mutations: {
    // 同步修改state的值
  },
  actions: {
    // 异步提交mutation
  },
  modules: {
    //模块
    user,roles,orders,goods,sort,attributes
  }
})
