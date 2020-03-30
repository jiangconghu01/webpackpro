import Vue from 'vue'
import Com1 from './com1.vue'
import Com2 from './com2.vue'

const coms = [
    Com1,
    Com2
]
const install = function(Vue){
    coms.forEach(component => {
        Vue.component(component.name,component)
    })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

//   export default {
//       install
//   }
  export default {
      install,
      Com1,
      Com2
  }