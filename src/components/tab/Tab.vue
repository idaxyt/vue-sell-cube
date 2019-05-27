<template>
    <div class="tab">
        <cube-tab-bar
            :showSlider=true
            v-model='selectedLabel'
            :data='tabs'
            ref='tabBar'
            class="border-bottom-1px">
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide 
                :loop=false
                :auto-play=false
                :show-dots=false
                :initial-index='index'>
                <cube-slide-item>
                    <v-goods :goods='goodsData' :seller='sellerData'></v-goods>
                </cube-slide-item>
                <cube-slide-item>
                    <v-ratings :seller='sellerData' :rating='ratingsData'></v-ratings>
                </cube-slide-item>
                <cube-slide-item>
                    <v-seller :seller='sellerData'></v-seller>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
import VGoods from '../v-content/Goods'
import VRatings from '../v-content/Ratings'
import VSeller from '../v-content/Seller'
export default {
    name: 'Tab',
    data() {
        return {
            index: 0,
            showSlider: false,
            tabs: [{
                label: '商品',
            },{
                label: '评价'
            },{
                label: '商家'
            }]
        }
    },
    components: {
        VSeller,
        VRatings,
        VGoods
    },
    props: {
        goodsData: {
            type: Array | Object,
            default() {
                return []
            } 
        },
        sellerData: {
            type: Object,
            default() {
                return {}
            }
        },
        ratingsData: {
            type: Object | Array,
            default() {
                return []
            }
        }
    },
    computed: {
        selectedLabel: {
            get() {
                return this.tabs[this.index].label
            },
            set(newVal) {
                this.index = this.tabs.findIndex((value) => {
                    return value.label === newVal
                })
            }
        }
    },
}
</script>

<style lang="stylus">
    @import '~common/stylus/variable'

    .tab
        >>> .cube-tab
            padding: 10px 0
        >>> .tab-color: grey
        >>> .tab-active-color: rgb(240,20,20)
        // >>> .tab-slide-bgc: rgb(240,20,20)
        display: flex
        flex-direction: column
        height: 100%
        .slide-wapper
            flex: 1
            overflow: hidden
</style>
