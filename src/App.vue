<template>
  <div id="app">
    <el-container>
      <el-header>
        <e-header></e-header>
      </el-header>
      <el-main class="mainbox">
        <router-view />
      </el-main>
    </el-container>

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
  name: 'App',
  data () {
    return {};
  },
  components: {
    eHeader: () => import('@/components/header')
  },
  mounted () {
  },
  methods: {
  }
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>
