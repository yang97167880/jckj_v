<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container" style="border:0px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :render-header="renderHeader">
          <el-table-column label="管理员列表">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="name" label="登录名"></el-table-column>
            <el-table-column prop="charactor" label="角色"></el-table-column>
            <el-table-column prop="time" label="加入时间"></el-table-column>
            <el-table-column prop="judgement" label="是否已启用">
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
      msg: "管理员列表",
      tableData: [
        {
          ID: '1',
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",

        },
        {
          ID: '1',
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",

        },
        {
          ID: '1',
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",

        },
        {
          ID: '1',
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",

        }
      ],
      renderHeader () {
        return (
          <div >
            <el-button type="primary" icon="el-icon-circle-plus" >添加管理员</el-button>
          </div>
        );
      }
    };
  },
  methods: {
    handleAdd (index, row) {
      //  this.$alert('这是一段内容', '标题名称', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message({
      //         type: 'info',
      //         message: `action: ${ action }`
      //       });
      //     }
      //   });
    },
    handleStop (index, row) {
      this.$confirm("确定要停用吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {

          this.$message({
            type: "success",
            message: "停用成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消停用"
          });
        });

      console.log(index, row);
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      console.log(index, row);
    },
    judegment (index, row) {
      console.log(index, row);
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
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