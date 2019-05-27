<template>
    <div>
        <div class="shopCart">
            <div class="content" @click='toggleList'>
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight': totalCount>0}">
                            <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
                        </div>
                        <div class="num" v-show='totalCount>0'>
                            <bubble :num='totalCount'></bubble>
                        </div>
                    </div>
                    <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop='pay'>
                    <div class="pay" :class="payClass">
                        <span>{{payDesc}}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="ball-container">
                <transition-group>
                    <div
                        transition='drop' 
                        v-for="(ball,index) in balls" 
                        :key='index' 
                        v-show='ball.show'>
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div> -->
            <transition>
                <div class="shopcart-list" v-show='listShow' transition='fold'>
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click='empty'>清空</span>
                    </div>
                    <div class="list-contained" ref='list'>
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key='index'>
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food='food'></CartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition>
            <div class="list-mask" @click='hideList' v-show='listShow' transition='fade'></div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartControl/CartControl'
import Bubble from "../bubble/Bubble"
export default {
    name: 'ShopCart',
    props: {
        seller: Object,
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        CartControl,
        Bubble
    },
    data() {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
            ],
            dropBalls: [],
            fold: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total +=food.price*food.count
            })
            return total
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        payDesc() {
            if(this.totalPrice ===0 ) {
                return `起送￥${this.seller.minPrice?this.seller.minPrice:''}元`
            } else if(this.totalPrice >= this.seller.minPrice) {
                return `去结算`
            } else {
                return `还差￥${this.seller.minPrice-this.totalPrice}元起送`
            }
        },
        payClass() {
            if(this.totalPrice < this.seller.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        },
        listShow() {
            if(!this.totalCount) {
                this.fold = true
                return false
            } 
            let show = !this.fold
            if(show) {
                this.$nextTick(()=>{
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs['list'],{
                            click: true
                        })
                    } else{
                        this.scroll.refresh()
                    }

                })
            }
            return show
        }
    }, 
    methods: {
        // drop(el) {
        //     for(let i = 0; i< this.balls.length;i++) {
        //         let ball = this.balls[i]
        //         if(!ball.show) {
        //             ball.show = true
        //             ball.el = el
        //             this.dropBalls.push(ball)
        //             return
        //         }
        //     }
        // },
        toggleList() {
            if(!this.totalCount) {
                return 
            }
            this.fold = !this.fold
        },
        empty() {
            this.selectFoods.forEach((food,index) => {
                food.count = 0
            })
        },
        hideList() {
            this.fold = true
        },
        pay() {
            if(this.totalPrice<this.minPrice) {
                return
            }
        }
    },
    transitions: {
        // drop: {
        //     beforeEnter(el) {
        //         let count = this.balls.length
        //         while(count--) {
        //             let ball = this.balls[count]
        //             if(ball.show) {
        //                 let rect = ball.el.getBoundingClientRect()
        //                 let x = rect.left - 32
        //                 let y = -(window.innerHeight - rect.top - 32)
        //                 el.style.display = ''
        //                 el.style.webkitTransform = `translate3d(0,${y}px,0)`
        //                 el.style.transform = `translate3d(0,${y}px,0)`
        //                 let inner = el.getElementByClassName('inner-hook')[0]
        //                 inner.style.webkitTransform = `translate3d(0,${y}px,0)`
        //                 inner.style.transform = `translate3d(0,${y}px,0)`
        //             }
        //         }
        //     },
        //     enter(el) {
        //         /**
        //          * eslint-disable no-unused-vars
        //          */
        //         let rf = el.offsetHeight
        //         this.$nextTick(()=>{
        //             el.style.webkitTransform = 'translate3d(0,0,0)'
        //             el.style.transform = 'translate3d(0,0,0)'
        //             let inner = el.getElementByClassName('inner-hook')[0]
        //             inner.style.webkitTransform = 'translate3d(0,0,0)'
        //             inner.style.transform = 'translate3d(0,0,0)'
        //         })
        //     },
        //     afterEnter(el) {
        //         let ball = this.dropBalls.shift()
        //         if(ball) {
        //             ball.show = false;
        //             el.style.display = 'none'
        //         }
        //     }
        // }
    }
}
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/mixin'
.v-enter, .v-leave-to
    opacity: 0
.v-enter-active, .v-leave-active
    transition: opacity 0.2s
.shopCart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 33.3%
    height: 48px
    .content
        display: flex
        background: #141d27
        font-size: 0
        color: rgba(255,255,255,0.4)
        .content-left
            flex: 1
            .logo-wrapper
                display: inline-block
                vertical-align: top
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                height: 56px
                width: 56px
                box-sizing: border-box
                border-radius: 50%
                background: #141d27
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    background: #2b343c
                    text-align: center
                    &.highlight
                        background: rgb(0,160,220)
                    .icon-shopping_cart
                        font-size: 24px
                        color: #80858a
                        line-height: 44px
                        &.highlight
                            color: #fff
                .num
                    position: absolute
                    top: 0
                    right: 0
            .price
                display: inline-block
                vertical-align: top
                margin-top: 12px
                box-sizing: border-box
                padding-right: 12px 
                line-height: 24px
                border-right: 1px solid rgba(255,255,255,0.1)
                font-size: 16px
                font-weight: 700
                &.highlight
                    color: #fff
            .desc
                display: inline-block  
                vertical-align: top
                margin: 12px 0 0 12px
                line-height: 24px
                font-size: 10px
        .content-right
            flex: 0 0 105px
            width: 105px
            .pay
                height: 48px
                line-height: 48px
                font-size: 12px
                text-align: center
                font-weight: 700
                background: #2b333b
                &.not-enough
                    background: #2b333b
                &.enough
                    background: #00b43c
                    color: #fff
    .ball-container
        .ball
            position: fixed
            left: 35px
            bottom: 22px
            z-index: 200
            &.drop-transition
                transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0,160,220) linear
    .shopcart-list
        position: absolute 
        top: -257px
        left: 0
        z-index: 500
        width: 100%
        // &.fold-transition
        //     transition: all 0.5s
        //     transform: translate3d(0,-100%,0)
        .list-header
            height: 40px
            line-height: 40px
            padding: 0 18px
            background: #f3f5f7
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .title
                float: left 
                font-size: 14px
                color: rgb(7,17,27)
            .empty
                float: right
                font-size: 12px
                color: rgb(0,160,220)
        .list-contained
            padding: 0 18px
            max-height: 217px
            background: #fff
            overflow: hidden
            .food
                position: relative 
                padding: 12px 0
                box-sizing: border-box
                border-1px(rgba(7,17,27,0.1))
                .name
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7,17,27)
                .price
                    position: absolute
                    right: 90px
                    bottom: 12px
                    line-height: 24px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240,20,20)
                .cartcontrol-wrapper
                    position: absolute 
                    right: 0
                    bottom: 6px
.list-mask
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    background: rgba(7,17,27,0.6)
    &.fade-transition
        transition: all 0.5s
        opcity: 1
        background: rgba(7,17,27,0.6)
    &.fase-enter, &.fade-leave
        opcity: 0
        background: rgba(7,17,27,0)

</style>    

