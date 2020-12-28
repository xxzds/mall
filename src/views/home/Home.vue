<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['好券商品','精选卖场','9.9包邮']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['好券商品','精选卖场','9.9包邮']"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BackTop from "@/components/content/backTop/BackTop";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getHomeMultiData,getHomeGoods} from "@/network/home";
  import {itemListenerMixin} from "@/common/mixin";
  import {BACKTOP_DISTANCE} from "@/common/const";
  import {SHOW_BAR} from "@/store/mutation-types";


  export default {
    name: "Home",
    components:{
      Scroll,
      RecommendView,
      NavBar,
      HomeSwiper,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          '1':{page:0,list:[]},
          '2':{page:0,list:[]},
          '10':{page:0,list:[]}
        },
        currentType:'1',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return  this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()

      this.$store.commit(SHOW_BAR)
    },
    deactivated() {
      //记录滚动y值
      this.saveY = this.$refs.scroll.getScrollY()

      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    mixins:[itemListenerMixin],
    created() {
      //请求多个数据
      this.getHomeMultiData()

      //请求商品数据
      this.getHomeGoods('1')
      this.getHomeGoods('2')
      this.getHomeGoods('10')
    },
    mounted() {
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = '1'
            break
          case 1:
            this.currentType = '2'
            break
          case 2:
            this.currentType = '10'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop =  -position.y  > BACKTOP_DISTANCE

        //决定tabControl是否吸顶（position:fix)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultiData(){
        getHomeMultiData().then(res=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(eliteId){
        const pageIndex = this.goods[eliteId].page + 1
        getHomeGoods(eliteId,pageIndex).then(res =>{
          if(res.code === 0){
            this.goods[eliteId].list.push(...res.data)
            this.goods[eliteId].page +=1
          }
          this.$refs.scroll.finishPullUp()
        }).catch(error =>{
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    /*position: relative;*/
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left:0;*/
    /*right:0;*/
    /*top:0;*/
    /*z-index: 9;*/
  }

  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index: 9;*/
  /*}*/

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }

  /*.content{*/
  /*  height:100%;*/
  /*    !*calc(100% - 44px);*!*/
  /*  overflow: hidden;*/
  /*}*/

  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
