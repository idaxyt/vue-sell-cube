<template>
    <div class="shop-cart-sticky" v-show='visible'>
        <shop-cart
            ref='shopCart'
            :selectFoods='selectFoods'
            :seller='seller'
        >

        </shop-cart>
    </div>
</template>

<script>
import ShopCart from './ShopCart'
export default {
    name: 'shop-cart-sticky',
    props: {
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        seller: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        ShopCart
    },
    data() {
        return {
            visible: false
        }
    },
    methods:{
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        }
    }
}
</script>

<style lang="stylus" scoped>
    .shop-cart-sticky
        position: absolute 
        left: 0
        bottom: 0
        z-index: 999
        width: 33.3%
        height: 48px
</style>
