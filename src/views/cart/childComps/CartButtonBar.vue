<template>
  <div class="button-bar">
    <div class="check-content" >
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'
  export default {
    name: "CartButtonBar",
    components: {CheckButton},
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+this.cartList.filter(item =>{
          return item.checked
        }).reduce((preValue,item) =>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkedLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        return  this.cartList.length > 0 && this.checkedLength === this.cartList.length
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .button-bar{
    height: 40px;
    font-size: 13px;
    background-color: #eee;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
  }
  .check-content{
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 10px;
  }

  .check-button{
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }

  .total-price{
    margin-left: 30px;
  }

  .calculate{
    position: absolute;
    right: 0;
    background-color: red;
    color: #fff;
    height: 40px;
    padding:  10px 10px;

  }
</style>
