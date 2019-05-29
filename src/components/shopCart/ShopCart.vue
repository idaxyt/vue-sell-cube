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
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartControl/CartControl'
import Bubble from "../bubble/Bubble"
import ShopCartList from './shop-cart-list'
export default {
    name: 'ShopCart',
    props: {
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
        sticky: {
            type: Boolean,
            default: false
        }
    },
    components: {
        CartControl,
        Bubble,
        ShopCartList
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
            ListFold: this.fold
        }
    },
    computed: {
        //总价格
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total +=food.price*food.count
            })
            return total
        },
        //总数
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        //支付结算描述
        payDesc() {
            if(this.totalPrice ===0 ) {
                return `起送￥${this.seller.minPrice?this.seller.minPrice:''}元`
            } else if(this.totalPrice >= this.seller.minPrice) {
                return `去结算`
            } else {
                return `还差￥${this.seller.minPrice-this.totalPrice}元起送`
            }
        },
        //支付结算class
        payClass() {
            if(this.totalPrice < this.seller.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
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
        // 控制购物栏展示,隐藏或显示已购买列表
        toggleList() {
            // 购物栏呈关闭状态,再次点击显示
            // console.log(this.ListFold)
            if(this.ListFold) {
                if(!this.totalCount) {
                    // 购物数量为空时,返回
                    return
                }
                this.ListFold = false // 设置购物栏为打开状态
                this._showShopCartList() // 显示购物列表
                this._showShopCartSticky() // 显示购物栏副本, 用于解决购物车列表(shop-cart-list)遮挡购物栏(shop-cart)问题
            } else {
                this.ListFold = true // 设置购物栏为关闭状态
                this._hideShopCartList()
            }
        },

        // 利用create-api调用shop-cart-list组件,向其传入数据selectFoods,调用其中方法show和hide,监听其中事件hide并执行相应逻辑
        _showShopCartList() {
            this.shopCartListCamp = this.shopCartListCamp || this.$createShopCartList({
                $props: {
                    selectFoods: 'selectFoods'
                },
                $events: {
                    hide: () => {
                        this.ListFold = true
                    },
                    leave: () => {
                        this._hideShopCartSticky()
                    }
                }
            })
            this.shopCartListCamp.show() 
        },
        _hideShopCartList() {
            // const comp = this.sticky?this.$parent.list: this.shopCartListCamp
            // comp.hide && comp.hide()
            this.$parent.list.hide()
        },

        // 利用create-api调用shop-cart-sticky组件,向其传入数据selectFoods和seller值,调用其中方法show和hide
        _showShopCartSticky(){
            // >>> shop-cart-sticky为shop-cart副本，解决shop-cart-list遮盖底部购物栏（shop-cart组件）问题
            // >>> shop-cart-sticky组件中，利用父子组件方式完成复制，并作为父组件向子组件传值
            // >>> -----------------------------------------------------------------------------------
            // >>> 问题：listFood设定为固定值true（购物栏折叠与否标识），点击打开的购物栏会重复产生购物列表和购物栏
            // >>> 原因：shop-cart-sticky组件复用时，需实例化ShopCart组件，则置listFood为true，故重复调用其为true时的逻辑，
            // >>>       不断产生购物列表和购物栏
            // >>> 解决：shop-cart组件设置fold为$props属性，shop-cart-sticky组件为子组件传值，也设置fold为$props属性，
            // >>>       listFold值与fold值相等，使用shopCartStickyCamp时传入fold值
            // >>> -----------------------------------------------------------------------------------
            // >>> 问题：用户点击购物栏关闭时，窗口弹出无this.shopCartListCamp的错误
            // >>> 原因：> 用户第一次点击购物栏弹出购物列表，创建shop-cart-list组件并创建shopCartListCamp，
            // >>>        也创建shop-cart-sticky组件但没有创建shopCartListCamp；
            // >>>      > 需对shop-cart中的shopCartListcamp操作
            // >>> 解决：> shop-cart-sticy组件$props属性设置list，ShopCart组件利用create API实例化ShopCartSticky组件时，
            // >>>        传入值为shopCartListCamp实例化的值
            // >>>       > ShopCart组件在__hideShopCartList方法中使用this.$parent.list方法调用ShopCartSticky的hide方法
            // >>> -----------------------------------------------------------------------------------
            // >>> 问题：1.打开购物车列表之后点击阴影选择关闭之后，再点击购物栏时无反应，需再点击一次才出现购物列表
            // >>>       2. 用户进行tab（商品|评论|商家）切换，购物栏依旧存在
            // >>> 原因：第一次打开购物车列表之后，创建的shop-cart-sticky组件在购物车列表关闭时未被销毁
            // >>> 解决：shop-cart-list组件的transition标签中添加after-leave的onLeave方法，方法中使用$emit触发leave事件。
            // >>>       ShopCart组件通过creatApi实例化的shop-cart-list组件中监听leave事件回调，调用_hideShopCartSticky方法隐藏shop-cart-sticky组件
            // >>> -----------------------------------------------------------------------------------
            // >>> 问题(再看)：购物车连续点击第四次时，本应关闭，但是重新创建新列表
            // >>> 原因: 购物车副本shop-cart-sticky第一次创建时，使用$props传入fold值为false，执行ListFold等于fold，值为false，
            // >>>       故执行toggleList时再次将ListFold值设为true。即使shop-cart-sticky通过fold传入值为false，vue组件复用的原因，
            // >>>       ListFold值根据第一次生成之后不会随fold值变化还是为true，故再次点击执行toggleList时再次创建新实例
            // >>> 解决：添加watch方法，监听fold，ListFold值随fold改变      
            this.shopCartStickyCamp = this.shopCartStickyCamp || this.$createShopCartSticky({
                $props: {
                    selectFoods: 'selectFoods',
                    seller: 'seller',
                    fold: 'ListFold',
                    list: this.shopCartListCamp
                }
            })
            this.shopCartStickyCamp.show()
        },
        _hideShopCartSticky() {
            this.shopCartStickyCamp.hide()
        },
        
        pay() {
            if(this.totalPrice<this.minPrice) {
                return
            }
        }
    },
    watch: {
        fold(newVal) {
            this.ListFold = newVal
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
    position: absolute
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
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

