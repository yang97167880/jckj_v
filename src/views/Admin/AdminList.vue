<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{ msg }}</h1>
    <template>
      <div style="text-align: center;">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          style="width: 95%;
          margin: auto"
          @selection-change="handleSelectionChange"
        >
          <el-table-column :render-header="renderHeader">
          <el-table-column  label="管理员列表">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="name" label="登录名"></el-table-column>
            <el-table-column prop="charactor" label="角色"></el-table-column>
            <el-table-column prop="time" label="加入时间"></el-table-column>
            <el-table-column prop="judgement" label="是否已启用">
              <template>
                <el-button
                   size="mini"
                   type="success" round
                 @click="judegment(scope.$index, scope.row)"
                >启用</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  plain
                  @click="handleStop(scope.$index, scope.row)"
                >停用</el-button>
                <el-button plain size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>

  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "管理员列表",
      tableData: [
        {
          ID: "1",
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",
         
        },
        {
          ID: "1",
          name: "admin",
          charactor: "超级管理员",
          time: "2020.2.21",
         
        },
      
      ],
      renderHeader() {
        return (
          <div>
            <el-button type="primary" icon="el-icon-circle-plus">添加管理员</el-button>
          </div>
        );
      }
    };
  },
  methods: {
    handleStop(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    judegment(index, row){
       console.log(index, row);
    }
  }
};
</script>
<style scoped>
.bread {
  background-color: #e9eef3;
  padding: 10px;
}
</style>