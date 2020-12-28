import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "./store"
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus =new Vue()
//注册插件,会执行install方法
Vue.use(toast)
//解决移动端点击延迟300ms的问题
FastClick.attach(document.body);
//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


