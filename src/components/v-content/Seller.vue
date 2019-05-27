<template>
    <div class="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <Star :size='36' :score='seller.score'></Star>
                    <span class="text">{{seller.ratingCount}}</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="lastblock">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click='toggleFavorite'>
                    <span class="icon-favorite" :class="favorite?'active':''"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <Split></Split>
            <div class="scroll" ref='bulletinscroll'>
                <div class="bulletincontent">
                    <div class="bulletin" ref='bulletin'>
                        <h1 class="title">公告与活动</h1>
                        <div class="content-wrapper border-1px">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key='index'>
                            <support-ico class="icon" :size='2' :type='item.type'></support-ico>
                            <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                    </div>
                    <Split></Split>
                    <div class="pics">
                        <h1 class="title">商家实景</h1>
                        <div class="pic-wrapper" ref='picScroll'>
                            <ul class="pic-list" ref='picwidth'>
                                <li class="pic-item" v-for="(pic,index) in seller.pics" :key='index'>
                                <img :src="pic" width='120' height='90' alt="">  
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Split></Split>
                    <div class="info">
                        <h1 class="title border-1px">商家信息</h1>
                        <ul>
                            <li class="info-item" v-for='(info,index) in seller.infos' :key='index'>
                                {{info}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
import Star from '../star/star'
import Split from '../split/split'
import SupportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'
import { saveToLocal,loadFromLocal } from '../../common/store/index'
export default {
    name: 'Seller',
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
        // seller: {
        //     type: Object,
        //     default() {
        //         return {}
        //     }
        // }
    },
    components: {
        Star,
        Split,
        SupportIco
    },
    data() {
        return {
            seller: this.data.seller,
            favorite: (()=>{
               return loadFromLocal(this.data.seller.id,'favorite',false)
            })(),
        }
    },
    computed: {
        favoriteText() {
            return this.favorite?'已收藏':'收藏'
        }
    },
    methods: {
        _initScroll() {
            if(this.seller.pics) {
                let picWidth = 120
                let margin = 6
                let width = (picWidth+margin)*this.seller.pics.length - margin
                this.$refs['picwidth'].style.width = width + 'px'
            }
            if(!this.bulletinScroll) {
                this.bulletinScroll = new BScroll(this.$refs['bulletinscroll'],{
                    click: true
                })
            } else {
                this.bulletinScroll.refresh()
            }
            if(!this.picScroll) {
                this.picScroll = new BScroll(this.$refs['picScroll'],{
                    click: true,
                    scrollX: true,
                    eventPassthrough: 'vertical'
                })
            } else {
                this.picScroll.refresh()
            }
        },
        toggleFavorite(event) {
            this.favorite = !this.favorite
            saveToLocal(this.seller.id,'favorite',this.favorite)
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this._initScroll()
        })
    }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin"

.seller
    position: absolute 
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
        padding: 18px
        position: relative
        .title
            margin-bottom: 8px
            line-height: 14px
            color: rgb(7,17,27)
            font-size: 14px
        .desc
            padding-bottom: 18px
            border-1px(rgba(7,17,27,0.1))
            font-size: 0
            margin-bottom: 18px
            .star
                display:  -webkit-inline-flex
                vertical-align: top
                margin-right: 8px
            .text
                display: inline-block
                margin-right: 12px
                line-height: 18px
                vertical-align: top
                font-size: 10px
                color: rgb(7,17,27)
        .remark
            display: flex
            .block
                flex: 1
                text-align: center
                border-right:1px solid rgba(7,17,27,0.1)
            .lastblock
                flex: 1
                text-align: center
                border: none
            h2
                margin-bottom: 4px
                line-height: 10px
                font-size: 10px
                color: rgb(147,153,159)
            .content
                line-height: 24px
                font-size: 10px
                color: rgb(7,17,27)
                .stress
                    font-size: 24px
        .favorite
            position: absolute
            width: 50px
            right: 11px
            top: 18px
            // text-align: center
            .icon-favorite
                display: block
                font-size: 24px
                color: #d4d6d9
                &.active
                    color: rgb(240,20,20)
            .text
                line-height: 10px
                font-size: 10px
                color: rgb(77,85,93)      
    .scroll
        overflow: hidden
        height: 340px
        .bulletincontent
            padding-top: 5px
            padding-bottom: 50px
            .bulletin
                padding: 18px 18px 0 18px 
                .title
                    margin-bottom: 8px
                    line-height: 14px
                    color: rgb(7,17,27)
                    font-size: 14px
                .content-wrapper
                    padding: 0 12px 16px 12px
                    border-1px(rgba(7,17,27,0.1))
                    .content
                        line-height: 24px
                        font-size: 12px
                        color: rgb(240,20,20)
                .supports
                    width: 100%
                    margin: 0 auto 
                    .support-item
                        padding: 16px 12px
                        font-size: 0
                        border-1px(rgba(7,17,27,0.1))
                    :last-child
                        margin-bottom: 0
                    .icon
                        display: inline-block
                        vertical-align: top
                        margin-right: 6px
                    .text
                        line-height: 16px;
                        font-size: 12px;
                        color: rgb(7,17,27)
            .pics
                padding: 18px
                .title
                    margin-bottom: 12px
                    line-height: 14px
                    color: rgb(7,17,27)
                    font-size: 14px
                .pic-wrapper
                    width: 100%
                    overflow: hidden
                    white-space: nowrap
                    .pic-list
                        font-size: 0
                        .pic-item
                            display: inline-block
                            margin-right: 6px
                            width: 120px
                            height: 90px
                            &:last-child
                                margin: 0
            .info
                padding: 18px 18px 0 18px
                color: rgb(7,17,27)
                .title
                    padding-bottom: 12px
                    line-height: 14px
                    color: rgb(7,17,27)
                    font-size: 14px
                .info-item
                    padding: 16px 12px
                    line-height: 16px
                    border-1px(rgba(7,17,27,0.1))
                    font-size: 12px
                    &:last-child
                        border-none()
</style>