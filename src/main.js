import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI  from 'element-ui'
import router from './router'

import 'lib-flexible'
import '../src/assets/reset_css/reset.css' //初始化样式css
import 'element-ui/lib/theme-chalk/index.css'//element-ui  css


import {store} from './store/store.js' //VUEX

Vue.config.productionTip = false
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
