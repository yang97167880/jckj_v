<template>
  <el-container>
    <el-header style="background-color: white;" height="20px">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/top' }">
          <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>数据监测</el-breadcrumb-item>
        <el-breadcrumb-item>实时数据</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <el-container style="padding:15px">
        <el-header style="background-color: white">
          <span style="color: #8492a6;">请选择查询方式：</span>
          <el-select
            v-model="value1"
            clearable
            filterable
            :disabled="flag1"
            placeholder="按库房号查询"
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
          <el-select
            v-model="value2"
            :disabled="flag2"
            clearable
            filterable
            @change="change2(value2)"
            placeholder="按温度传感器查询"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label1"
              :value="item.label1"
            >
              <span style="float: left">{{ item.label1 }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
          <el-select
            v-model="value3"
            clearable
            filterable
            :disabled="flag2"
            @change="change2(value3)"
            style="margin-left: 20px;"
            placeholder="按湿度传感器查询"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label2"
              :value="item.label2"
            >
              <span style="float: left">{{ item.label2 }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="realtimeData"
            >查询</el-button
          >
        </el-header>
        <el-main>
          <center>
            <div id="main" class="mychart" />
          </center>
          <span class="font">传感器列表</span>
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            @click="dialogFormVisible2 = true"
            >添加传感器</el-button
          >
          <div style="float:right">
            <el-tooltip
              class="item"
              effect="dark"
              content="停止模拟程序"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-caret-right"
                circle
                @click="shotdown"
              ></el-button>
            </el-tooltip>
            <el-button type="success" icon="el-icon-s-data" @click="testopen"
              >模拟数据</el-button
            >
          </div>
          <el-table
            :data="
              tableData.filter(
                data =>
                  !search ||
                  data.sensorid.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%"
          >
            <el-table-column label="SensorId" prop="sensorid">
            </el-table-column>
            <el-table-column label="Location" prop="location">
            </el-table-column>
            <el-table-column label="Type" prop="type"> </el-table-column>
            <el-table-column label="Status" prop="status">
              <template slot-scope="scope">
                <el-switch
                  disabled
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope" slot="header">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
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
        </el-main>
        <el-footer height="100px"> </el-footer>
      </el-container>
    </el-main>
    <!-- 编辑栏 -->
    <div style="text-align:left">
      <el-dialog title="传感器信息" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="right">
          <el-form-item label="传感器ID" :label-width="formLabelWidth">
            <el-input
              v-model="form.sensorid"
              autocomplete="off"
              :placeholder="form.sensorid"
            ></el-input>
          </el-form-item>
          <el-form-item label="安装位置" :label-width="formLabelWidth">
            <el-input
              v-model="form.location"
              autocomplete="off"
              :placeholder="form.location"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input
              v-model="form.type"
              autocomplete="off"
              :placeholder="form.type"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="openSave">保 存</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 传感器注册表单 -->
    <div style="text-align:left">
      <el-dialog title="添加传感器" :visible.sync="dialogFormVisible2">
        <el-form :model="form2" label-position="right">
          <el-form-item label="传感器ID" :label-width="formLabelWidth">
            <el-input
              v-model="form2.sensorid"
              autocomplete="off"
              placeholder="输入传感器id"
            ></el-input>
          </el-form-item>
          <el-form-item label="安装位置" :label-width="formLabelWidth">
            <el-input
              v-model="form2.location"
              autocomplete="off"
              placeholder="输入传感器安装位置"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input
              v-model="form2.type"
              autocomplete="off"
              placeholder="输入传感器类型"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>
<script>
import echarts from 'echarts'
export default {
  inject: ['reload'],
  data () {
    return {
      currentPage: 1,
      tableData: [{
        sensorid: '',
        location: '',
        type: '',
        status: true,
      }],
      search: '',
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
      form: {
        index: '',
        sensorid: '',
        location: '',
        type: '',
        status: ''
      },
      form2: {
        sensorid: '',
        location: '',
        type: ''
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      option: {},
      value1: '',
      value2: '',
      value3: '',
      cnt: 0,
      realtime: '',
      flag1: false,
      flag2: false,
      charts: ''
    }
  },
  methods: {
    submit () {
      console.log(this.form2);
      this.$confirm('是否提交表单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.reload();
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });

      });
    },
    openSave () {
      this.$confirm('是否保存此次修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.reload();
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });

      });
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true;
      this.form.index = index;
      this.form.sensorid = row.sensorid;
      this.form.location = row.location;
      this.form.type = row.type;
      this.form.status = row.status;
      console.log(index, row);
    },
    handleDelete (index, row) {
      this.$confirm('确定要删除该传感器?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.reload();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });

      });
      console.log(index, row);
    },
    change (value) {
      if (this.value1 == '') {
        this.value2 = '';
        this.value3 = '';
        this.flag2 = false;
      }
      for (var i in this.options) {
        if (this.options[i].value == value) {
          this.value2 = this.options[i].label1;
          this.value3 = this.options[i].label2;
          this.flag2 = true;
        }
      }
    },
    change2 (value) {
      this.flag1 = true;
      if (this.flag1 && this.value2 == '' && this.value3 == '') {
        this.flag1 = false;
      }
      for (var i in this.options) {
        if ((this.options[i].label1 == value && this.value3 == '') ||
          (this.options[i].label2 == value && this.value2 == '')) {
          this.value2 = this.options[i].label1;
          this.value3 = this.options[i].label2;
        }
      }
    },
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.option = {
        title: {
          text: "温湿度监测"
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
    realtimeData () {
      var option = this.option;
      this.charts.setOption(option, true);
      if (this.value2 != '' && this.value3 != '') {
        option.series[0].name = this.value3;
        option.series[1].name = this.value2;
        option.legend.data[0] = this.value3;
        option.legend.data[1] = this.value2;
      }
      if (this.cnt > 0) {
        clearInterval(this.realtime);
      }
      this.realtime = setInterval(function () {
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        option.series[0].data.shift();
        option.series[0].data.push(Math.round(Math.random() * 100));
        option.series[1].data.shift();
        option.series[1].data.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        echarts.init(document.getElementById('main')).setOption(option);
      }, 2100);
      this.cnt++;
      this.successopen("开始导入数据！");
    },
    shotdown () {
      this.reload();
      this.successopen("模拟程序已终止！")
    },
    successopen (value) {
      this.$notify({
        title: '成功',
        message: value,
        type: 'success'
      });
    },
    testopen () {
      this.$confirm('注意：该程序开启后将会产生虚拟数据进入数据库，请在开启前确认外部硬件以及正常程序是否关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.reload();
        this.$message({
          type: 'success',
          message: '模拟程序已启动!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  created () {
    this.$axios.get('sensor/getSensorList', {
      params: {
        "pageNo": 1,
        "pageSize": 2
      }
    }).then(res => {
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('main')
    });
    window.onresize = () => {
      this.charts.resize();
    }
  }
}
</script>
<style scoped>
.font {
  float: left;
  font-size: 18px;
  font-weight: bold;
}
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
.mychart {
  padding-top: 20px;
  width: 100%;
  height: 400px;
}
</style>