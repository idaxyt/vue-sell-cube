<template>
    <div class="detail" v-show='detailShow'>
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
                <star :size='48' :score='seller.score'></star>
            </div>
            <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports" :key='index'>
                <SupportIco class="icon" :size='2' :type='item.type'></SupportIco>
                <span class="text">{{item.description}}</span>
                </li>
            </ul>
            <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
            </div>
            <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
            </div>
            </div>
        </div>
      <!-- 固定在浮窗底部的close按钮，采用css sticky footer布局 -->
        <div class="detail-close" @click='detailShow=false'>
            <i class="icon-close"></i>
        </div>
    </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import Star from '../star/star'
export default {
    name: 'header-detail',
    props: {
        seller: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    components: {
        SupportIco,
        Star
  }
}
</script>

<style lang='stylus' scoped>
.detail 
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    color: white
    backdrop-filter: blur(10px)
    .detail-wrapper
      min-height: 100%; 
      width: 100%
      .detail-main
        margin-top: 64px;
        padding-bottom: 64px;
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255,255,255,0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: 14px
        .supports
            width: 80%
            margin: 0 auto 
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              :last-child
                margin-bottom: 0
              .icon
                display: inline-block
                vertical-align: top
                margin-right: 6px
              .text
                line-height: 15px;
                font-size: 12px;
        .bulletin
          width: 80%;
          margin: 0 auto 
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
</style>
