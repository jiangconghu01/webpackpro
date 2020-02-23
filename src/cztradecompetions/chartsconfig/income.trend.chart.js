
const getChartsLegend = function(){
    const year=~~new Date().getFullYear();
    const yearlist = [year,year-2,year-1,year];
    const legend=yearlist.map((val,index)=> index === 0 ? val+'累计增长率':val+'年');
    return legend;
}();
const xAxisLabel =  Array.apply(null,{length:12}).map((val,index)=>index+1+'月');

const getChartsYlabel = function(){
    const year=~~new Date().getFullYear();
    const mongths = Array.apply(null,{length:12}).map((val,index)=>index+1+'月');
    const target = mongths.unshift((year-1+'').slice(2,4)+'年底');
    return mongths;
}();

//Array.from({length:12}, (val,i) => i+1+'月')
const incomeTrendRateOfRise = {
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
      data: getChartsLegend,
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
      data: xAxisLabel
    }],
    yAxis: [
      {
        type: 'value',
        show:false,
        max:50
      },
      {
        type: 'value',
        show:false,
        min:0
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
                color:'#106BDE',
                formatter:'{c}%'
            },
           // data:[2.6, 5.9, 9.0, 20.4, -2.7, 7.7, 15.6, -1.2, 8.7, 18.8, 8.8, 1.8]
            data:[2.6, 5.9, 20.4, -2.7]
        },
        {
            name:getChartsLegend[1],
            type:'line',
            yAxisIndex: 1,
            label:{
                show:true
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
const user5GConfig = {
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
      x:'5%',
      x2:'2%',
      y: '15%',
      y2: 40
    },
    legend: {
      data: getChartsLegend,
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
        rotate: 30,
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
      data: xAxisLabel
    }],
    yAxis: [
      {
        type: 'value',
        show:false
      },
      {
        type: 'value',
        show:false,
        min:0
      }
    ],
    label: {
      show: false,
      position: 'top',
      //color: '#fff'
    },
    color: ['#106BDE ', '#FF7B00 ','#A2DAFF','#106BDE'],
    series: [
        {
            name:getChartsLegend[0],
            type:'bar',
            barWidth: '15', // ---柱形宽度
            barCategoryGap: '8%',
            label:{
                show:true,
                position:'top',
                color:'#106BDE',
                formatter:'{c}%'
            },
           // data:[2.6, 5.9, 9.0, 20.4, -2.7, 7.7, 15.6, -1.2, 8.7, 18.8, 8.8, 1.8]
            data:[2.6, 5.9, 20.4, -2.7]
        },
        {
            name:getChartsLegend[1],
            type:'line',
            yAxisIndex: 1,
            label:{
                show:true
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
const ictAndidcConfig = {
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
      x:'5%',
      x2:'2%',
      y: '15%',
      y2: 25
    },
    legend: {
      data: getChartsLegend,
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
      data: xAxisLabel
    }],
    yAxis: [
      {
        type: 'value',
        show:false
      },
      {
        type: 'value',
        show:false,
        min:0
      }
    ],
    label: {
      show: false,
      position: 'top',
      //color: '#fff'
    },
    color: ['#106BDE ', '#FF7B00 ','#A2DAFF','#106BDE'],
    series: [
       
    ]
  }
//   const incomeTrendConfig ={    
//     title: {
//         text: '收入份额走势(累计)',
//         // subtext: '纯属虚构'
//         left: '10',
//         top: '10',
//         textStyle: {
//             fontSize: 15,
//             fontWeight: 300
//         }
//     },
//     legend: {
//         data: ['电信', '移动','联通'],
//         color: ['#174FF2', '#3998FF','#FF8500'],
//         right: 10,
//         top: '10'
//     },
//     tooltip: {
//         trigger: 'axis',
//         // formatter: function(params) {
//         //     return `${params[0].name}</br>
//         //     ${params[0].seriesName}:${params[0].data.value2}`;
//         // }
//     },
//     calculable: true,
//     grid: {
//         x: 80,
//         y: 40,
//         x2: 100,
//         y2: 10
//     },
//     xAxis: [{
//         type: 'value',
//         show:false,
//         boundaryGap: [0, 0.01],
//         // max: 1.2,
//         // min: -2,
//         axisLabel: {
//             margin: 8, // ---刻度标签与轴线之间的距离
//             fontSize: 12,
//             fontWeight: 200,
//             // formatter: (val) => {
//             //     return `${val * 100}%`;
//             // }
//         },
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 width: 1,
//                 type: 'solid',
//                 opacity: 0.1 // ---类型
//             }
//         },
//         axisLine: {
//             show: false
//         },
//         axisTick: {
//             show: false
//         }
//     }],
//     yAxis: [{
//         type: 'category',
//         data: getChartsYlabel,
//         axisLabel: {
//             margin: 8, // ---刻度标签与轴线之间的距离
//             fontSize: 12,
//             fontWeight: 200,
//         },
//         splitLine: {
//             show: false
//         },
//         axisLine: {
//             show: false,
//             lineStyle: {
//                 width: 1,
//                 type: 'solid',
//                 opacity: 0.1
//             },
//         },
//         axisTick: {
//             show: false
//         }
//     }],
//     dataZoom: [{
//         type: 'slider',
//         yAxisIndex: 0,
//         filterMode: 'empty',
//         bottom: '10%',
//         start: 0,
//         end: 30,
//         // textStyle: {
//         //     color: 'rgba(255, 255, 255, 0.8)'
//         // }
//     },
//     {
//         type: 'inside',
//         yAxisIndex: 0,
//         filterMode: 'empty'
//     }
//     ],
//     color: ['#174FF2', '#3998FF','#FF8500'],
//     series: [
//         {
//         name: '电信',
//         type: 'bar',
//         stack: 'yy',
//         // color: '#ffcc00','#94ef30'
//         // color: function(params) {
//         //     // console.log(params);
//         //     if (parseFloat(params.data.value2) < 0) {
//         //         return '#94ef30';
//         //     }
//         //     return '#ffcc00';
//         // },
//         barWidth: '14', // ---柱形宽度
//         barCategoryGap: '10%', // ---柱形间距
//         label: {
//             show:true,
//             position: 'inside'
//             // formatter: function(params) {
//             //     return params.data.value2;
//             // }
//         },
//         data: [12,20,3,6,7,43,23,24,24,42,33,4,8]
//     },
//     {
//         name: '移动',
//         type: 'bar',
//         stack: 'yy',
//         // color: '#ffcc00','#94ef30'
//         // color: function(params) {
//         //     // console.log(params);
//         //     if (parseFloat(params.data.value2) < 0) {
//         //         return '#94ef30';
//         //     }
//         //     return '#ffcc00';
//         // },
//         barWidth: '14', // ---柱形宽度
//         barCategoryGap: '10%', // ---柱形间距
//         label: {
//             show:true,
//             position: 'inside',
//             offset:[0,-9],
//             formatter: function(params) {
//                 //return params.data.value2;
//                 console.log(params.data)
//                 return ['{backgreen|-2.9}','{separate|}','{text|'+params.data+'}'].join('\n');
//             },
//             rich:{
//                 backgreen:{
//                     backgroundColor: '#C7C7C7',
//                     color: '#fff',
//                     padding: [2,10]
//                 },
//                 separate:{
//                     width:0,
//                     lineHeight:2,
//                     //hight:1,
//                     backgroundColor: '#transparent',
//                 },
//                 text:{
//                     color: '#fff',
//                     backgroundColor: '#transparent',
//                     padding: [1,10]
//                 }
//             }
//         },
//         data: [51,20,3,6,7,43,23,24,24,42,33,4,8]
//     },
//     {
//         name: '联通',
//         type: 'bar',
//         stack: 'yy',
//         // color: '#ffcc00','#94ef30'
//         // color: function(params) {
//         //     // console.log(params);
//         //     if (parseFloat(params.data.value2) < 0) {
//         //         return '#94ef30';
//         //     }
//         //     return '#ffcc00';
//         // },
//         barWidth: '14', // ---柱形宽度
//         barCategoryGap: '10%', // ---柱形间距
//         label: {
//             show:true,
//             position: 'inside',
//             offset:[0,-9],
//             formatter: function(params) {
//                 //return params.data.value2;
//                 //console.log(params.data)
//                 return ['{backgreen|-2.9}','{separate|}','{text|'+params.data+'}'].join('\n');
//             },
//             rich:{
//                 backgreen:{
//                     backgroundColor: '#C7C7C7',
//                     color: '#FFF',
//                     padding: [2,10]
//                 },
//                 separate:{
//                     width:0,
//                     lineHeight:2,
//                     //hight:1,
//                     backgroundColor: '#transparent',
//                 },
//                 text:{
//                     color: '#fff',
//                     backgroundColor: '#transparent',
//                     padding: [1,10]
//                 }
//             }
//         },
//         data: [31,20,3,6,7,43,23,24,24,42,33,4,9]
//     }
// ]};

const trendLengdArr = ['联通','移动','电信'];
const richObj = {
  back:{
    fontSize: 12,
    //fontWeight:'lighter',
    color: '#000',
    textBorderColor:'rgba(255,255,255,0.7)',
    textBorderWidth:0,
    textShadowBlur:0,
    backgroundColor:'rgba(255,255,255,0.6)',
    width:30,
    height: 16,
    align:'center',
    verticalAlign:'middle'
  }
}
const  stackBarTrendChartConfig = {
    title: {
      text: '用户份额走势（累计）',
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
      x:'3.2%',
      x2:'3.2%',
      y: 50,
      y2: 30
    },
    legend: {
      data: [{icon:'rect',name:trendLengdArr[0]},{icon:'rect',name:trendLengdArr[1]},{icon:'rect',name:trendLengdArr[2]}],
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
      data: getChartsYlabel
    }],
    yAxis: [
      {
        type: 'value',
        show:false,
        max:100
      }
    ],
    label: {
      show: false,
      position: 'top',
      //color: '#fff'
    },
    color: ['#FF8500 ','#3998FF', '#174FF2 '],
    series: [
        {
            name:trendLengdArr[0],
            stack:'数量',
            type:'bar',
            barWidth: '10', 
            barCategoryGap: '8%',
            label:{
              show:true,
              position:'inside',
              formatter: params => '{back|' + parseFloat(params.value).toFixed(2) + '}',
              rich:richObj
          },
           data:[8, 8.5, 8.5, 8.5, 7.9, 7.7, 8, 7.9, 8, 8.8, 8.8, 8]
            //data:[2.6, 5.9, 20.4, -2.7]
        },
        {
          name:trendLengdArr[1],
          stack:'数量',
          type:'bar',
          barWidth: '10', // ---柱形宽度
          barCategoryGap: '8%',
          label:{
            show:true,
            position:'inside',
            formatter: params => '{back|'+parseFloat(params.value).toFixed(2)+'}',
            //backgroundColor:'#fff',
           // color:'#000',
            rich:richObj
        },
          data:[8, 8.5, 8.5, 8.5, 7.9, 7.7, 8, 7.9, 8, 8.8, 8.8, 8]
        },
        {
          name:trendLengdArr[2],
          stack:'数量',
          type:'bar',
          barWidth: '10', // ---柱形宽度
          barCategoryGap: '8%',
          label:{
              show:true,
              position:'inside',
              formatter: params => '{back|'+parseFloat(params.value).toFixed(2)+'}',
              //backgroundColor:'#fff',
             // color:'#000',
              rich:richObj
          },
          data:[8, 8.5, 8.5, 8.5, 7.9, 7.7, 8, 7.9, 8, 8.8, 8.8, 8]
        },
        {
            name:'分割线',
            stack:'fg',
            type:'line',
            label:{
                show:false,
            },
            lineStyle:{
              width:1
            },
            symbol:'none',
            tooltip:{
              show:false
            },
            data:[8, 8.5, 8.5, 8.5, 7.9, 7.7, 8, 7.9, 8, 8.8, 8.8, 8]
        },
        {
            name:'分割线',
            stack:'fg',
            type:'line',
            color:'#3998FF',
            label:{
                show:false,
            },
            lineStyle:{
              width:1
            },
            symbol:'none',
            tooltip:{
              show:false
            },
            data:[8, 8.5, 8.5, 8.5, 7.9, 7.7, 8, 7.9, 8, 8.8, 8.8, 8]
            
        }
    ]
  }
  export  {
      incomeTrendRateOfRise,
      //incomeTrendConfig,
      stackBarTrendChartConfig,
      user5GConfig,
      ictAndidcConfig
    }