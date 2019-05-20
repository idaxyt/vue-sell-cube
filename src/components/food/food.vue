<template>
    <transition>
        <div v-show='showFlag' class="food" trasition='move'>
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="back">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'food',
    props: {
        food: {
            type: Object
        },
        value: Boolean
    },
    data() {
        return {
            // showFlag: false
        }
    },
    computed: {
        showFlag() {
            return this.value
        }
    },
    methods: {
        back() {
            this.$emit('input',false)
        }
    }
}
</script>

<style lang='stylus' scoped> 
    .v-enter, .v-leave-to 
        opacity: 0
        transform: rotate(180deg)
    .v-enter-active, .v-leave-active 
        transition: opacity 0.2s
    .food 
        position: fixed
        left: 0
        top: 0
        width: 100%
        height: 100%
        bottom: 48px
        z-index: 30
        background: #fff
        &.move-transition
            transition: all 0.2s linear
            transform: translate3d(0,0,0)
        &.move-enter, &.move-leave
            transform: translate3d(100%,0,0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img 
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute 
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff
</style>

