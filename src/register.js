import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './components/v-header/header-detail'
import ShopCartList from './components/shopCart/shop-cart-list'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)