import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "@/common/const";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200)

    this.itemImgListener = () =>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin ={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    showBackTop(position){
      //判断BackTop是否显示
      this.isShowBackTop =  -position.y  > BACKTOP_DISTANCE
    }
  }
}
