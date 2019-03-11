<template>
    <div class="sales-statistics">
       <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>

            <!-- 面板内容 -->
            <div class="text item">
                <!-- 1 准备一个具备宽高的dom容器 -->
                <div style="height: 400px;" id="box"></div>
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入moment
import moment from 'moment'

export default {
    data () {
        return {
        }
    },
    methods: {
    },
    // 生命周期钩子函数 dom已经生成 适合操作dom
    mounted () {
        // 选中dom 使用echart初始化
        const myChart = this.echarts.init(document.getElementById('box'))

        // 发送ajax获取后端数据
        this.req.get('/account/salesdata')
            .then(res => {
                console.log(res)
                // 定义数据对象
                const sales = {
                    ctimeArr: [],
                    values: []
                };

                // 循环数组
                res.forEach(item => {
                    // 循环后端数据 把时间和值获取出来放入对象
                    sales.ctimeArr.push( moment(item.ctime).format("MM/DD") )
                    sales.values.push(item.values)
                })

                // 写报表配置
                const option = {
                    tooltip: { // 提示
                        show: true
                    },
                    legend: { // 图例
                        data:['销量']
                    },
                    xAxis : [ // x轴配置
                        {
                            type : 'category',
                            data : sales.ctimeArr // x轴
                        }
                    ],
                    yAxis : [ // y轴
                        {
                            type : 'value'
                        }
                    ],
                    series : [ // 核心配置
                        {
                            "name":"销量",
                            "type":"line",
                            "data":sales.values // y轴数据
                        }
                    ]
                }

                // 使用数据生成报表
                myChart.setOption(option)
            })
            .catch(err => {
                console.log(err)
            })

    }
}
</script>
<style lang="less">
   .sales-statistics {
    .el-card {
        .el-card__header {
            font-size: 18px;
            font-weight: 700;
            background-color: #f1f1f1;
        }
    }
    }
</style>


