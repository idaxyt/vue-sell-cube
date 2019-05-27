<template>
    <div class="tab">
        <cube-tab-bar
            :showSlider=true
            v-model='selectedLabel'
            :data='tabs'
            ref='tabBar'
            :useTransition='false'
            class="border-bottom-1px">
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide 
                :loop='false'
                :auto-play='false'
                :show-dots='false'
                :initial-index='index'
                ref='slide'
                :options='slideOptions'
                @change='onChange'
                @scroll="onScroll">
                <cube-slide-item>
                    23
                    <!-- <VGoods :goods='goodsData' :seller='sellerData'></VGoods> -->
                </cube-slide-item>
                <cube-slide-item>
                    565
                    <!-- <v-ratings :seller='sellerData' :rating='ratingsData'></v-ratings> -->
                </cube-slide-item>
                <cube-slide-item>
                    454
                    <!-- <v-seller :seller='sellerData'></v-seller> -->
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
            }],
            slideOptions: {
                listenScroll: true,
                probeType: 3,
                directionLockThreshold: 0
            }
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
    methods: {
        onChange(current) {
            this.index = current
        },
        onScroll(pos) {
            const tabBarWidth = this.$refs.tabBar.$el.clientWidth
            const slideWidth = this.$refs.slide.slide.scrollerWidth
            const transform = -pos.x/slideWidth*tabBarWidth
            this.$refs.tabBar.setSliderTransform(transform)
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.tab >>> .cube-tab {
    padding: 10px 0
}
// .tab >>> .tab-color: grey
.tab >>> .cube-tab-bar-slider: rgb(240,20,20)
    // >>> .tab-slide-bgc: rgb(240,20,20)
.tab {
    display: flex
    flex-direction: column
    height: 100%
    .slide-wapper {
        flex: 1
        overflow: hidden
        height: 100%
    }
}  
</style>
