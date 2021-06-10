<template>
  <div class="homemap">
    <div class="choice">
      <div class="choice-item">
        <span>地区</span>
        <el-select class="selectbox"
                   v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="choice-item">
        <span>时间范围</span>
        <el-time-select class="selectbox selectDate"
                        v-model="valueDate"
                        :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
                        placeholder="选择时间">
        </el-time-select>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts';
export default {
  props: {
    refId: {
      type: String,
      default: ''
    },
    move: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      valueDate: '',
      options: []
    };
  },
  mounted () {

  },
  methods: {
    mapChart () {


    }
  }
};
</script>

<style lang="scss" scoped>
.homemap {
  width: 100%;
  height: 100%;
  background: url(../assets/images/home-left-top-bg.png) no-repeat center
    center/100% 100%;
  .choice {
    padding-top: 40px;
  }
}
</style>
