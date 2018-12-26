import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
const axios = require('axios');

// 全局url
import {url} from './common/config';

import 'amfe-flexible'

Vue.prototype.$url = url;
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true; // 设置跨域可以存cookies
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
