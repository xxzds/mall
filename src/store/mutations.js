import {ADD_COUNTER, ADD_TO_CART, NOT_SHOW_TAB_BAR, SHOW_BAR} from "@/store/mutation-types";

export default {
  [NOT_SHOW_TAB_BAR](state){
    state.isShowTabBar = false
  },
  [SHOW_BAR](state){
    state.isShowTabBar = true
  },
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }

}
