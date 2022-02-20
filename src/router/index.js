import Vue from 'vue'
import VueRouter from "vue-router";
import * as path from "path";

const Home = () => import('../view/home/Home')
const Category = () => import('../view/category/Category')
const Cart = () => import('../view/cart/Cart')
const Profile = () => import('../view/profile/Profile')
const Detail = () => import('view/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail:iid',
    component:Detail
  },

]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
