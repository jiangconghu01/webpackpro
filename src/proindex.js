
import router from './router/tradecompRouter.js'
import Vue from 'vue'


import store from './store/competionstore.js'
import echarts from 'echarts'
import {http} from './util/ajax.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './css/reset.scss'

import './css/common.scss';
import tradeCompetion from './cztradecompetions/tradecompetion.vue'
// import tradeCompetion from 'pages/index.vue'

Vue.use(iView)
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts
new Vue({
      el: '#tradecomp',
      router,
      store,
      render: h => h(tradeCompetion)
})
// const isHas = [1,2,3].includes(2);

// const p = new Promise((resolve, reject) => {
//     resolve(100);
// });
// const ls = ()=>9;
// class Point {    
//     constructor(x, y) {      
//      this.x = x;        
//     this.y = y;    
//     };    
//     getX() {        return this.x;    }}
// let cp = new ColorPoint(25, 8);

// console.log('webpack demo:'+process.env.NODE_ENV)
