<template>
    <div class ='detail-info'>
      <img v-for="item in imageDetailList"
           :src="item.url" @load="imgLoad">
    </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props:{
    imageDetailList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      counter:0
    }
  },
  methods:{
    imgLoad(){
        if(++this.counter === this.imageDetailList.length){
          this.$emit('imageLoad')
        }
    }
  }
}
</script>

<style scoped>
   .detail-info img{
     width: 100%;
   }
</style>
