<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :itemInfo="item"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CartListItem from "@/views/cart/childComps/CartListItem";
  export default {
    name: "CartList",
    components: {CartListItem},
    computed:{
      ...mapGetters(['cartList'])
    }

  }
</script>

<style scoped>

</style>
