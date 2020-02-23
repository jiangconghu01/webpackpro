const incomeStructConfig = {
    // title: {
    //   text: '电价月度分析',
    //   left: 10,
    //   textStyle: {
    //     color: 'rgba(255, 255, 255, 0.8)',
    //     fontSize: 16,
    //     fontWeight: 300
    //   }
    // },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      x:'3%',
      x2:'2%',
      y: '15%',
      y2: 50
    },
    legend: {
      data: ['同比增长量（万元）','收入拉动贡献'],
      orient: 'horizontal',
      itemWidth: 20,
      // x: 'right',
      right: 50,
      y: 'top',
      textStyle: {
        //color: '#fff',
        fontSize: 12,
        fontWeight: 100
      }
    },
    calculable: true,
    xAxis: [{
      show: true,
      position: 'bottom',
      offset: 0,
      type: 'category',
      nameGap: 5,
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        interval: 0,
        show: true,
        inside: false,
        //rotate: 30,
        margin: 10,
        color: '#666666',
        fontSize: 12,
        fontWeight: 400,
        opacity: 0.7
      },
      axisTick: {
        show: false,
        inside: false,
        lengt: 3,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      axisLine: {
        show: true,
        symbol: ['none'],
        lineStyle: {
          color: '#CCC',
          width: 1,
          type: 'solid',
          opacity: 0.3
        }
      },
      data: ['主营收入','移动业务','流量手机','固网话音及增值','有线宽带','宽带电视','ICT','IDC','网元电路出租','其他']
    }],
    yAxis: [
      {
        type: 'value',
        show:false
      },
      {
        type: 'value',
        show:false
      }
    ],
    label: {
      show: false,
      position: 'top',
      //color: '#fff'
    },
    color: ['#106BDE', '#FF7B00'],
    series: [
        {
            name:'同比增长量（万元）',
            type:'bar',
            barWidth: '15', // ---柱形宽度
            barCategoryGap: '8%',
            label:{
                show:true,
                position:'top',
                color:'#106BDE'
            },
            data:[2.6, 5.9, 9.0, 20.4, -2.7, 7.7, 15.6, -1.2, 8.7, 18.8]
        },
        {
            name:'收入拉动贡献',
            type:'line',
            yAxisIndex: 1,
            label:{
                show:true,
                color:'#FF7B00',
                position:'bottom',
                formatter:'{c}%'
            },
            data:[0.2, 0.2, 0.3, 0.5, 0.3, 0.2, 0.3, 0.4, 0.4, 0.59]
        }
    ]
  }
  export default incomeStructConfig
  