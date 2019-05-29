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
                <cube-slide-item v-for="(tab,tabIndex) in tabs" :key='tabIndex'>
                    <component :is="tab.component" :data='tab.data' ref='component'></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Tab',
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        initialIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            index: this.initialIndex,
            showSlider: false,
            slideOptions: {
                listenScroll: true,
                probeType: 3,
                directionLockThreshold: 0
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
            const component= this.$refs.component[current]
            component.fetch && component.fetch()
        },
        onScroll(pos) {
            const tabBarWidth = this.$refs.tabBar.$el.clientWidth
            const slideWidth = this.$refs.slide.slide.scrollerWidth
            const transform = -pos.x/slideWidth*tabBarWidth
            this.$refs.tabBar.setSliderTransform(transform)
        }
    },
    mounted() {
        this.onChange(this.index)
    }
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
    .slide-wrapper {
        flex: 1
        overflow: hidden
    }
}  
</style>
