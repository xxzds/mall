<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend img{
    width: 65px;
    height: 65px;
  }
</style>
