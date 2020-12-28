<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>

    <!--底部汇总-->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { mapGetters } from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartList from "@/views/cart/childComps/CartList";
import CartButtonBar from "@/views/cart/childComps/CartButtonBar";
export default {
  name: "Cart",
  components: {CartButtonBar, CartList, Scroll, NavBar},
  computed:{
    //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    ...mapGetters(['cartLength'])
  },
  activated() {
    // console.log(this.$refs.scroll.scroll.wrapperHeight)
    // console.log(this.$refs.scroll.scroll.scrollerHeight)
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }
  .content{
    position: absolute;
    top:44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
