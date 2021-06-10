import Vue from 'vue';
import echarts from 'echarts';
import debounce from 'loadsh/debounce';
Vue.directive('resize', (el) => {
  window.addEventListener('resize', debounce(() => {
    echarts.init(el).resize();
  }, 100));
});

