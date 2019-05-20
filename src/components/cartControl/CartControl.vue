<template>
    <div class="cart-control">
        <transition>
            <div 
                class="cart-decrease" 
                v-show='food.count>0' 
                @click='decreaseCart($event)'
                transition='move'>
                    <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click='addCart($event)'></div>
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
                Vue.set(this.food,'count',1)
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
.cart-control
    .v-enter, .v-leave-to 
        opacity: 0
        transform: rotate(180deg)
    .v-enter-active, .v-leave-active 
        transition: opacity 0.2s
    .cart-decrease
        display: inline-block
        padding: 6px
        .inner
            display: inline-block
            line-height: 24px
            font-size: 24px
            color: rgb(0,160,220)
            transform: rotate(0)    

    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        font-size: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        color: rgb(147,153,159)
    .cart-add
        display: inline-block
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
</style>

