<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  margin-top: 10px;
  padding-bottom:30px;
  border-bottom: 10px solid #eee;
}
.recommend-item{
  flex: 1;
  text-align: center;
  font-size:15px;
}
.recommend-item img{
  width: 85%;
  margin-bottom:10px;
}
</style>
