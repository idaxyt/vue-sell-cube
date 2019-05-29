<template>
    <transition name='fade'>
        <!-- 弹层
        设置mask-closable之后会有mask-click事件产生
         -->
        <cube-popup
            v-show='visible'
            :mask-closable = true
            :z-index=90
            position='bottom'
            type='shop-cart-list'
            @mask-click='maskClick'
            >
            <transition 
            name='move'
            @after-leave='onLeave'
            >
                <div v-show='visible'>
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click='empty'>清空</span>
                    </div>
                    <cube-scroll class="list-contained" ref='list'>
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
                    </cube-scroll>
                </div>
            </transition>
        </cube-popup>
    </transition>
</template>

<script>
import CartControl from '../cartControl/CartControl'

const EVENT_HIDE = 'hide'
const EVENT_LEAVE = 'leave'

export default {
    name: 'shop-cart-list',
    props: {
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        CartControl
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
            this.$emit(EVENT_HIDE)
        },
        onLeave() {
            this.$emit(EVENT_LEAVE)
        },
        maskClick() {
            this.hide()
        },
        empty() {
            this.dialogComp = this.dialogComp || this.$createDialog({
                type: 'confirm',
                title: '清空购物车',
                conent: '确认清空购物车？',
                $events: {
                    confirm: () => {
                        this.selectFoods.forEach((food,index) => {
                            food.count = 0
                        })
                        this.hide()
                    }
                }
            })
            this.dialogComp.show()
        }
    },
    computed: {
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
// 设置cube-popup的type属性生成此属性
.cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-to
        opacity: 0
    &.fade-enter-active, &.fade-leave-active
        transition: all .3s ease-in-out
    .move-enter, .move-leave-to
        transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
        transition: all .3s ease-in-out
    .shopcart-list
        position: absolute 
        top: -257px
        left: 0
        z-index: 500
        width: 100%
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
</style>


