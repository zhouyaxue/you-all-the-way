import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vhCheck from 'vh-check';

import request from '@/libs/request.js';
import '@/libs/directive';
import '@/assets/styles/reset.scss';
import '@/assets/styles/global.scss';
import echarts from 'echarts';
import '@/libs/flexible';

import '@/libs/element.js';


Vue.prototype.$echarts = echarts;
Vue.prototype.$http = request;
vhCheck('browser-address-bar');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
