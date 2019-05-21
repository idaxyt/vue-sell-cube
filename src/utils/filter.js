import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (time) => {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
})