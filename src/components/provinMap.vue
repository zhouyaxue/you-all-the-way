<template>
  <div class="map">
    <div class="maptitle">
      北京-人口省际{{moves}}情况
    </div>
    <div v-if="refIds === 'mapChartsInflow'"
         ref="mapChartsInflow"
         class="mapCharts"
         style="width:100%;height:100%"></div>
    <div v-if="refIds === 'mapChartsFlowOut'"
         ref="mapChartsFlowOut"
         class="mapCharts"
         style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import uploadedDataURL from '@/public/json/data.json';
import echarts from 'echarts';
import { BasicsChinaMap } from '@/public/echarts/chinaMap';
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
      refIds: '',
      moves: this.move,
      geoCoordMap: {
        江苏: [118.8062, 31.9208],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        四川: [103.9526, 30.7617]
      },
      d1: {
        江苏: 10041,
        黑龙江: 4093,
        内蒙古: 1157,
        吉林: 4903,
        北京市: 2667,
        辽宁: 8331,
        河北: 23727,
        天津: 681,
        山西: 5352,
        陕西: 38,
        甘肃: 77,
        宁夏: 65,
        青海: 10,
        新疆: 22000,
        四川: 309
      },
      colors: '#1DE9B6'
    };
  },
  mounted () {
    this.refIds = this.refId;
    this.$nextTick(() => {
      this.mapChart();
    });
  },
  methods: {
    mapChart () {
      var t = 0; // 流入流出控制 0 流出 1 流入
      if (this.move === '迁入') {
        t = 1;
      }
      // var r = 1; // 右侧流入流出文字控制
      // const year = ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06'];
      var geoGpsMap = [121.4648, 31.2891];
      const mapData = [
        []
      ];

      /* 柱子Y名称 */
      const categoryData = [];
      const barData = [];
      const geoCoordMap = this.geoCoordMap;
      const d1 = this.d1;
      const colors = this.colors;
      for (var key in geoCoordMap) {
        mapData[0].push({
          date: '2020-01',
          name: key,
          value: d1[key] / 100,
          value1: d1[key] / 100
        });
      }
      for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber (a, b) {
          return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value1);
          categoryData[i].push(mapData[i][j].name);
        }
      }
      const data = uploadedDataURL;
      echarts.registerMap('china', data);
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      var convertToLineData = function (data, gps) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var toCoord = geoCoordMap[dataItem.name];
          var fromCoord = gps; // 郑州
          //  var toCoord = geoGps[Math.random()*3];
          if (fromCoord && toCoord) {
            if (t === 1) {
              res.push([{
                coord: toCoord
              }, {
                coord: fromCoord,
                value: dataItem.value
              }]);
            } else {
              res.push([{
                coord: fromCoord,
                value: dataItem.value
              }, {
                coord: toCoord
              }]);
            }
          }
        }
        return res;
      };
      console.log(this.refIds, 'this.refIdsthis.refIdsthis.refIdsthis.refIds');
      if (this.refIds === 'mapChartsInflow') {
        const mapCharts = this.$echarts.init(this.$refs.mapChartsInflow);
        mapCharts.clear();
        mapCharts.setOption(BasicsChinaMap(colors, convertData, categoryData, convertToLineData, mapData, geoGpsMap));
      } else {
        const mapCharts = this.$echarts.init(this.$refs.mapChartsFlowOut);
        mapCharts.clear();
        mapCharts.setOption(BasicsChinaMap(colors, convertData, categoryData, convertToLineData, mapData, geoGpsMap));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  background: url(../assets/images/interlefttop.png) no-repeat center
    center/100% 100%;
  height: 100%;
  width: 100%;
  position: relative;
  .maptitle {
    background: url(../assets/images/inter-title-bg.png) no-repeat center
      center/100%;
    height: 33px;
    width: 254px;
    position: absolute;
    left: 0;
    top: 34px;
    line-height: 33px;
    color: #fff;
    text-indent: 10px;
  }
  .mapCharts {
    width: 100%;
    height: 100%;
  }
}
</style>
