<template>
    <div class="shop-info">
      <div>名称：{{shop.shopName}}</div>
      <div>等级：{{shop.shopLevel}}</div>
    </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
        shop:{
          type:Object,
          default(){
            return {}
          }
        }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding-top: 20px;
    display: flex;
  }
  .shop-info div{
    flex: 1;
  }
</style>
