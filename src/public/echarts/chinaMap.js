import { noData } from './eConfig';

/**
 * 地图流入流出图
 * @param { Array } geoGpsMap 坐标 [121.4648, 31.2891]
 * @param { String } colors 颜色 #1DE9B6
 * @param { Array } convertData 数据格式 [{name:'',value:''}]
 * @param {  } categoryData 柱状图数据
*/

export const BasicsChinaMap = (colors, convertData, categoryData, convertToLineData, mapData, geoGpsMap) => {
  if (!convertData || categoryData.length === 0) {
    return noData;
  }
  var optionXyMap01 = {
    timeline: {
      data: '',
      axisType: 'category',
      autoPlay: false,
      playInterval: 5000,
      left: '25%',
      right: '10%',
      bottom: '3%',
      width: '80%',
      show: false,
      //  height: null,
      label: {
        normal: {
          textStyle: {
            color: '#ddd'
          }
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      symbolSize: 10,
      lineStyle: {
        color: '#555'
      },
      checkpointStyle: {
        borderColor: '#777',
        borderWidth: 2
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: '#666',
          borderColor: '#666'
        },
        emphasis: {
          color: '#aaa',
          borderColor: '#aaa'
        }
      }

    },
    baseOption: {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
      grid: {
        right: '2%',
        top: '10%',
        bottom: '5%',
        width: '20%'
      },
      tooltip: {
        trigger: 'axis', // hover触发器
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          shadowStyle: {
            color: 'rgba(150,150,150,0.1)' // hover颜色
          }
        }
      },
      visualMap: {
        min: 0,
        max: 250,
        show: false,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        textStyle: {
          color: 'white'
        },
        calculable: true,
        colorLightness: [0.8, 100],
        color: ['#c05050', '#e5cf0d', '#5ab1ef'],
        dimension: 0

      },
      geo: {
        show: true,
        map: 'china',
        roam: true,
        zoom: 1,
        center: [113.83531246, 34.0267395887],
        label: {
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [{
                offset: 0,
                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            shadowColor: 'rgba(128, 217, 248, 1)',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      }
    },
    options: [{
      title: [{
        text: '',
        // subtext: '   ',
        left: '30%',
        top: '1%',
        textStyle: {
          color: '#fff',
          fontSize: 25
        }
      },
      {
        id: 'statistic',
        text: '',
        left: '75%',
        top: '3%',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      }
      ],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        min: 0,
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 1,
          textStyle: {
            color: '#aaa'
          }
        }
      },
      yAxis: {
        type: 'category',
        //  name: 'TOP 20',
        nameGap: 16,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        show: false,
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd'
          }
        },
        data: categoryData[0]
      },

      series: [
        // 未知作用
        {
          // 文字和标志
          name: 'light',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(mapData[0]),
          symbolSize: function () {
            return 6;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: colors
            }
          }
        },
        // 地图？
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 1.3, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#FFFFFF'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: mapData
        },
        // 地图点的动画效果
        {
          //  name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(mapData.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 20)),
          symbolSize: function () {
            return 5;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: colors,
              shadowBlur: 10,
              shadowColor: colors
            }
          },
          zlevel: 1
        },
        // 地图线的动画效果
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 5, // 箭头指向速度，值越小速度越快
            trailLength: 0.2, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 6 // 图标大小
          },
          lineStyle: {
            normal: {
              color: colors,
              width: 1, // 尾迹线条宽度
              opacity: 0.2, // 尾迹线条透明度
              curveness: 0.3 // 尾迹线条曲直度
            }
          },
          data: convertToLineData(mapData[0], geoGpsMap)
        }
        // 柱状图
        // {
        //   zlevel: 1.5,
        //   type: 'bar',
        //   barMaxWidth: 8,
        //   symbol: 'none',
        //   show: false,
        //   itemStyle: {
        //     normal: {
        //       color: colors,
        //       barBorderRadius: [0, 30, 30, 0]
        //     }
        //   },
        //   data: barData[0]
        // }
      ]
    }]
  };
  return optionXyMap01;
};
