

/***
 * 不规则饼状图
 *  @param { Array } data 数据 [{}]
 */
export const agePieChart = (data) => {
  const option = {
    color: ['#224DEE', '#07A1B7', '#224DEE', 'rgb(121,175,38)', 'rgb(6,201,104)', '#be72d8', '#fff'],
    series: [{
      name: '统计',
      type: 'pie',
      radius: [15, 60],
      center: ['40%', '50%'],
      roseType: 'radius',
      grid: {
        left: '50%',
        top: '5%',
        right: '5%',
        bottom: '5%'
      },
      tooltip: {
        trigger: 'item'
      },
      label: {
        show: true,
        formatter: '{b}',
        color: '#fff',
        fontSize: 12,
        padding: [5, -40, 0, 0]
      },
      labelLine: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: data
    }]
  };
  return option;
};
