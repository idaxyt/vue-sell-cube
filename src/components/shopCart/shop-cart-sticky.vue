<template>
    <div class="shop-cart-sticky" v-show='visible'>
        <shop-cart
            ref='shopCart'
            :selectFoods='selectFoods'
            :seller='seller'
            :fold='fold'
            :sticky=true
        >

        </shop-cart>
    </div>
</template>

<script>
import ShopCart from './ShopCart'
import popupMixin from '../../common/mixins/popup'
export default {
    mixins: [popupMixin],
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
        },
        fold: {
            type: Boolean,
            default: true
        },
        list: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        ShopCart
    },
}
</script>

<style lang="stylus" scoped>
    .shop-cart-sticky
        position: absolute 
        left: 0
        bottom: 0
        z-index: 999
        width: 100%
        height: 48px
</style>
