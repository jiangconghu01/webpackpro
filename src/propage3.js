import Vue from 'vue'
import P3 from 'pages/index3.vue'
import Coms from 'pages/page3com/com.js'
import msg from 'pages/page3com/messagefun.js'
Vue.use(Coms)
Vue.prototype.$msg = msg;
new Vue({
    el: '#p3',
    render: h => h(P3)
})