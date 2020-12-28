<template>
  <div class="tab-bar-item" @click="clickTabBarItem">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    link:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data:function (){
    return {
      // isActive: false
    }
  },
  computed:{
    isActive:function (){
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle:function(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    clickTabBarItem:function (){
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top:3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>
