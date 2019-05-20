<template>
    <transition>
        <div v-show='showFlag' class="food" trasition='move' ref='foodDetail'>
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
                </div>
                <div class="cartcontrol-wrapper" v-show='food.count'>
                    <CartControl :food='food'></CartControl>
                </div>
                <transition>
                    <div class="buy" v-show='!food.count || food.count===0' @click.stop.prevent='addFirst(food,$event)' transition='fade'>加入购物车</div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControl from '../cartControl/CartControl'
export default {
    name: 'food',
    props: {
        food: {
            type: Object
        },
        value: Boolean
    },
    components: {
        CartControl
    },
    data() {
        return {
            // showFlag: false
        }
    },
    computed: {
        showFlag() {
            this.$nextTick(()=>{
                if(!this.foodDetailScroll) {
                    this.foodDetailScroll = new BScroll(this.$refs['foodDetail'],{
                        click: true
                    })
                } else {
                    this.foodDetailScroll.refresh()
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
        }
    }
}
</script>

<style lang='stylus' scoped> 
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
            bottom: 208px
        .buy
            position: absolute
            right: 18px
            bottom: 208px
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
</style>

