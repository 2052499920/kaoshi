/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts';
import axios from 'axios';

const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        axios.get("/getDataChart").then(res => {
                            this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            color: ['#3398DB'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['已提交', '已反馈套餐', '已反馈提车地', '成功订单', '退款订单'],
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '数据',
                                    type: 'bar',
                                    barWidth: '60%',
                                    data: [res.data.state_0_Num, res.data.state_1_Num, res.data.state_2_Num, res.data.state_3_Num, res.data.state_4_Num]
                                }
                            ]
                        };

                        this.chart.setOption(optionData);
                          });
                    },
                    //画一条简单的线
                    line2: function (id) {
                        axios.get('/getDataChart').then(res => {
                            console.log(res.data)
                            this.chart = echarts.init(document.getElementById(id));
                            this.chart.clear();

                            const optionData = {
                                backgroundColor: '',
                            
                                title: {
                                    text: '',
                                    left: 'center',
                                    top: 20,
                                    textStyle: {
                                        color: '#444'
                                    }
                                },
                            
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                            
                                visualMap: {
                                    show: false,
                                    min: 0,
                                    max: 100,
                                    inRange: {
                                        colorLightness: [0, 1]
                                    }
                                },
                                series : [
                                    {
                                        
                                        type:'pie',
                                        radius : '55%',
                                        center: ['50%', '50%'],
                                        data:[
                                            {value:parseInt(res.data.state_0_Num), name:'已提交'},
                                            {value:parseInt(res.data.state_1_Num), name:'已反馈套餐'},
                                            {value:parseInt(res.data.state_2_Num), name:'已反馈提车地'},
                                            {value:parseInt(res.data.state_3_Num), name:'成功订单'},
                                            {value:parseInt(res.data.state_4_Num), name:'退款订单'}
                                        ].sort(function (a, b) { return a.value - b.value; }),
                                        roseType: 'radius',
                                        label: {
                                            normal: {
                                                textStyle: {
                                                    color: '#333'
                                                }
                                            }
                                        },
                                        labelLine: {
                                            normal: {
                                                lineStyle: {
                                                    color: '#333'
                                                },
                                                smooth: 0.2,
                                                length: 10,
                                                length2: 20
                                            }
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '',
                                                shadowBlur: 200,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        },
                            
                                        animationType: 'scale',
                                        animationEasing: 'elasticOut',
                                        animationDelay: function (idx) {
                                            return Math.random() * 200;
                                        }
                                    }
                                ]
                            };

                            this.chart.setOption(optionData);
                        })
                    },
                }
            }
        }
    })
}

export default {
    install
}
