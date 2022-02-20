import Vue from 'vue'
import Vuex from 'vuex'

import getters from "@/store/getters";

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  getters,
  state:{
    cartList:[]
  },
  mutations:{
    //mutations唯一的目的就是修改state中状态
    //mutations中的每一个方法尽可能完成的时间比较单一点
    addCounter(state,payload) {
      payload.count++
    },
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context,payload) {
      return new Promise((resolve,reject) => {
        //payload新添加的商品
        // let oldProduct = null;
        // for(let item of state.cartList){
        //   if (item.iid === payload.iid){
        //     oldProduct = item;
        //   }
        // }
        //1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        //2.判断oldProduct
        if(oldProduct){
          // oldProduct.count += 1
          context.commit('addCounter',oldProduct)
          resolve('添加商品数量+1')
        }else{
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })
    }
  }

})

//3.挂载到vue实例上
export default store
