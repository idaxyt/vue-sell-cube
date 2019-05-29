<template>
    <!-- cube-scroll可以监听数据发生变化之后会确保scroll的refresh，故将会变化的computedRatings传递给cube-scroll -->
    <cube-scroll class="ratings" :options='scrollOptions' :data='computedRatings'>
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <Star :size='36' :score='seller.serviceScore'></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <Star class="star" :size='36' :score='seller.foodScore'></Star><span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div> 
            </div>
            <Split></Split>
            <RatingSelect 
                @select='onSelect'
                @toggle='onToggle'
                :selectType='selectType' 
                :onlyContent='onlyContent' 
                :desc='desc' 
                :ratings='ratings'
                class="ratingSelect"
            ></RatingSelect>
            <div class="rating-wrapper" ref='ratings'>
                <div class="no-rating" v-show='!ratings'>暂无评价</div>
                <ul v-show='ratings && ratings.length'>
                    <li 
                        v-for='(rating,index) in computedRatings' 
                        :key='index' 
                        class="rating-item border-1px"
                        >
                        <div class="avater">
                            <img width='28' height='28' :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <Star class="star" :size='24' :score='rating.score'></Star><span class="delivery">{{rating.deliveryTime}}分钟</span>
                            </div>
                            <p class="text">
                                {{rating.text}}
                            </p>
                            <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
                                <span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'" ></span>
                                <span class="item" v-for="(recommend,index) in rating.recommend" :key="index">{{recommend}}</span>	
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>    
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </cube-scroll>
</template>

<script scoped>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2
import Star from '../star/star'
import Split from '../split/split'
import RatingSelect from '../ratingselect/ratingselect'
import { getRatings } from "../../api"
import ratingMixin from '../../common/mixins/rating'
export default {
    mixins: [ratingMixin],
    name: 'Ratings',
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        Star,
        Split,
        RatingSelect
    },
    data() {
        return {
            fetched: false,
            scrollOptions: {
                click: false,
                directionLockThreshold: 0
            },
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            }
        }
    },
    computed: {
        seller() {
            return this.data.seller || {}
        },
    },
    methods: {
        fetch(){
            if(!this.fetched) {
                this.fetched = true
                getRatings().then((rating) => {
                    this.ratings = rating
                })
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
    .ratings
        position: relative 
        text-align: left 
        white-space: normal 
        height: 100%
        .overview
            display: flex
            padding: 18px 0
            .overview-left
                flex: 0 0 137px
                padding: 6px 0
                width: 137px
                text-align: center
                border-right: 1px solid rgba(7,17,27,0.1)
                @media only screen and (max-width: 320px)
                    flex: 0 0 110px
                    width: 110px
                .score
                    margin-bottom: 6px
                    height: 28px
                    line-height: 28px
                    font-size: 24px
                    color: rgb(255,153,0)
                .title
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: 12px
                    color: rgb(7,17,27)
                .rank
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147,153,159)
            .overview-right
                flex: 1
                padding: 6px 0 6px 24px
                @media only screen and (max-width: 320px)
                    padding: 6px 0 6px 12px
                .score-wrapper, .delivery-wrapper
                    margin-bottom: 8px
                    font-size: 0
                    .title
                        display: inline-block
                        vertical-align: top
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7,17,27)
                    .star
                        display: -webkit-inline-flex;
                        vertical-align: top
                        line-height: 18px
                        margin: 0 12px
                    .score
                        display: inline-block
                        vertical-align: top
                        line-height: 18px
                        font-size: 12px
                        color: rgb(255,153,0)
                    .delivery
                        margin: 12px
                        font-size: 12px
                        line-height: 18px
                        color: rgb(147,153,159)
        .ratingSelect
            z-index: 200                                    
        .rating-wrapper
            padding: 0 18px
            overflow: hidden
            z-index: 40 
            .no-rating
                margin: 12px;
            .scroll
                padding-bottom: 50px
            .rating-item
                display: flex 
                padding: 18px 0 
                border-1px(rgba(7,17,27,0.1))
                .avater
                    flex: 0 0 28px
                    width: 28px
                    margin-right: 12px
                    img
                        border-radius: 50%
                .content
                    position: relative
                    flex: 1
                    .name
                        margin-bottom: 4px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(7,17,27)
                    .star-wrapper
                        margin-bottom: 6px
                        font-size: 0
                        .star
                            display: -webkit-inline-flex;
                            margin-right: 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align: top
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147,153,159)
                    .text
                        margin-bottom: 8px
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7,17,27)
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .item
                            display: inline-block
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: rgb(0,160,220)
                        .item
                            padding: 0 6px
                            border: 1px solid rgba(7,17,27,0.1)
                            border-radius: 1px
                            color: rgb(147,153,159)
                            background: #fff
                    .time
                        position: absolute 
                        top: 0
                        right: 0
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147,153,159)
                    
</style>