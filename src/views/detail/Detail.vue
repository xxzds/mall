<template>
    <div id="detail">
      <detail-nav-bar  class="detail-nav"  @titleClick="titleClick" ref ="detailNavBar"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-image-list="topImageList"/>
        <detail-goods-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-info :image-detail-list="imageDetailList" @imageLoad="imageLoad"/>
        <goods-list ref="recommend" :goods="recommendSkuList" />
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import {getDetail, Goods} from "@/network/detail";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import Scroll from "@/components/common/scroll/Scroll";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailInfo from "@/views/detail/childComps/DetailInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import {backTopMixin, itemListenerMixin} from "@/common/mixin";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
  import {NOT_SHOW_TAB_BAR} from "@/store/mutation-types";
  import { mapActions } from 'vuex'
  import Toast from "@/components/common/toast/Toast";

  export default {
    name: "Detail",
    components:{
      Toast,
      DetailBottomBar,
      GoodsList,
      DetailInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll,
      DetailSwiper,
      DetailNavBar
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        skuId:{
          type:String
        },
        topImageList:[],
        goods:{},
        shop:{},
        imageDetailList:[],
        recommendSkuList:[],
        themeTopYs:[],
        currentIndex:0
      }
    },
    created() {
      this.$store.commit(NOT_SHOW_TAB_BAR)
      this.skuId = this.$route.params.skuId

      getDetail(this.skuId,true).then(res =>{
        console.log(res)

        const skuInfo = res.data.skuInfo
        //轮播图数据
        this.topImageList = skuInfo.imageInfo.imageList
        //商品信息
        this.goods = new Goods(skuInfo)
        //店铺信息
        this.shop = skuInfo.shopInfo
        //商品详情
        this.imageDetailList  = skuInfo.imageInfo.imageList
        //推荐商品列表
        this.recommendSkuList = res.data.recommendSkuList

        // this.$nextTick(() =>{
        //
        // })
      })
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        //刷新滚动
        this.$refs.scroll.refresh()

        //设置偏移量
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)

        console.log(this.themeTopYs)
      },
      titleClick(index){
        console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i=0;i<length;i++){
          if(this.currentIndex !== i &&((i<length -1 && positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i+1]) ||
            (i === length -1 && positionY >= this.themeTopYs[i]))){
              this.currentIndex = i
              this.$refs.detailNavBar.currentIndex = this.currentIndex
          }
        }

        //判断BackTop是否显示
        this.showBackTop(position)
      },
      addToCart(){
        const product = {}
        product.image = this.topImageList[0].url
        product.skuId = this.goods.skuId
        product.skuName = this.goods.skuName
        product.price = this.goods.finalPrice
        // this.$store.dispatch('addCart',product)
        this.addCart(product).then(res =>{
          this.$toast.show(res)
        })
      }
    },
    mounted() {
    },
    destroyed() {
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
