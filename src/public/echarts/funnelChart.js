
/**
 * 漏斗图 渐变色
 * @param { Array } data 数据 [name]
*/


/*  [
  { value: 60, name: '理财', reaVal: '34.34' },
  { value: 40, name: '上海之江', reaVal: '34.34' },
  { value: 20, name: '硕士', reaVal: '34.34' },
  { value: 80, name: '其它', reaVal: '34.34' }
] */
export const funnelChart = (data) => {
  const option = {
    color: ['rgba(199, 255, 6, 0.4)', 'rgba(11, 255, 177, 0.4)', 'rgba(10, 218, 255, 0.4)', 'rgba(26, 171, 255, 0.4)'],
    // 图例
    legend: {
      show: true,
      orient: 'vertical',
      left: '60%',
      top: '30%',
      padding: 0,
      itemGap: 7,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#C5EFFD',
        fontSize: 12
      },
      formatter: function (name) {
        var data = option.series[0].data;
        var total = 0;
        var tarValue;
        for (var i = 0; i < data.length; i++) {
          total += data[i].value;
          if (data[i].name === name) {
            tarValue = data[i].value;
          }
        }
        // var v = tarValue;
        var p = Math.round((tarValue / total) * 100);
        return `${name} ${p}% (${total})`;
      }
    },
    series: [
      {
        zlevel: 1,
        name: '漏斗图',
        type: 'funnel',
        left: '3%',
        top: 20,
        bottom: 20,
        width: '50%',
        min: 0,
        max: 120,
        minSize: '0%',
        maxSize: '100%',
        sort: 'ascending',
        gap: 2,
        legend: {
          show: true
          // left: '30%'
        },
        label: {
          show: false,
          position: 'right',
          width: '200px',
          align: 'right',
          formatter: function (params) {
            return params.data.name + ':' + params.data.reaVal + '%';
          }
        },
        tooltip: {
          trigger: 'item'
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderWidth: 0
        },
        emphasis: {
          label: {
            fontSize: 14,
            color: '#fff'
          }
        },
        data: data
      }

    ]
  };

  return option;
};

