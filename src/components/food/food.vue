<template>
    <transition name='move'>
        <div class="food" v-show='visible'>
            <cube-scroll ref='scroll'>
                <div class="food-content">
                    <div class="image-header">
                        <img :src="food.image" alt="">
                        <div class="back" @click='hide'>
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                        <div class="title">{{food.name}}</div>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{food.price}}</span><span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                            <div class="cart-control-wrapper" v-show='food.count'>
                                <CartControl :food='food'></CartControl>
                            </div>
                            <transition  name="fade">
                                <div class="buy" v-show='!food.count || food.count===0' @click.stop.prevent='addFirst(food,$event)' transition='fade'>加入购物车</div>
                            </transition>
                        </div>
                        <split v-show='food.info'></split>
                        <div class="info" v-show='food.info'>
                            <h1 class="title">{{food.name}}</h1>
                            <p class="text">{{food.info}}</p>
                        </div>
                        <Split></Split>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </transition>
    <!-- <div v-show='showFlag' class="food" trasition='move'  ref='Detail'>
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="back">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <div class="title">{{food.name}}</div>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper" v-show='food.count'>
                    <CartControl :food='food'></CartControl>
                </div>
                <transition>
                    <div class="buy" v-show='!food.count || food.count===0' @click.stop.prevent='addFirst(food,$event)' transition='fade'>加入购物车</div>
                </transition>
            </div>
            <split v-show='food.info'></split>
            <div class="info" v-show='food.info'>
                <h1 class="title">{{food.name}}</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <Split></Split>
            <div class="rating">
                <div class='title'>商品评价</div>
                <RatingSelect @change='change' @changeonlyContent='changeonlyContent' :selectType='selectType' :onlyContent='onlyContent' :desc='desc' :ratings='food.ratings'></RatingSelect>
            </div>
            <div class="rating-wrapper">
                <div class="no-rating" v-show='!food.ratings'>暂无评价</div>
                <ul v-show='food.ratings && food.ratings.length'>
                    <li 
                        v-for='(rating,index) in food.ratings' 
                        :key='index' 
                        class="rating-item border-1px"
                        v-show="needShow(rating.rateType,rating.text)">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img :src="rating.avatar" alt="" class="avater" width='12px' height='12px'>
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <p class="text">
                            <span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'" ></span>{{rating.text}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div> -->
</template>

<script>
    const EVENT_SHOW = 'show'
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2
import popupMixin from 'common/mixins/popup'
import Vue from 'vue'
import CartControl from '../cartControl/CartControl'
import Split from '../split/split'
import RatingSelect from '../ratingselect/ratingselect'
export default {
    mixins: [popupMixin],
    name: 'food',
    props: {
        food: {
            type: Object,
            default: () => {
                return {}
            }
        },
        seller: Object,
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        fold: {
            type: Boolean,
            default: true
        },
    },
    components: {
        CartControl,
        Split,
        RatingSelect
    },
    data() {
        return {
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    computed: {
        showFlag() {
            this.selectType = ALL
            this.onlyContent = true
            this.$nextTick(()=>{
                if(!this.foodDetailscroll) {
                     this.foodDetailscroll = new BScroll(this.$refs['Detail'],{
                        click: true
                    })
                } else {
                    this.foodDetailscroll.refresh()
                }
            })
            return this.value
        }
    },
    created() {
        this.$on(EVENT_SHOW, ()=> {
            this.$nextTick(()=>{
                this.$refs.scroll.refresh()
            })
        })
    },
    methods: {
        back() {
            this.$emit('input',false)
        },
        addFirst(food,event) {
            if(!event._constructed) {
                return
            }
            this.$emit('cartadd',event.target)
            Vue.set(this.food,'count',1)
        },
        change(v) {
            this.selectType = v
            this.$nextTick(()=>{
                this.foodDetailscroll.refresh()
            })
        },
        changeonlyContent(v) {
            this.onlyContent = v
            this.$nextTick(()=>{
                this.foodDetailscroll.refresh()
            })
        },
        needShow(type,text) {
            if(this.onlyContent && !text) {
                return false
            }
            if(this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        }
    },
}
</script>

<style lang='stylus' scoped> 
@import "../../common/stylus/mixin"
@import "~common/stylus/variable"
.food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: $color-white
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: $fontsize-large-xx
          color: $color-white
    .content
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        padding: 18px 0 0 18px
        font-size: $fontsize-medium
        font-weight: 700
        color: $color-dark-grey
      .detail
        margin-bottom: 18px
        padding: 0 18px
        line-height: 10px
        height: 10px
        .sell-count, .rating
          font-size: $fontsize-small-s
          color: $color-light-grey
        .sell-count
          margin-right: 12px
      .price
        position: relative
        padding:0 0 18px 18px
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: $color-red
        .old
          text-decoration: line-through
          font-size: $fontsize-small-s
          color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: $fontsize-small-s
        color: $color-white
        background: $color-blue
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .text
        line-height: 24px
        padding: 0 8px
        font-size: $fontsize-small
        color: $color-grey
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          &:last-child
            border-none()
          .user
            position: absolute
            right: 0
            top: 16px
            display: flex
            align-items: center
            line-height: 12px
            .name
              margin-right: 6px
              font-size: $fontsize-small-s
              color: $color-light-grey
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: $fontsize-small-s
            color: $color-light-grey
          .text
            line-height: 16px
            font-size: $fontsize-small
            color: $color-dark-grey
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: $fontsize-small
            .icon-thumb_up
              color: $color-blue
            .icon-thumb_down
              color: $color-light-grey

</style>

