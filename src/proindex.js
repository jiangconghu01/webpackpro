
import router from './router/tradecompRouter.js'
// import Vue from 'vue'


import store from './store/competionstore.js'
// import echarts from 'echarts'
import {http} from './util/ajax.js'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import './css/reset.scss'

import './css/common.scss';
import tradeCompetion from './cztradecompetions/tradecompetion.vue'

// Vue.use(iView)
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts
new Vue({
      el: '#tradecomp',
      router,
      store,
      render: h => h(tradeCompetion)
})

