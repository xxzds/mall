<template>
  <div class="goods-info">
    <div class="title">{{goods.skuName}}</div>
    <div class="price">
      <div>原价：{{goods.price}}</div>
      <div>优惠券：{{goods.discount}}</div>
      <div>最终价：{{goods.finalPrice}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goods-info{
    font-size: var(--font-size);
  }

  .title{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .price{
    display: flex;
  }
  .price div{
    flex: 1;
  }
</style>
