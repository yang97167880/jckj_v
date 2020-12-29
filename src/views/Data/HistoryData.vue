<template>
  <div>
    <el-container>
      <el-header style="background-color: white;" height="20px">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
          <el-breadcrumb-item :to="{ path: '/top' }">
            <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>数据监测</el-breadcrumb-item>
          <el-breadcrumb-item>历史数据</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-container style="padding:15px">
          <el-header style="background-color: white" height="100px">
            <span style="color: #8492a6;">请选择库房号：</span>
            <el-select
              v-model="value"
              filterable
              clearable
              placeholder="输入库房号"
              @change="change(value1)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="block" style="float:left">
              <span style="color: #8492a6;">请设置日期范围：</span>
              <el-date-picker
                v-model="datevalue"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
              >
              </el-date-picker>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="historyData"
              >查询</el-button
            >
          </el-header>
          <el-main>
            <el-tabs tab-position="left" style="height: 650px;width:100%">
              <el-tab-pane lazy label="图表模式">
                <div id="main2" class="mychart"></div>
              </el-tab-pane>
              <el-tab-pane label="表格模式">
                <el-table
                  :data="
                    tableData.filter(
                      data =>
                        !search ||
                        data.sensorid
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                  "
                  style="width: 100%"
                >
                  <el-table-column label="SensorId" prop="sensorid">
                  </el-table-column>
                  <el-table-column label="UpdateTime" prop="updatetime">
                  </el-table-column>
                  <el-table-column
                    label="WaveLengthValue"
                    prop="wavelengthvalue"
                  >
                  </el-table-column>
                  <el-table-column label="PhysicalValue" prop="physicalvalue">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot-scope="scope" slot="header">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"
                      />
                    </template>
                  </el-table-column>
                </el-table>
                <br />
                <div class="block">
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                  >
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-main>
          <el-footer height="100px"> </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      currentPage: 1,
      tableData: [{
        sensorid: 'T101',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'R101',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'T102',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'R102',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'T103',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'R103',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'T104',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 41,
      }, {
        sensorid: 'R104',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 47,
      }, {
        sensorid: 'T105',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 45,
      }, {
        sensorid: 'R105',
        updatetime: '2020-07-19 18:23:19',
        wavelengthvalue: '2000',
        physicalvalue: 43,
      }],
      search: '',
      value: '',
      datevalue: '',
      charts: '',
      options: [{
        value: '库房101',
        label1: 'T101',
        label2: 'R101'
      }, {
        value: '库房102',
        label1: 'T102',
        label2: 'R102'
      }, {
        value: '库房103',
        label1: 'T103',
        label2: 'R103'
      }, {
        value: '库房104',
        label1: 'T104',
        label2: 'R104'
      }, {
        value: '库房105',
        label1: 'T105',
        label2: 'R105'
      }],
    }
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.option = {
        title: {
          text: "历史数据图表"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['湿度', '温度']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: (function () {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '温度 °c',
            max: 40,
            min: -10,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            name: '湿度 %',
            max: 100,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '湿度',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 100));
              }
              return res;
            })()
          },
          {
            name: '温度',
            type: 'line',
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })()
          }
        ]
      }
      this.charts.setOption(this.option);
    },
    historyData () {

    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main2')
    })
    window.onresize = () => {
      this.charts.resize();
    }
  }
}
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
.mychart {
  padding-top: 20px;
  width: 100%;
  height: 600px;
}
</style>