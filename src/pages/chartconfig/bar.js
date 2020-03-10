
 var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
 var bgc='#060327';
 const option = {
     backgroundColor: bgc,
     grid: {
        borderWidth: 0,
        top: '5%',
        left: '5%',
        right: '12%',
        bottom: '0'
     },
     tooltip:{
        trigger:'item'
     },
     xAxis: [{
         show: false,
     }],
     yAxis: [{
         axisTick: 'none',
         axisLine: 'none',
         //offset: '27',
         //inverse: true,
         axisLabel: {
             show:false,
             textStyle: {
                 color: '#ffffff',
                 fontSize: '16',
             }
         },
         data: ['维修', '空闲', '休息']
     }, {
         axisTick: 'none',
         axisLine: 'none',
         axisLabel: {
             //show:false,
             textStyle: {
                 color: '#ffffff',
                 fontSize: '16',
             },
             formatter: function (val) {
                return `${val}`
              }
         },
         data: [19, 55, 75]
     }, {
         name: 'xxx',
         nameGap: '50',
         nameTextStyle: {
             color: '#ffffff',
             fontSize: '16',
         },
         axisLine: {
             lineStyle: {
                 color: 'rgba(0,0,0,0)'
             }
         },
         data: [],
     }],
     series: [{
             name: '人员情况:',
             type: 'bar',
             yAxisIndex: 0,
             data: [19, 55, 75],
             tooltip:{
                trigger:'item'
             },
             label: {
                normal: {
                  color: '#b3ccf8',
                  show: true,
                  position: [0, '-22px'],
                  textStyle: {
                    fontSize: 14
                  },
                  formatter: function (a, b) {
                    return a.name
                  }
                }
              },
             barWidth: 12,
             itemStyle: {
                 normal: {
                     color:  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color:'rgba(100,255,249,0.1)'
                      }, {
                        offset: 1,
                        color:'rgba(100,255,249,1)'
                      }], false),
                     barBorderRadius: 6
                 }
             },
             z: 2
         }, {
             name: '白框',
             type: 'bar',
             yAxisIndex: 1,
             tooltip:{
                trigger:'none'
             },
             barGap: '-100%',
             data: [99.8, 99.8, 99.8],
             barWidth: 20,
             itemStyle: {
                 normal: {
                     color: bgc,
                     barBorderRadius: 10,
                 }
             },
             z: 1
         }, {
             name: '外框',
             type: 'bar',
             yAxisIndex: 2,
             tooltip:{
                trigger:'none'
             },
            // barGap: '-100%',
             data: [100, 100, 100],
             barWidth: 21,
             itemStyle: {
                 normal: {
                     color:'#1784a5',
                     barBorderRadius: 11,
                 }
             },
             z: 0
         }
     ]
 };
export default option;
