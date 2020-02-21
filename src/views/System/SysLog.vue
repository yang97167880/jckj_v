<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统日志</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container" style="border:0px">
      <el-row type="flex" justify="center" style="min-width:950px">
        <el-col :span="12">
          <span>选择日期范围：</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="7">
          <el-input
            clearable
            placeholder="请输入内容"
            v-model="input"
            class="inline-input"
          >
            <el-button slot="append" icon="el-icon-search">搜日志</el-button>
          </el-input>
        </el-col>
        <el-col :span="5"> </el-col>
      </el-row>
      <br />
      <el-input
        type="textarea"
        show-word-limit
        rows="12"
        placeholder="27日，温湿度正常，需要注意下午下雨"
        v-model="textarea"
      >
      </el-input>
      <br />
      <br />
      <el-button type="success" round>提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '系统日志',
      input: '',
      textarea: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]      },
      value: ''
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
</style>