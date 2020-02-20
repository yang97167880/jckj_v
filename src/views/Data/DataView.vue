<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>数据监测</el-breadcrumb-item>
      <el-breadcrumb-item>监测配置</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '监测配置'
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 10px;
}
</style>