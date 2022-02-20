<template>
  <div class="cart">
  <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

  <!--商品列表-->
    <cart-list></cart-list>

  <!--底部汇总-->
  <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbaar/NavBar";
import CartList from "@/view/cart/childComps/CartList";
import CartBottomBar from "@/view/cart/childComps/CartBottomBar";

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength',
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}

</style>
