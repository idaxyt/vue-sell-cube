<template>
    <div class="shopCart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
                    </div>
                    <div class="num" v-show='totalCount>0'>{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    <span>{{payDesc}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                return `起送￥${this.seller.minPrice}元`
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
        }
    }, 
}
</script>

<style lang='stylus' scoped>
.shopCart
    position: fixed
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
                    width: 24px
                    height: 16px
                    line-height: 16px
                    text-align: center
                    border-radius: 16px
                    font-size: 9px
                    font-weight: 700
                    color: white
                    border-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                    background: rgb(240,20,20)
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
</style>    

