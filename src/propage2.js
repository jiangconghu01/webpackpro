import Vue from 'vue'
import {http} from './util/ajax.js'
import P2 from './pages/index.vue'

Vue.prototype.$http = http
Vue.prototype.$echarts = echarts
new Vue({
    el: '#p2',
    render: h => h(P2)
})