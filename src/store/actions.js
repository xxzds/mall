import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context,payload){
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item =>{
        return item.skuId === payload.skuId
      })

      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('商品数量数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('商品加入购物车')
      }
    }))
  }
}
