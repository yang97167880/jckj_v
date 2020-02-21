<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>数据监测</el-breadcrumb-item>
      <el-breadcrumb-item>实时数据</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{ msg }}</h1>
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      msg: "实时数据",
      charts: '',
      opinionData: ["3", "2", "4", "4", "5"]
    }
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['近七日收益']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5"]

        },
        yAxis: {
          type: 'value'
        },

        series: [{
          name: '近七日收益',
          type: 'line',
          stack: '总量',
          data: this.opinionData
        }]
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main')
    })
  }
}
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
</style>