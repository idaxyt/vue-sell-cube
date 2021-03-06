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
                    <cube-scroll class="list-contained" ref='listContent'>
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
import popupMixin from '../../common/mixins/popup'
const EVENT_LEAVE = 'leave'
const EVENT_SHOW = 'show'

export default {
    mixins: [popupMixin],
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
    created() {
        // >>> 问题: 购物车列表显示超过显示界面之后无法滚动
        // >>> 原因: 在visible为false时滚动列表已经初始化渲染，且此时计算出的高度有误，故visible为true时，scroll无法滚动
        // >>> 解决：监听visible变化的show事件，发生变化时重新渲染scroll，采用其refresh方法
        this.$on(EVENT_SHOW, ()=> {
            this.$nextTick(()=>{
                this.$refs.listContent.refresh()
            })
        })
    },
    methods: {
        onLeave() {
            this.$emit(EVENT_LEAVE)
        },
        maskClick() {
            this.hide()
        },
        empty() {
            this.$createDialog({
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
            }).show()
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


