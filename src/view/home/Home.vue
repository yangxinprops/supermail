<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 :class="{fixed:isTabFixed}"
                 v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed:isTabFixed}"
                   v-show="!isTabFixed"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>


</template>

<script>
import HomeSwiper from "@/view/home/childComps/HomeSwiper";
import RecommendView from "@/view/home/childComps/RecommendView";
import FeatureView from "@/view/home/childComps/FeatureView";

import NavBar from "@/components/common/navbaar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import {getHomeMultidata} from "@/network/home";
import {getHomeGoods} from "@/network/home";
import {itemListenerMixin} from "@/commom/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      // result:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }},
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  mixins:[itemListenerMixin],
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,10)
  },
  deactivated() {
    //1.保存y值
    this.saveY = this.$refs.scroll.scroll.y

    //2.取消全局监听
    this.$bus.$off('itemImageLoad',this.itemImgListen)
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {


  },
  methods:{
    /*
    * 事件监听相关方法
    * */

    //2.获取tabControl的offsetTop
    //所有的组件都有一个属性$el:用于获取组件中的元素
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    contentScroll(position){
      //1.判定BackTop是否显示
      this.isShowBackTop = position.y < -1000

      //2.决定tabControll是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },


    /*
    * 网络请求相关方法
    * */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=  1

        //完成上啦加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }

}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动是，为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  z-index: 9;
  overflow: hidden;
}



.content {
  height: calc(100% - 93px);
  overflow: hidden;
  /*margin-top: 44px;*/
}
</style>
