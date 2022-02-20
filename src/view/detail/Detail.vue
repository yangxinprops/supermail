<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-baseInfo :goods="goods"></detail-baseInfo>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from "@/view/detail/childComps/DetailNavBar";
import DetailSwiper from "@/view/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/view/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/view/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/view/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/view/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/view/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/view/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backtop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
// import Toast from "@/components/common/toast/Toast";

import {getdetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import {itemListenerMixin} from "@/commom/mixin";

export default {
  name: "Detail",
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      currentIndex:0,
      isShowBackTop:false,
      message:'',
      show:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,

  },
 mixins:[itemListenerMixin],
  created() {
    //1.保存传入的iid
    this.iid =this.$route.params.iid

    //2.根据iid情求数据
    getdetail(this.iid).then(res => {
      // console.log(res);
      //1.获取顶部的轮播数据
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo = data.detailInfo

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      // setTimeout(() => {
      //   this.themeTopYs.push(0);
      //   console.log(this.$refs.params.$el);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // },100)
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0);
      //   console.log(this.$refs.params.$el);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // })

    })

    //请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
      // console.log(typeof this.recommends);
    } )
  },
  mounted() {


  },
  // updated() {
  //   this.themeTopYs = []
  //
  //   this.themeTopYs.push(0);
  //   console.log(this.$refs.params.$el);
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopYs);
  // },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListen)
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y

      //2.positionY和主体中值进行对比
      let length = this.themeTopYs.length
      for(let i = 0;i < length;i++) {
        if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1]) || (i ===length - 1 && positionY >= this.themeTopYs[i])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }

      //3.是否显示回到顶部
      this.isShowBackTop = position.y < -1000
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res);
        this.message = res
        this.$toast.show(res,700)
      })



      // this.show = !this.show
      // setTimeout(() => {
      //   this.show = false
      // },800)

    }


  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
