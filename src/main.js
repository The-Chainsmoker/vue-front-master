import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './http/api'
import * as echarts from 'echarts'
import beforeDate from './util/beforeDate'

Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
Vue.prototype.getBeforeDate=beforeDate.getBeforeDate


import '@/styles/index.scss'// global css

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
