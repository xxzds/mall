<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration = 2000){
        this.message = message
        this.isShow = true

        setTimeout(() =>{
          this.isShow = false
          this.message=''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top:50%;
    left:50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,0.75);
    border-radius: 4px;
    font-size: 14px;
    z-index: 999;
  }
</style>
