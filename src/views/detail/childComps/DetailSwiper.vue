<template>
    <swiper class = "detail-swiper">
      <swiper-item v-for="item in topImageList">
        <img :src="item.url">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "@/components/common/swiper";
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props:{
      topImageList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
