const option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: 'middle',
        left: '3%',
        right: '4%',
        bottom: '3%',
        height: '80%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [100,200,20,30,60,89],
        axisLine: {
            lineStyle: {
                color: "#FFF"
            }
        }
    },
    yAxis: {
        type: 'value',

        splitLine: {
            lineStyle: {
                color: 'rgba(15,34,71,0.9)'
            }
        },
        axisTick:{
            show:false
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: "#FFF"
            },
        },
        nameTextStyle: {
            color: "#FFF"
        },
        splitArea: {
            show: false
        }
    },
    series: [{
            name: '新报',
            type: 'line',
            data: [800,900,220,130,660,289],
            color: "#F58080",
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',

                        colorStops: [{
                            offset: 0,
                            color: '#FFCAD4' // 0% 处的颜色
                        }, {
                            offset: 0.4,
                            color: '#F58080' // 100% 处的颜色
                        }, {
                            offset: 1,
                            color: '#F58080' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(245,128,128, 0.5)',
                    shadowBlur: 5,
                    shadowOffsetY: 7
                }
            },
            itemStyle: {
                normal: {
                    color: '#F58080',
                    borderWidth: 3,
                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                    borderColor: "#F58080"
                }
            },
            smooth: true
        },
        {
            name: '流失',
            type: 'line',
            data: [123,568,111,222,123,56],
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',

                        colorStops: [{
                                offset: 0,
                                color: '#AAF487' // 0% 处的颜色
                            },
                            {
                                offset: 0.4,
                                color: '#47D8BE' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#47D8BE' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(71,216,190, 0.5)',
                    shadowBlur: 5,
                    shadowOffsetY: 7
                }
            },
            itemStyle: {
                normal: {
                    color: '#AAF487',
                    borderWidth: 3,
                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                    borderColor: "#AAF487"
                }
            },
            smooth: true
        },
        {
            name: '续费',
            type: 'line',
            data: [125,568,25,36,784,56],
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',

                        colorStops: [{
                                offset: 0,
                                color: '#F6D06F' // 0% 处的颜色
                            },
                            {
                                offset: 0.4,
                                color: '#F9A589' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F9A589' // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(249,165,137, 0.5)',
                    shadowBlur: 5,
                    shadowOffsetY: 7
                }
            },
            itemStyle: {
                normal: {
                    color: '#F6D06F',
                    borderWidth: 3,
                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                    borderColor: "#F6D06F"
                }
            },
            smooth: true
        }
    ]
};
export default option;