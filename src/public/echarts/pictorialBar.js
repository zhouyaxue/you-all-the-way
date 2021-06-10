export const genderCharts = (data, xData) => {
  var xDatas = xData;
  var chartData = data;
  var maxValue = Math.max.apply(null, data);

  const option = {
    grid: {
      left: '20',
      right: '20%',
      bottom: '30',
      top: '50'
    },
    xAxis: [{
      type: 'category',
      data: xDatas,
      splitLine: {
        show: false
      },
      axisLabel: {
        interval: 0,
        margin: 5,
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontFamily: 'Microsoft YaHei'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false

      }
    }],
    yAxis: [{
      type: 'value',
      max: maxValue,
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
        show: false

      }
    }],
    series: [// 需要背景得自己另行增加一个层
      {
        type: 'pictorialBar',
        stack: '总量',
        silent: false,
        label: {
          normal: {
            show: false
          }
        },
        symbolClip: true,
        symbolBoundingData: maxValue,
        // symbolSize: [50, '100%'],
        symbol: 'roundRect',
        itemStyle: { // 控制每个柱子颜色
          normal: {
            color: (params) => {
              const colors = ['#F5DD11', '#3AC25D'];
              return colors[params.dataIndex];
            }
          }
        },
        symbolRepeat: true,
        symbolSize: [34, 9],// 宽度
        symbolMargin: 5,// 间隔
        data: chartData
      },// 象形柱状图
      {
        type: 'bar',
        barWidth: '58',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top',
            width: 58,
            fontSize: 14,
            fontFamily: 'ZHSCNMT-GBK',
            color: '#fff',
            formatter: function (params) {
              return params.value;
            }
          }

        },
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        data: data
      }// 文字lable
    ]
  };
  return option;
};
