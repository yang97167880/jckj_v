<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>基础管理</el-breadcrumb-item>
      <el-breadcrumb-item>基坑沉降简介</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="con">
      <h3>基坑沉降简介</h3>
      <p>
        数据处理端通过分析采集端传输过来的波长数据，将波长数据转化为水位变化量，再利用公
      </p>
      <p>
        式，将水位变化量转换为土体位移沉降量，并且实时采集数据、处理数据，以此做出随时间
      </p>
      <p>
        变化的沉降位移图，若位移量超过一定数值，将自动报警。最后，所有的信息将从数据处理
      </p>
      <p>
        端通过云传输到用户端上，用户就可以实时看到传感器采集的数据，以此得知现场土体位移
      </p>
      <p>的变化情况，以此来判断是否需要对土体进行加固。</p>

      <div class="pic1"><img src="../../assets/img/theory.jpg" /></div>
      <div class="cent">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基坑沉降原理简介
        </p>
        <p>
          沉降观测即根据建筑物设置的观测点与固定（永久性水准点）的测点进行观测，
        </p>
        <p>
          测其沉降程度用数据表达，凡一层以上建筑、构筑物设计要求设置观测点，
        </p>
        <p>
          人工、土地基（砂基础）等，
          均应设置沉陷观测，施工中应按期或按层进度进行观测和记录直至竣工。
        </p>
      </div>

      <div class="pic1"><img src="../../assets/img/t2.jpg" /></div>
      <div class="cent1">
        <p></p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;静力水准仪的安装
        </p>
      </div>

      <div class="pic1"><img src="../../assets/img/t3.jpg" /></div>
      <div class="cent1">
        <p></p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;静力水准仪内部详图
        </p>
        <p>
          数据采集端主要以静力水准仪的数据来判定土体位移的沉降量，我们采用的静力水准仪全称
        </p>
        <p>
          为光纤光栅静力水准仪，其原理是将土体位移对水准仪外部的沉降转换为水准仪内部水位的
        </p>
        <p>
          变化量，再由水位的变化转换为光纤的波长，服务器通过波长的变化得知水准仪水位变化，
        </p>
        <p>
          以此得知土体位移沉降的变化量。在后期我们将计划采用RTK
          基站测出某一静力水准仪的
        </p>
        <p>
          高程，以此算出多台静力水准仪的高程，用高程的变化量来进行土体位移沉降的预警。在目
        </p>
        <p>
          前阶段，我们仅将某一台静力水准仪作为基准点，赋予其一高程。最后，将静力水准仪输出
        </p>
        <p>
          的波长通过解调仪将数据发送至服务器即数据处理端。
        </p>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: 'msg'
    }
  },
  methods: {
  }
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.con {
  width: 1000px;
  margin: 0 5%;
  border: 1px solid #ccc;
  padding: 10px 0;
}
.con:after {
  clear: both;
  display: block;
  width: 0;
  height: 0;
  content: "";
}
.pic {
  width: 400px;
  height: 400px;
  float: left;
  border: 1px solid #ccc;
}
.pic img {
  width: 100%;
  height: 100%;
}
.cent {
  float: left;
  width: 700px;
  margin-left: 6px;
}
.pic1 {
  width: 500px;
  height: 400px;
  float: left;
  border: 1px solid #ccc;
}
.pic1 img {
  width: 100%;
  height: 100%;
}
.cent1 {
  float: left;
  width: 800px;
  margin-left: 6px;
}
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
</style>