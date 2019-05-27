<template>
    <div class="cart-control">
        <transition name='move'>
            <div 
                class="cart-decrease" 
                v-show='food.count>0' 
                @click.stop.prevent='decreaseCart($event)'
                >
                    <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent='addCart($event)'></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'CartControl',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if(!event._constructed) {
                return
            }
            if(!this.food.count) {
                this.$set(this.food,'count',1)
            } else {
                this.food.count++
            }
            this.$emit('cartadd',event.target)
        },
        decreaseCart(event) {
            if(!event._constructed) {
                return
            }
            if(this.food.count) {
                this.food.count--
            }
        }
    }
}
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
.cart-control
    .cart-decrease
        display: inline-block
        padding: 6px
        opacity: 1
        .inner
            display: inline-block
            line-height: $fontsize-large-xxx
            font-size: $fontsize-large-xxx
            color: rgb(0,160,220)
            transform: rotate(0)    
        //transition动画样式
        &.move-enter-active, &.move-leave-active
            transition: all 0.4s linear 
        &.move-enter, &.move-leave-to
            opacity: 1
            transform: translate3d(24px,0,0)
            .inner
                transform: rotate(180deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        font-size: 12px
        padding-top: 6px
        line-height: $fontsize-large-xxx
        text-align: center
        color: rgb(147,153,159)
    .cart-add
        display: inline-block
        padding: 6px
        line-height: $fontsize-large-xxx
        font-size:  $fontsize-large-xxx
        color: rgb(0,160,220)
</style>

