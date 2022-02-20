import {debounce} from "@/commom/utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListen: null
    }
  },
  mounted(){
    //1.监听item中图片加载完成
    // console.log(this.$refs.scroll.refresh);
    this.itemImgListen = () => {
      refresh()
    }
    const refresh = debounce(this.$refs.scroll.refresh,70)
    this.$bus.$on('itemImageLoad',this.itemImgListen)
  }
}
