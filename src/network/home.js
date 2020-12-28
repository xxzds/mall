import {request, request2} from "@/network/request";

export function getHomeMultiData(){
  return request({
      url:'/home/multidata'
  })
}


export function getHomeGoods(eliteId,pageIndex){
  return request2({
    url:'/jd/query/jingfen/goods',
    method: 'post',
    data:{
      eliteId,
      pageIndex
    }
  })
}
