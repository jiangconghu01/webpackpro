const option = {
    color: ["#2b80b9", "#169d96", "#ef6b56", "#905352"],
    grid: {
        left: -10,
        top: 10,
        bottom: 10,
        right: 10,
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    polar: {},
    angleAxis: {
        interval: 1,
        type: 'category',
        data: [],
        z: 10,
        axisLine: {
            show: false,
            lineStyle: {
                color: "#0B4A6B",
                width: 1,
                type: "solid"
            },
        },
        axisLabel: {
            interval: 0,
            show: true,
            color: "#0B4A6B",
            margin: 8,
            fontSize: 16
        },
    },
    radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
            show: false,
            lineStyle: {
                color: "#0B3E5E",
                width: 1,
                type: "solid"
            },
        },
        axisLabel: {
            formatter: '{value} %',
            show: false,
            padding: [0, 0, 20, 0],
            color: "#0B3E5E",
            fontSize: 16
        },
        splitLine: {
            show:false,
            lineStyle: {
                color: "#0B3E5E",
                width: 2,
                type: "solid"
            }
        },
        axisTick:{
            show:false
        }
    },
    calculable: true,
    series: [{
        type: 'pie',
        radius: ["90%", "95%"],
        hoverAnimation: false,
        labelLine: {
            normal: {
                show: false,
                length: 30,
                length2: 55
            },
            emphasis: {
                show: false
            }
        },
        name: "",
        data: [{
            name: '',
            value: 0,
            itemStyle: {
                normal: {
                    //color: "rgba(43,128,185,0.9)"
                    color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color:'rgba(43,128,185,0.1)'
                      }, {
                        offset: 1,
                        color:'rgba(43,128,185,0.9)'
                      }], false),
                }
            }
        }]
    },{
        stack: 'a',
        type: 'pie',
        radius: ['20%', '80%'],
        roseType: 'area',
        zlevel:10,
        label: {
            normal: {
                show: true,
                formatter: "{b} : {c}",
                textStyle: {
                    fontSize: 12,
                },
                position: 'outside'
            },
            emphasis: {
                show: true
            }
        },
        labelLine: {
            normal: {
                show: true,
                length: 20,
                length2: 20
            },
            emphasis: {
                show: false
            }
        },
        data: [{
                value: 10,
                name: 'IDS'
            },
            {
                value: 9,
                name: 'VPN'
            },
            {
                value: 20,
                name: '交换机'
            }
        ]
    }, ]
}
export default option