<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页
      </el-breadcrumb-item>
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
            <el-table-column prop="description" label="权限描述"></el-table-column>
            <el-table-column prop="judgement" label="状态">
              <template>
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="judegment(scope.$index, scope.row)"
                >已启用</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="250">
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
    <!--对话框 Form 
    角色名称charactor_name
    角色标识(英文，唯一)charactor_psd
    权限描述description
    选择权限charactor_right
    -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :label-position="top">
        <el-form-item label="角色名称" >
          <el-input v-model="form.charactor_name" autocomplete="off" placeholder="请填写角色名称"></el-input>
        </el-form-item>
        <el-form-item label="(英文，唯一)角色标识"  >
          <el-input v-model="form.charactor_psd" autocomplete="off" placeholder="请填写角色标识"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" >
          <el-input v-model="form.description" autocomplete="off" placeholder="请填写权限描述"></el-input>
        </el-form-item>
        <el-form-item label="选择权限" >
          <el-select v-model="form.charactor_right" placeholder="请选择角色权限">
            <el-option label="超级管理员" value="SuperAdministrator"></el-option>
            <el-option label="管理员" value="Administrator"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "用户列表",
      tableData: [
        {
          ID: "1",
          name: "admin",
          jurisdiction: "超级管理员",
          description: "2020.2.21"
        },
        {
          ID: "1",
          name: "admin",
          jurisdiction: "超级管理员",
          description: "2020.2.21"
        }
      ],
           dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    
    };
  },
  methods: {
    
      renderHeader() {
        return (
          <div>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              on-click={() => (this.dialogFormVisible = true)}
            >
              添加角色
            </el-button>
          </div>
        );
      },
    handleStop(index, row) {
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
    handleEdit(index, row) {
      console.log(index, row);
    },
   handleDelete(index, row) {
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
    judegment(index, row) {
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