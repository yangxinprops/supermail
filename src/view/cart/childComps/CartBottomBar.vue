<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计：{{totalPrice}}元
    </div>

    <div class="caculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";


export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length ===0) return false
      //使用数组的filter方法
      // return !(this.cartList.filter(item => !item.checked).length)
      //使用数组的find方法
      // return !(this.cartList.find(item => !item.checked))

      //使用for循环方法
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }

  },
  methods:{
    checkClick() {
      if(this.isSelectAll){ //全部选中
        for(let item of this.cartList){
          item.checked = false
        }
      }
      else {//部分或全部不选中
        for(let item of this.cartList){
          item.checked = true
        }
      }
    },
    calcClick(){
      if (!this.cartList.find(item => item.checked)){
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.totalPrice{
  margin-left: 30px;
  flex: 1;
}
.caculate{
  background-color: red;
  margin-right:0 ;
  width: 90px;
  text-align: center;
}
</style>
