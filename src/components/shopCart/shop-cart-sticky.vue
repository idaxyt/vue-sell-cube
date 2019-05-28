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
    data() {
        return {
            visible: false
        }
    },
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
    }
}
</script>

<style lang="stylus" scoped>
    
</style>
