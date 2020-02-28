import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
axios.defaults.baseURL="http://localhost:8088/"
// //配置请求根路径
// Vue.prototype.$http = axios
Vue.prototype.$axios = axios

//引入qs,往后台发送请求时进行参数转换
// import qs from 'qs';
// Vue.prototype.qs =qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
