// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/style.css';
import qs from 'qs' 
Vue.use(ElementUI);
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios   
Vue.prototype.$axios = axios.create({

    headers: {'content-type': 'application/x-www-form-urlencoded'}
  
  });
  

//全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs

// 引入封装的api 全局注册 
import api from './axios/index.js'
Vue.use(api)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
