<template>
    <div class="shopCart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <span class="icon-shopping_cart"></span>
                    </div>
                </div>
                <div class="price">￥</div>
                <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                    起送￥{{seller.minPrice}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShopCart',
    props: {
        seller: Object
    }
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
                    .icon-shopping_cart
                        font-size: 24px
                        color: #80858a
                        line-height: 44px
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
</style>    

