<template>
    <div v-show='showFlag' class="food" trasition='move'  ref='Detail'>
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
                        <div class="time">{{rating.rateTime}}</div>
                        <p class="text">
                            <span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'" ></span>{{rating.text}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControl from '../cartControl/CartControl'
import Split from './split'
import RatingSelect from '../ratingselect/ratingselect'
export default {
    name: 'food',
    props: {
        food: {
            type: Object
        },
        value: Boolean
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
    }
}
</script>

<style lang='stylus' scoped> 
@import "../../common/stylus/mixin"
    .v-enter, .v-leave-to 
        opacity: 0
        transform: rotate(180deg)
    .v-enter-active, .v-leave-active 
        transition: opacity 0.2s
    .food 
        position: fixed
        left: 0
        top: 0
        width: 100%
        height: 100%
        bottom: 48px
        z-index: 30
        background: #fff
        &.move-transition
            transition: all 0.2s linear
            transform: translate3d(0,0,0)
        &.move-enter, &.move-leave
            transform: translate3d(100%,0,0)
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
                    font-size: 20px
                    color: #fff
        .content
            padding: 18px  
            position: relative
            .title
                font-size: 14px
                line-height: 14px
                margin-bottom: 8px
                font-weight: 700
                color: rgb(7,17,27)    
            .detail
                margin-bottom: 18px
                font-size: 0
                line-height: 10px
                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147,153,159)
                .sell-count
                        margin-right: 12px
            .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 14px
                        color: rgb(240,24,20)
                    .old
                        font-size: 10px
                        color: rgb(147,153,1559)
                        text-decoration: line-through
            .cartcontrol-wrapper
                position: absolute 
                right: 12px
                bottom: 18px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                font-size: 10px
                border-radius: 12px
                color: #ffffff
                background: rgb(0,160,220)
                &.fade-transition
                    transition: all 0.2s
                    opacity: 1
                &.fade-enter, .fade-leave
                    opacity: 0
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7,17,27)
            .text
                color: rgb(77,85,93)
                line-height: 24px
                padding: 0 8px
                font-size: 12px
        .rating
            padding-top: 18px
            .title
                font-size: 14px
                line-height: 14px
                margin-left: 18px
                font-weight: 700
                color: rgb(7,17,27)
        .rating-wrapper
            padding: 0 18px
            padding-bottom: 48px
            .rating-item
                position: relative 
                padding: 16px 0 
                border-1px(rgba(7,17,27,0.1))
                .user
                    position: absolute 
                    right: 0
                    top: 16px
                    font-size: 0
                    line-height: 12px
                    .name
                        display: inline-block
                        margin-right: 6px
                        vertical-align: top
                        font-size: 10px
                        color: rgb(147,153,159)
                    .avater
                        border-radius: 50%
                .time
                    margin-bottom: 6px
                    line-height: 12px
                    font-size: 10px
                    color: rgb(147,153,159)
                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7,17,27)
                .icon-thumb_up, .icon-thumb_down
                    line-height: 16px
                    margin-right: 4px
                    font-size: 12px
                .icon-thumb_up
                    color: rgb(0,160,220)
                .icon-thumb_down
                    color: rgb(147,153,159)
            .no-rating
                padding: 16px 0
                font-size: 12px
                color: rgb(147,153,159)

</style>

