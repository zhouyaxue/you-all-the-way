import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import HomePage from '@/views/homePage/homePage.vue';
// import request from '@/libs/request.js';
// import QS from 'qs';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    meta: {
      title: '一路有你'
    },
    component: HomePage
  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login')
  }
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});


NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});
router.beforeEach((to, form, next) => {
  console.log(2);
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
