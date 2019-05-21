import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import resource from 'vue-resource'
import './utils/filter'

import './common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(resource)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')