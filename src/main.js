import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'

import './common/stylus/index.styl'
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')