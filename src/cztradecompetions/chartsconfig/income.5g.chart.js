

import getMonthsArr from  './data.handle.util.js'

//Array.from({length:12}, (val,i) => i+1+'月')
const user5gRateOfRise = {
  title: {
    text: '电信增长率',
    left: 10,
    textStyle: {
      color: '#4D4D4D',
      fontSize: 15,
      fontWeight: 300
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    x:'3%',
    x2:'2%',
    y: '15%',
    y2: 30
  },
  legend: {
    data: [],
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
      margin: 8,
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
    data: []
  }],
  yAxis: [
    {
      type: 'value',
      show:false,
      max:100
    },
    {
      type: 'value',
      show:false,
      min:-0.4
    }
  ],
  label: {
    show: false,
    position: 'top',
    //color: '#fff'
  },
  color: ['#106BDE ','#A2DAFF', '#FF7B00 ','#106BDE'],
  series: [
      {
          name:getChartsLegend[0],
          type:'bar',
          barWidth: '15', // ---柱形宽度
          barCategoryGap: '8%',
          label:{
              show:true,
              position:'top',
              color:'#106BDE'
          },
         // data:[2.6, 5.9, 9.0, 20.4, -2.7, 7.7, 15.6, -1.2, 8.7, 18.8, 8.8, 1.8]
          data:[2.6, 5.9, 20.4, -2.7]
      },
      {
          name:getChartsLegend[1],
          type:'line',
          yAxisIndex: 1,
          label:{
              show:true,
             // color:'#FF7B00'
          },
          data:[0.1, 0.2, 0.3, 0.1, 0.8, 0.2, 0.4, 0.4, 0.4, 0.59, 0.2, 0.9]
      },
      {
          name:getChartsLegend[2],
          type:'line',
          yAxisIndex: 1,
          label:{
              show:true,
             // color:'#FF7B00'
          },
          data:[0.2, 0.2, 0.3, 0.5, 0.5, 0.2, 0.3, 0.7, 0.4, 0.59, 0.2, 0.19]
      },
      {
          name:getChartsLegend[3],
          type:'line',
          yAxisIndex: 1,
          label:{
              show:true,
              //color:'#FF7B00'
          },
          data:[0.7, 0.5, 0.1, 0.6]
      }
  ]
}
  export  {
      incomeTrendRateOfRise
    }