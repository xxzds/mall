import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//创建对象
const state ={
  isShowTabBar:true,
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{

  }
})

//导出
export default store


