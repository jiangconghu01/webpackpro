import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
        path: '/',
        name: 'overview',
        component: () => import ('../cztradecompetions/pagebox/overview.vue')
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import ('../cztradecompetions/pagebox/overviewDetail.vue')
    },
    {
        path: '/trend',
        name: 'trend',
        component: () => import ('../cztradecompetions/pagebox/incometrend.vue')
    },
    {
        path: '/struct',
        name: 'struct',
        component: () => import ('../cztradecompetions/pagebox/incomestruct.vue')
    },
    {
        path: '/mb5g',
        name: 'mb5g',
        component: resolve => require(['../cztradecompetions/pagebox/incomeMobile5G.vue'],resolve)
    },
    {
        path: '/broadband',
        name: 'broadband',
        component:resolve => require(['../cztradecompetions/pagebox/incomeBroadband.vue'],resolve)
    },
    {
        path: '/ict',
        name: 'ict',
        component: resolve => require(['../cztradecompetions/pagebox/incomeICTandIDC.vue'],resolve)
    },
    {
        path: '/profit',
        name: 'profit',
        component: resolve => require(['../cztradecompetions/pagebox/incomeProfitAndCost.vue'],resolve)
    }
  ]
})