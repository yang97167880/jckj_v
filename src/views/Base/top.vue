<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="bk">
      <img src="../../assets/img/f1.jpg" alt="" />
      <span style="position: absolute; top: 0; left: 40%;"
        ><font size="7" class="threed">欢迎使用基坑监测系统</font></span
      >
    </div>
  </div>
</template>
<style scoped>
.threed {
  color: #e0e0e0;
  letter-spacing: 0;
  text-align: left;

  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
    0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
    0px 8px 7px #001135;
}
.bk {
  position: relative;
  width: 100%;
  height: 100%;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
</style>