import { worldMap, chinaMap } from '@/libs/amap';
/**
 * 汇总展示 - 地图流入
 * @param { Object } _this 当前vue的this
 * @param { Array } chinaDatas x轴数据 [name,name,name]
*/

export const inflowChart = (chinaDatas) => {
  const chinaGeoCoordMap = chinaMap();
  const convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = chinaGeoCoordMap[dataItem.name];
      var toCoord = [115.003155, 38.868041];
      if (fromCoord && toCoord) {
        res.push([{
          coord: fromCoord,
          value: dataItem.value
        }, {
          coord: toCoord
        }]);
      }
    }
    return res;
  };
  var series = [];
  [['北京', chinaDatas]].forEach(item => {
    series.push(
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 4// 图标大小
        },
        silent: true,//   鼠标划到线上无反应
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.4,
            curveness: 0.3,
            color: '#fff'
          }
        },
        data: convertData(item[1])
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        label: {
          normal: {
            show: false,
            position: 'right', //   显示位置
            //   offset: [5, 0], //   偏移设置
            formatter: function (params) {
              return params.name;
            },
            fontSize: 7
          },
          emphasis: {
            show: true
          }
        },
        symbol: 'circle',
        symbolSize: 2,
        itemStyle: {
          normal: {
            show: false,
            color: '#fff'
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem.name,
            value: chinaGeoCoordMap[dataItem.name].concat([dataItem.value])
          };
        })
      },
      { //   被攻击点
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            //   offset:[5, 0],
            color: '#fff',
            formatter: function (params) {
              return params.name;
            },
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            show: false,
            color: '#fff'
          }
        },
        symbol: 'pin',
        symbolSize: 10,
        data: [{
          name: '北京', //   item[0],
          value: chinaGeoCoordMap[item[0]]
        }]
      }
    );
  });
  return {
    tooltip: {
      trigger: 'item',
      borderColor: '#FFFFCC',
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: 'z-index:100',
      formatter: function (params) {
        return params.data.name + (params.data.value[2] ? ':' + params.data.value[2] : '');
      }
    },
    legend: {
      orient: 'vertical',
      top: 'bottom',
      left: 'right',
      textStyle: {
        color: '#fff'
      },
      selectedMode: 'single'
    },
    geo: {
      top: 30,
      map: 'china',
      zoom: 1,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false, //    是否允许缩放
      itemStyle: {
        normal: {
          color: 'rgba(0, 210, 255, 0.4)', //    地图背景色
          borderColor: '#516a89', //    省市边界线00fcff 516a89
          borderWidth: 1,
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(81, 168, 205, 1)' //   0% 处的颜色

              }, {
                offset: 0,
                color: 'rgba(48, 102, 167, 1)' //   100% 处的颜色

              }],
            globalCoord: false //   缺省为 false
          }
        },
        emphasis: {
          color: 'rgba(37, 43, 61, .5)' //    悬浮背景
        }
      }
    },
    series: series
  };
};


/**
 * 汇总展示 - 世界地图流出
 * @param { Object } _this 当前vue的this
 * @param { Array } datas 数据 [name,value]
*/

export const worldmapChart = (datas) => {
  const worldDatas = []; // 定义一个数组
  datas.forEach((item, index) => { // 进行循环
    const num = index; // Math.floor(index / 2); 向下取整,加入一个页面想展示3条数据，就将数字为几
    if (!worldDatas[num]) {
      worldDatas[num] = []; // 如果不存在，则为null
    }
    worldDatas[num].push(item); // 将数据添加到数组里
  });
  const worldCoorMap = worldMap();
  const convertData = function (data) {
    const res = [];
    for (var i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = worldCoorMap[dataItem[0].name];
      const toCoord = [115.003155, 38.868041];
      if (fromCoord && toCoord) {
        res.push([{
          coord: fromCoord
        }, {
          coord: toCoord,
          value: dataItem[0].value
        }]);
      }
    }
    return res;
  };
  var series = [];
  [['中国', worldDatas]].forEach(item => {
    series.push(
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 4 // 图标大小
        },
        silent: true,//   鼠标划到线上无反应
        lineStyle: {
          normal: {
            width: 1, //     尾迹线条宽度
            opacity: 0.4, //     尾迹线条透明度
            curveness: 0.3, //     尾迹线条曲直度
            color: '#fff'
          }
        },
        data: convertData(item[1])
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { //     涟漪特效
          period: 4, //     动画时间，值越小速度越快
          brushType: 'stroke', //     波纹绘制方式 stroke, fill
          scale: 4 //     波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: 'right', //     显示位置
            offset: [5, 0], //     偏移设置
            formatter: function (params) {
              return params.name;
            },
            fontSize: 7
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          show: false
        },
        symbol: 'circle',
        symbolSize: 2, //     圆环大小
        itemStyle: {
          normal: {
            show: false,
            color: '#fff'
          }
        },
        data: item[1].map(function (dataItem) {
          let value = '';
          try {
            value = worldCoorMap[dataItem[0].name].concat([dataItem[0].value]);
          } catch {
            value = '';
          }
          return {
            name: dataItem[0].name,
            value: value
          };
        })
      },
      { //     被攻击点
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            //      offset:[5, 0],
            color: '#fff',
            formatter: function (params) {
              return params.name;
            },
            fontSize: 8,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            show: true,
            color: '#f60'
          }
        },
        symbol: 'pin',
        symbolSize: 10, //      中心点图标大小
        data: [{
          name: item[0],
          value: worldCoorMap[item[0]].concat([10])
        }]
      }
    );
  });
  return {
    tooltip: {
      trigger: 'item',
      borderColor: '#FFFFCC',
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: 'z-index:100',
      formatter: function (params) {
        if (params.seriesType === 'scatter') {
          return '北京';
        }
        return params.data.name + ':' + params.data.value[2];
      }
    },
    geo: {
      map: 'world',
      zoom: 1,
      top: 50,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false, //     是否允许缩放
      itemStyle: {
        normal: {
          color: 'rgba(0, 210, 255, 0.4)', //     地图背景色
          borderColor: '#516a89', //     省市边界线00fcff 516a89
          borderWidth: 1,
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(81, 168, 205, 1)' //   0% 处的颜色
              }, {
                offset: 0,
                color: 'rgba(48, 102, 167, 1)' //   100% 处的颜色
              }],
            globalCoord: false //   缺省为 false
          }
        },
        emphasis: {
          color: 'rgba(37, 43, 61, .5)' //     悬浮背景
        }
      }
      //   regions: [
      //     {
      //       name: '新疆',
      //       itemStyle: {
      //         areaColor: '#54b0d6'
      //       }
      //     },
      //     {
      //       name: '西藏',
      //       itemStyle: {
      //         areaColor: '#54b0d6'
      //       }
      //     }
      //   ]
    },
    series: series
  };
};
