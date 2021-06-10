<template>
  <div class="content-main colorbai">
    <!-- 查询 -->
    <div class="query">
      <e-query></e-query>
    </div>
    <!-- 查询结果 -->
    <div class="queryResult">
      <e-query-result></e-query-result>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Container,
  Header,
  Main
} from 'element-ui';
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
export default {
  name: 'home',
  components: {
    // eHeader: () => import('@/components/header'),
    eQuery: () => import('./query'),
    eQueryResult: () => import('./queryResult')
  }
};
</script>

<style lang="scss" scoped>
.box {
  // @include vh();
}
header {
  padding: 0;
}
section {
  height: 100%;
}
.mainbox {
  min-height: calc(100% - 120px);
  background: #f5f5f5;
  margin-top: 10px;
}
</style>
