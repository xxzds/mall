<template>
  <div>
    <div class="swapper">
      <div class ='content'>
        <ul>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
          <li>测试</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  data(){
    return {
        scroll:null
    }
  },
  mounted() {
    console.log(document.querySelector('.swapper'))
    this.scroll = new BScroll(document.querySelector('.swapper'),{
       scrollX: true,
       probeType:3
    })

    this.scroll.on('scroll',(position) =>{
        console.log(position)
    })
  }
}
</script>

<style scoped>
    .swapper{
      height: 100px;
      background-color: red;
      /*overflow: scroll;*/
      /*overflow: hidden;*/


    }
</style>
