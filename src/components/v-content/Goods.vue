<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <cube-scroll-nav
                :side=true
                :data='goods'
                :options='scrollOptions'
                v-if='goods.length'>
                <cube-scroll-nav-panel
                    v-for='(good,goodIndex) in  goods' 
                    :key='goodIndex'
                    :label='good.name'
                    :title='good.name'>
                    <ul>
                        <li
                            v-for="(food,foodIndex) in good.foods"
                            :key='foodIndex'
                            class="food-item">
                            <div class="icon">
                                <img :src="food.icon" height='57' width='57' alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food" @cartadd='cartadd'></CartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <!-- <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li 
                    v-for="(item,index) in goods" 
                    :key='index' 
                    class="menu-item" 
                    @click="handleClick(item.name,$event,index)"
                    :ref='index'
                    :class="CurrentIndex==index?'current':''"
                    >
                    <span class='text border-1px'>
                        <support-ico class="icon" v-show='item.type > 0' :size='3' :type='item.type'></support-ico>{{item.name}}
                    </span>
                </li>
            </ul>
        </div> -->
        <!-- <div class="foods-wrapper" ref='foodsWrapper'>
            <ul>
                <li 
                    v-for="(item,index) in goods" 
                    :key="index" 
                    :ref='item.name'
                    @touchstart.prevent='handleTouchStart'
                    @touchmove='handleTouchMove'
                    @touchend='handleTouchEnd'>
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li 
                            v-for="(food,k) in item.foods" 
                            :key="k" 
                            class="food-item border-1px" 
                            @click='selectFood(food,$event)'>
                            <div class="icon">
                                <img width='57' height='57' :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food" @cartadd='cartadd'></CartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div> -->
        <div class="shop-cart-wrapper">
            <ShopCart :seller='seller' :select-foods='selectedFoods' ref='shopcart'></ShopCart>
        </div>
        <!-- <Food :food='selectedFood' v-model="chooseFood"></Food> -->
    </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'
import ShopCart from '../shopCart/ShopCart'
import CartControl from '../cartControl/CartControl'
import Food from '../food/food'
export default {
    name: 'Goods',
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
        // goods: {
        //     type: Array | Object,
        //     default() {
        //         return []
        //     }
        // },
        // seller: {
        //     type: Object,
        //     default() {
        //         return {}
        //     }
        // }
    },
    data() {
        return {
            Index: 0,
            // goods: [],
            scrollOptions: {
                click: false,
                directionLockThreshold: 0
            },
            touchStatus: false,
            scrollY: 0,
            CurrentIndex: 0,
            foodsList: [],
            timer: null,
            selectedFood: {},
            chooseFood: false
        }
    },
    components: {
        SupportIco,
        ShopCart,
        CartControl,
        Food
    },
    computed: {
        seller() {
            return this.data.seller
        },
        goods() {
            return this.data.goods
        },
        selectedFoods() {
            let foods = []
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count>0) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    methods: {
        // _initScroll() {
        //     this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        //         click: true
        //     })
        //     this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        //         click: true,
        //         probeType: 3
        //     })
        //     this.foodsList = this.goods.map((item,index)=>{
        //         return this.$refs[item.name][0].offsetTop
        //     })
        // },
        // handleClick(v,event,index) {
        //     if(!event._constructed) {
        //         return 
        //     }
        //     const element = this.$refs[v][0]
        //     this.CurrentIndex = index
        //     this.foodsScroll.scrollToElement(element)
        // },
        // handleTouchStart() {
        //     this.touchStatus = true
        // },
        // handleTouchMove(e) {
        //     if(this.touchStatus) {
        //         let that = this
        //         if(this.timer) {
        //             clearTimeout(this.timer);
        //         }
        //         this.timer = setTimeout(()=>{
        //             this.foodsScroll.on('scroll',function(pos) {
        //                 that.scrollY = Math.abs(Math.round(pos.y))
        //                 for(let j = 0; j < that.foodsList.length; j++) {
        //                     let height1 = that.foodsList[j]
        //                     let height2 = that.foodsList[j+1]
        //                     if((!height2 && that.scrollY>=height1) || (height1 <= that.scrollY && that.scrollY < height2)) {
        //                         const ele = that.$refs[j][0]
        //                         that.CurrentIndex = j
        //                         that.menuScroll.scrollToElement(ele)
        //                         break
        //                     }
        //                 }
        //             })
        //         },16)
        //     }
        // },
        // handleTouchEnd() {
        //     this.touchStatus = false
        // },
        // cartadd(target) {
        //     // 体验优化，异步执行下落动画
        //     this.$nextTick(() => {
        //         this.$refs['shopcart'].drop(target)
        //     })
        // },
        // selectFood(food,event) {
        //     if(!event._constructed) {
        //         return
        //     }
        //     this.selectedFood = food
        //     this.chooseFood = true
        // }
    },
    mounted() {
        // this.$nextTick(() => {
        //     this._initScroll()
        // })
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
@import "~common/stylus/variable"
.goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
        position: absolute
        width: 100%
        top: 0
        left: 0
        bottom: 48px
    >>> .cube-scroll-nav-bar
        width: 80px
        white-space: normal     
        overflow: hidden
    >>> .cube-scroll-nav-bar-item
        padding: 0 10px
        display: flex
        align-items: center
        height: 56px
        line-height: 14px
        font-size: $fontsize-small
        background: $color-background-ssss
        .text
            flex: 1
            position: relative
        .num
            position: absolute
            right: -8px
            top: -10px
        .support-ico
            display: inline-block
            vertical-align:  top
            margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
            background: $color-white
            color: $color-dark-gray
    >>> .cube-scroll-nav-panel-title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid $color-col-line
        font-size: $fontsize-small
        color: $color-gray
        background: $color-background-ssss
    .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        position: relative
        &:last-child
            border-none()
            margin-bottom: 0
        .icon
            flex: 0 0 57px
            margin-right: 10px 
            img	
                height: auto 
        .content
            flex: 1
            .name
                margin: 2px 0 8px 0
                height: 14px
                line-height: 14px
                font-size: $fontsize-medium
                color: $color-dark-grey    
            .desc, .extra
                line-height: 10px
                font-size: $fontsize-small-s
                color: $color-light-grey     
            .desc
                line-height: 12px
                margin-bottom: 8px 
            .extra
                .count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: $fontsize-medium
                    color: $color-red
                .old
                    text-decoration: line-through
                    font-size: $fontsize-small-s
                    color: $color-light-grey
            .cartcontrol-wrapper
                position: absolute
                right: 0
                bottom: 12px
    .shop-cart-wrapper
        position: absolute
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        // .goods
        //     display: flex
        //     position: absolute 
        //     // top: 177px
        //     // bottom: 46px
        //     width: 100%
        //     overflow: hidden
        //     .menu-wrapper
        //         flex: 0 0 80px
        //         width: 80px
        //         background: #f3f5f7
        //         .menu-item
        //             display: table
        //             width:  56px 
        //             padding: 0 12px
        //             line-height: 14px 
        //             height: 54px
        //             &.current
        //                 position: relative
        //                 z-index: 10
        //                 margin-top: -1px
        //                 font-weight: 700
        //                 background-color: #fff
        //                 line-height: 20px
        //                 .text
        //                     border-none()
        //             .icon
        //                 display: inline-block
        //                 width: 12px
        //                 height: 12px 
        //                 margin-right: 2px
        //             .text
        //                 display: table-cell
        //                 vertical-align: middle
        //                 width: 56px
        //                 font-size: 12px
        //                 border-1px(rgba(7,17,27,0.1))

        //     .foods-wrapper
        //         flex: 1
        //         .title
        //             padding-left: 14px
        //             height: 26px
        //             line-height: 26px
        //             border-left: 2px solid #d9dde1
        //             font-size: 12px
        //             color: rgb(147,153,159)
        //             background: #f3f5f7
        //         .food-item
        //             display: flex
        //             margin: 18px
        //             padding-bottom: 18px
        //             border-1px(rgba(7,17,27,0.1))
        //             :last-child
        //                 border-none()
        //                 margin-bottom: 0
        //             .icon
        //                 flex: 0 0 57px
        //                 margin-right: 10px
        //             .content
        //                 flex: 1
        //                 .name
        //                     margin: 2px 0 8px 0
        //                     font-size: 14px
        //                     height: 14px
        //                     line-height: 14px
        //                     color: rgb(7,17,27)
        //                 .desc, .extra
        //                     line-height: 10px
        //                     font-size: 10px
        //                     color: rgb(147,153,159)
        //                 .desc
        //                     line-height: 12px
        //                     margin-bottom: 8px
        //                 .extra
        //                     .count
        //                         margin-right: 12px 
        //                 .price
        //                     font-weight: 700
        //                     line-height: 24px
        //                     .now
        //                         margin-right: 8px
        //                         font-size: 14px
        //                         color: rgb(240,24,20)
        //                     .old
        //                         font-size: 10px
        //                         color: rgb(147,153,1559)
        //                         text-decoration: line-through
                        
        //                 .cartcontrol-wrapper
        //                     position: absolute
        //                     right: 0
        //                     bottom: 12px
                
</style>