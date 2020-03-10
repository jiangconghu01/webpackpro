const  option = {
    title: {
        text: '75',
        textStyle: {
            color: '#01c4a3',
            fontSize: 20
        },
        subtext: '总数:100',
        subtextStyle: {
            color: '#FFF',
        },
        itemGap: -5, // 主副标题距离
        left: 'center',
        top: 'center'
    },
    tooltip:{
        show:true
    },
    angleAxis: {
        id: 1,
        max: 110, // 满分
        clockwise: false, // 逆时针
        // 隐藏刻度线

        startAngle: -20,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    radiusAxis: {
        type: 'category',
        // 隐藏刻度线
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    polar: {
        center: ['50%', '50%'],
        radius: '130%' //图形大小
    },
    series: [{
        type: 'bar',
        data: [{
            name: '在线',
            value: 75,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(255,255,255,0)'
                    }, {
                        offset: 1,
                        color: '#1a8eb1'
                    }])
                }
            },
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 10,
        barGap: '100%', // 两环重叠
        z: 2,
    }, { // 灰色环
        type: 'bar',
        
        data: [{
            value: 100,
            name:'离线',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(255,255,255,0)'
                    }, {
                        offset: 1,
                        color: '#1a8eb1'
                    }])
                },
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 5,
                shadowOffsetY: 2
            }
        }],
        rotate: 30,
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 10,
        z: 1
    }]
};
export default option;