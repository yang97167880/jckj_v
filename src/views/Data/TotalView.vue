<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>数据监测</el-breadcrumb-item>
      <el-breadcrumb-item>总试图</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{ msg }}</h1>
    <div class="ny">
    <div class="wz">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统分为数据采集端、数据处理端以及用户端，整体的框架图如下图所示。</p>
        <img src="../../assets/img/zst.jpg" >
    </div>
    <div >
      <p>为适应现代化工程监测的需要，国内外的基坑工程发展方向逐渐想智能化监测的方向发展，可以降低对人工采集监测数据的依赖程度，表现出自动化、远程监测、自动预警等特点。</p>
    </div>

</div>
  </div>

</template>


<script>
export default {
  data () {
    return {
      msg: '总试图'
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
.ny{width: 800px;margin: 50px auto ;border: solid 1px gray;}
.wz{width: 100%;float: left}
.wz img{
    display: block;
    width: 100%;
            }
</style>