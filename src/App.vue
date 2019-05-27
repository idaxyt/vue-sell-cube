<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab-wrapper">
      <v-tab :tabs='tabs' :initialIndex=0></v-tab>
    </div>
    <!-- <div class="tab border-1px">
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
    <keep-alive>
      <router-view :goods='goods' :seller='seller' :ratings='ratings'></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import VTab from './components/tab/Tab'
import VGoods from './components/v-content/Goods'
import VRatings from './components/v-content/Ratings'
import VSeller from './components/v-content/Seller'
import { getSeller, getGoods, getRatings } from './api'
import { urlParse } from './utils/index'
//OK状态码
export default {
  name: "app",
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      },
      goods: [],
      ratings: [],
    }
  },
  components: {
    VHeader,
    VTab
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: VGoods,
          data: {
            goods: this.goods,
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: VRatings,
          data: {
            ratingd: this.ratings,
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: VSeller,
          data: {
            seller: this.seller
          }
        },
      ]
    } 
  },
  created() {
    getSeller().then((seller) => {
      this.seller = seller
    })
    getGoods().then((goods) => {
      this.goods = goods
    })
    getRatings().then((ratings) => {
      this.ratings = ratings
    })
  }
};
</script>

<style lang='stylus'>
@import './common/stylus/mixin.styl'
#app 
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // .tab
  //   display: flex
  //   width:  100%
  //   height: 40px
  //   line-height: 40px
  //   border-1px(rgba(7,17,27,0.1))
  //   .tab-item
  //     text-align: center
  //     flex: 1
  //     a
  //       display: block
  //       text-decoration: none 
  //       font-size: 14px
  //       color: rgb(77,85,93)
  //     .active
  //       color: rgb(240,20,20)
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0  
</style>
