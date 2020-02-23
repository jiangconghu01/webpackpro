import axios from 'axios'
import qs from 'qs'
import store_comp from '../store/competionstore.js'
// import store from '../store/store.js';
// axios.defaults.baseURL = 'http://134.98.100.73:9090';
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // let load = this.$loading({
  //   lock: true,
  //   text: 'Loading',
  //   fullscreen: false,
  //   // spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.6)'
  // })
  // this.loading = load
  // store.dispatch('loadAction',true)
  store_comp.dispatch('loadAction',true)
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  store_comp.dispatch('loadAction',false)
  return response
}, function (error) {
  store_comp.dispatch('loadAction',false)
  return Promise.reject(error)
})
const http = {
  get (url, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      axios.get(url, { params: params })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  post (url, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      // axios.post(url, qs.stringify(params))
      axios.post(url, params)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
const axiosUtil = axios;
export {http,axiosUtil} 
