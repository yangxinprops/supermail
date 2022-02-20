<template>
  <div class="detail-swiper">
    <swiper class="itemSwiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return {

    }
  },
  props: {
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.itemSwiper{
  height: 300px;
  overflow: hidden;
}
</style>
