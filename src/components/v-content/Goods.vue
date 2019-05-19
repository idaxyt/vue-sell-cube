<template>
    <div class="goods">
        <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li 
                    v-for="(item,index) in goods" 
                    :key='index' 
                    class="menu-item" 
                    @click="handleClick(item.name)"
                    :ref='index'
                    :class="CurrentIndex==index?'current':''"
                    >
                    <span class='text border-1px'>
                        <support-ico class="icon" v-show='item.type > 0' :size='3' :type='item.type'></support-ico>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref='foodsWrapper'>
            <ul>
                <li 
                    v-for="(item,index) in goods" 
                    :key="index" 
                    :ref='item.name'
                    @touchstart.prevent='handleTouchStart'
                    @touchmove='handleTouchMove'
                    @touchend='handleTouchEnd'>
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,k) in item.foods" :key="k" class="food-item border-1px">
                            <div class="icon">
                                <img width='57' height='57' :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'
export default {
    name: 'Goods',
    props: {
        goods: {
            type: Array | Object
        },
        seller: {
            type: Object
        }
    },
    data() {
        return {
            Index: 0,
            touchStatus: false,
            scrollY: 0,
            CurrentIndex: 0,
            foodsList: [],
            timer: null
        }
    },
    components: {
        SupportIco
    },
    computed: {
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                probeType: 3
            })
            this.foodsList = this.goods.map((item,index)=>{
                return this.$refs[item.name][0].offsetTop
            })
        },
        handleClick(v) {
            const element = this.$refs[v][0]
            this.foodsScroll.scrollToElement(element)
        },
        handleTouchStart() {
            this.touchStatus = true
        },
        handleTouchMove(e) {
            if(this.touchStatus) {
                let that = this
                if(this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(()=>{
                    this.foodsScroll.on('scroll',function(pos) {
                        that.scrollY = Math.abs(Math.round(pos.y))
                        for(let j = 0; j < that.foodsList.length; j++) {
                            let height1 = that.foodsList[j]
                            let height2 = that.foodsList[j+1]
                            if((!height2 && that.scrollY>height1) || (height1 <= that.scrollY && that.scrollY < height2)) {
                                const ele = that.$refs[j][0]
                                that.CurrentIndex = j
                                that.menuScroll.scrollToElement(ele)
                                break
                            }
                        }
                    })
                },16)
            }
        },
        handleTouchEnd() {
            this.touchStatus = false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll()
        })
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
.goods
    display: flex
    position: absolute 
    top: 177px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
            display: table
            width:  56px 
            padding: 0 12px
            line-height: 14px 
            height: 54px
            &.current
                position: relative
                z-index: 10
                margin-top: -1px
                font-weight: 700
                background-color: #fff
                line-height: 20px
                .text
                    border-none()
            .icon
                display: inline-block
                width: 12px
                height: 12px 
                margin-right: 2px
            .text
                display: table-cell
                vertical-align: middle
                width: 56px
                font-size: 12px
                border-1px(rgba(7,17,27,0.1))

    .foods-wrapper
        flex: 1
        .title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: rgb(147,153,159)
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-1px(rgba(7,17,27,0.1))
            :last-child
                border-none()
                margin-bottom: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                flex: 1
                .name
                    margin: 2px 0 8px 0
                    font-size: 14px
                    height: 14px
                    line-height: 14px
                    color: rgb(7,17,27)
                .desc, .extra
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147,153,159)
                .desc
                    line-height: 12px
                    margin-bottom: 8px
                .extra
                    .count
                        margin-right: 12px 
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 14px
                        color: rgb(240,24,20)
                    .old
                        font-size: 10px
                        color: rgb(147,153,1559)
                        text-decoration: line-through
                
</style>