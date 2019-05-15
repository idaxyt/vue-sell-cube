<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'

export default {
  name: "app",
  components: {
    VHeader
  }
};
</script>

<style lang='stylus'>
@import './common/stylus/mixin.styl'
#app 
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .tab
    display: flex
    width:  100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      text-align: center
      flex: 1
      a
        display: block
        text-decoration: none 
        font-size: 14px
        color: rgb(77,85,93)
      .active
        color: rgb(240,20,20)
</style>
