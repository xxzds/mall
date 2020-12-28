import axios from "axios";
import qs from 'qs'

export function request(config){
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout:10000
  })

  //axios拦截器
  instance.interceptors.request.use(config =>{
    // console.log(config)
    return config
  },error =>{
    console.log(error)
  })

  instance.interceptors.response.use(res =>{
    return res.data
  },error =>{
    console.log(error)
  })

  return instance(config)
}


export function request2(config){
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8080/tookApp',
    timeout:10000
  })

  instance.interceptors.request.use(config =>{
    //将post请求的数据，转成&连接的字符串
    config.data = qs.stringify(config.data)
    return config
  },error =>{
    console.log(error)
  })

  instance.interceptors.response.use(res =>{
    return res.data
  },error =>{
    console.log(error)
  })

  return instance(config)
}
