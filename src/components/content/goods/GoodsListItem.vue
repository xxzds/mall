<template>
    <div class="goods-item" @click="itemClick(goodsItem.skuId)">
      <img v-lazy="goodsItem.imageInfo.imageList[0].url" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.skuName}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(skuId){
        this.$router.push('/detail/'+skuId)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size:12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

</style>
