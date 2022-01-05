<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbaar/NavBar";
import HomeSwiper from "@/view/home/childComps/HomeSwiper";
import RecommendView from "@/view/home/childComps/RecommendView";

import {gethomemultidata} from "@/network/home";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return{
      // result:null
      banners:[],
      recommends:[],
    }},
  beforeCreate() {
    //1.请求多个数据
    gethomemultidata().then(res =>{
      console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;

    })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
