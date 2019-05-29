<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <cube-scroll-nav
                :side=true
                :data='goods'
                :options='scrollOptions'
                v-if='goods.length'>
                <template slot='bar' slot-scope='props'>
                    <cube-scroll-nav-bar 
                        direction='vertical'
                        :labels='props.labels'  
                        :txts='barTxts'
                        :current='props.current'>
                        <template slot-scope='props'>
                            <div class="text">
                                <support-ico class="icon" v-show='props.txt.type >=1' :size='3' :type='props.txt.type'></support-ico>
                                <span>{{props.txt.name}}</span>
                                <span class="num" v-show='props.txt.count'><bubble :num='props.txt.count'></bubble></span>
                            </div>
                        </template>
                    </cube-scroll-nav-bar>
                </template>
                <cube-scroll-nav-panel
                    v-for='(good,goodIndex) in  goods' 
                    :key='goodIndex'
                    :label='good.name'
                    :title='good.name'>
                    <ul>
                        <li
                            v-for="(food,foodIndex) in good.foods"
                            :key='foodIndex'
                            class="food-item"
                            @click="selectFood(food)">
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
                                    <CartControl :food="food" ></CartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <div class="shop-cart-wrapper">
            <ShopCart :seller='seller' :select-foods='selectedFoods' ref='shopcart'></ShopCart>
        </div>
    </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'
import ShopCart from '../shopCart/ShopCart'
import CartControl from '../cartControl/CartControl'
import Food from '../food/food'
import Bubble from "../bubble/Bubble"
import { getGoods } from '../../api'
export default {
    name: 'Goods',
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            Index: 0,
            goods: [],
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
            chooseFood: false,
            fetched: false
        }
    },
    components: {
        SupportIco,
        ShopCart,
        CartControl,
        Food,
        Bubble
    },
    computed: {
        seller() {
            return this.data.seller
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
        },
        barTxts() {
            let ret = []
            this.goods.forEach((good) => {
                const {type,name,foods} = good
                let count = 0
                foods.forEach((food)=>{
                    count += food.count || 0

                })
                ret.push({
                    type,
                    name,
                    count
                })
            })
            return ret
        }
    },
    methods: {
        fetch() {
            if(!this.fetched) {
                this.fetched = true
                getGoods().then((good) => {
                    this.goods = good
                })
            }
        },
        selectFood(v) {
            this.selectedFood = v
            this._showFood()
            this._showShopCartSticky()
        },
        _showFood() {
            this.foodComp = this.foodComp || this.$createFood({
                $props: {
                    food: 'selectedFood'
                }
            })
            this.foodComp.show()
        },
        _showShopCartSticky() {
            this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
                $props: {
                    selectFoods: 'selectedFoods',
                    seller: 'seller',
                    fold: true,
                }
            })
            this.shopCartStickyComp.show()
        }
    },
    mounted() {
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
</style>