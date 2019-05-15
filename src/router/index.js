import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/goods',
            component: () =>
                import ('../components/v-content/Goods')
        },
        {
            path: '/seller',
            component: () =>
                import ('../components/v-content/Seller')
        },
        {
            path: '/ratings',
            component: () =>
                import ('../components/v-content/Ratings')
        }
    ]
})