<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container" style="text-align: center;border:0px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        height="tableHeight"
        style="width: 100%;
          margin: auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :render-header="renderHeader">
          <el-table-column label="角色管理">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="jurisdiction" label="权限"></el-table-column>
            <el-table-column
              prop="description"
              label="权限描述"
            ></el-table-column>
            <el-table-column prop="judgement" label="状态">
              <template>
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="judegment(scope.$index, scope.row)"
                  >已启用</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  plain
                  @click="handleStop(scope.$index, scope.row)"
                  >停用</el-button
                >
                <el-button
                  plain
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: "用户列表",
      tableData: [
        {
          ID: "1",
          name: "admin",
          jurisdiction: "超级管理员",
          description: "2020.2.21",

        },
        {
          ID: "1",
          name: "admin",
          jurisdiction: "超级管理员",
          description: "2020.2.21",

        },

      ],
      renderHeader () {
        return (
          <div>
            <el-button type="primary" icon="el-icon-circle-plus">添加管理员</el-button>
          </div>
        );
      },
      //       tableHigth(){
      // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;    
      // //window.innerHeight:浏览器的可用高度    
      // //this.$refs.table.$el.offsetTop：表格距离浏览器的高度    
      // //后面的50：根据需求空出的高度，自行调整
      //       }
    };
  },
  methods: {
    handleStop (index, row) {
      console.log(index, row);
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    judegment (index, row) {
      console.log(index, row);
    }


  }

};
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 5px;
}
</style>