import {request2} from "@/network/request";

export function getDetail(skuId,isRecommend = false){
  return request2({
    url:'/jd/query/goods/by/skuId',
    method: 'post',
    data:{
      skuId,
      isRecommend
    }
  })
}

export class Goods{
  constructor(skuInfo) {
    this.skuId = skuInfo.skuId
    this.skuName = skuInfo.skuName
    this.price = skuInfo.priceInfo.lowestPrice
    this.discount = skuInfo.couponInfo.discount
    this.finalPrice = skuInfo.finalPrice
  }
}
