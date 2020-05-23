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
        style="width: 100%;
          margin: auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :render-header="renderHeader">
          <el-table-column label="角色管理">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="roleId" label="ID"></el-table-column>
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="detail" label="权限"></el-table-column>
            <el-table-column prop="title" label="权限描述"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <!-- {{scope.row}} 查看所有标头和数值-->
                <el-button
                  size="mini"
                  type="success"
                  round
                  v-if="scope.row.status=='1'"
                  @click="judegment(scope.$index, scope.row)"
                >已启用</el-button>
                <el-button
                  size="mini"
                  type="info"
                  round
                  v-if="scope.row.status=='0'"
                  @click="judegment(scope.$index, scope.row)"
                >已禁用</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="250">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  plain
                  v-if="scope.row.status=='1'"
                  @click="handleStop(scope.$index, scope.row)"
                >停用</el-button>
                <el-button
                  size="mini"
                  type="success"
                  plain
                  v-if="scope.row.status=='0'"
                  @click="handleStart(scope.$index, scope.row)"
                >启用</el-button>

                <el-button plain size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
    <!--添加对话框 Form 
    角色名称charactor_name
    角色标识(英文，唯一)charactor_psd
    权限描述description
    选择权限charactor_right
    -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisible"
      @close="closeDilog('ruleForm')"
      :append-to-body="true"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" label-width="formLabelWidth" prop="charactorName">
          <el-input v-model="ruleForm.charactorName" autocomplete="off" placeholder="请填写角色名称"></el-input>
        </el-form-item>
        <el-form-item label="(英文，唯一)角色标识" label-width="formLabelWidth" prop="charactorPsd">
          <el-input v-model="ruleForm.charactorPsd" autocomplete="off" placeholder="请填写角色标识"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" label-width="formLabelWidth" prop="description">
          <el-input v-model="ruleForm.description" autocomplete="off" placeholder="请填写权限描述"></el-input>
        </el-form-item>
        <el-form-item label="选择权限" label-width="formLabelWidth" prop="charactorRight">
          <el-select v-model="ruleForm.charactorRight" placeholder="请选择角色权限">
            <el-option label="超级管理员" value="SuperAdministrator"></el-option>
            <el-option label="管理员" value="Administrator"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色信息对话框 -->
    <el-dialog title="编辑角色信息" 
      :visible.sync="EditDialogVisible"
      width="50%"
      @close="closeDilog('editFormRef')" >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID">
          <el-input v-model="editForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="detail">
          <el-input v-model="editForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditAdminInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkCharactorName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("角色名不能为空"));
      } else {
        callback();
      }
    };
    var checkCharactorPsd = (rule, value, callback) => {
      var pwdReg = /^\w{1,16}$/;
      // //验证是否全英文;
      if (!value) {
        return callback(new Error("标识不能为空"));
      } else {
        if (!pwdReg.test(value)) {
          return callback(new Error("全英文1-16位"));
        } else {
          callback();
        }
      }
    };
    var checkDescription = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("描述不能为空"));
      } else {
        callback();
      }
    };
    var checkCharactorRight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("选择权限不能为空"));
      } else {
        callback();
      }
    };
    return {
      msg: "用户列表",
      // 编辑角色信息展示
      EditDialogVisible: false,
      //角色列表
      tableData: [
        // {
        // ID: "1",
        // name: "超级管理员",
        // jurisdiction: "superadimin",
        // description: "rule_all"
        // },
      ],
      pageCount: 0,
      pageRows: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        charactorName: "",
        charactorPsd: "",
        description: "",
        charactorRight: ""
      },

      // 表单规则
      rules: {
        charactorName: [{ validator: checkCharactorName, trigger: "blur" }],
        charactorPsd: [{ validator: checkCharactorPsd, trigger: "blur" }],
        description: [{ validator: checkDescription, trigger: "blur" }],
        charactorRight: [{ validator: checkCharactorRight, trigger: "blur" }]
      },
      // 查询角色信息
      editForm: {},
      //编辑角色信息
      editFormRules: {
        name: [
          {
            require: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            validator: checkCharactorName,
            trigger: "blur"
          }
        ],
        detail: [
          {
            require: true,
            message: "请输入权限",
            trigger: "blur"
          },
          {
            validator: checkCharactorRight,
            trigger: "blur"
          }
        ],
        title: [
          {
            require: true,
            message: "请输入权限描述",
            trigger: "blur"
          },
          {
            validator: checkDescription,
            trigger: "blur"
          }
        ]
      }
    };
  },

  // 周期函数
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      // 获取用户列表请求
      const { data: res } = await this.$axios.get("/admin/getRoleList", {
        params: {
          pageNo: 1,
          pageSize: 5
        }
      });
      if (res.status !== "success") {
        this.$alert("网络请求问题，联系管理员修复", "管理员的提示", {
          confirmButtonText: "确定"
        });
      } else {
        // this.$message.success("角色信息获取成功");//测试管理员页面自动获取时可使用
        //  console.log(res.data);//测试管理员页面自动获取时可使用
        (this.tableData = res.data.list),
          (this.pageCount = res.data.pageCount),
          (this.pageRows = res.data.pageRows);
      }
    },
     //添加角色，修改管理员关闭窗口
    closeDilog: function(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields(); //将form表单重置
      
    },

    //添加角色——确认表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          console.log(this.ruleForm);
          this.dialogFormVisible = false; //关闭窗口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 点击取消 数据重置

      this.$refs[formName].resetFields();
    },
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
    // 启用窗口
    async handleStart(index, row) {
      this.$confirm("确定要启用吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          const { data: res } = await this.$axios.get(
            "/admin/banRole?rid=" + row.roleId + "&status=1"
          );

          this.$message({
            type: "success",
            message: "启用成功!"
          });
          this.getRoleList(); //刷新一次用户列表界面
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消启用"
          });
        });
    },
    // 停用窗口
    async handleStop(index, row) {
      this.$confirm("确定要停用吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          const { data: res } = await this.$axios.get(
            "/admin/banRole?rid=" + row.roleId + "&status=0"
          );

          this.$message({
            type: "success",
            message: "停用成功!"
          });
          this.getRoleList(); //刷新一次用户列表界面
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消停用"
          });
        });

      // console.log(index, row);//输出index第几行 和row信息
    },
    // 编辑角色窗口
    handleEdit(row) {
      //console.log(row.roleId);
      this.editForm = row;
      this.EditDialogVisible = true;
    },
    //修改管理员信息并提交
    EditAdminInfo() {
      this.$refs.editFormRef.validate(valid => {
        //判断与校验是否通过
        // console.log(valid)//判断与校验是否通过
        if (!valid) return; //发起修改用户信息的数据请求
        this.$message.success("更新角色成功！");
        let params = new URLSearchParams();
         params.append("rid", this.editForm.roleId);
        params.append("name", this.editForm.name);
        params.append("detail", this.editForm.detail);
        params.append("title", this.editForm.title);
        // for (var value of params.keys()) {
        //   console.log(value); //遍历所有key  俩者是对应的
        // }
        // for (var value of params.values()) {
        //   console.log(value); //遍历所有的值
        // }

        this.$axios({
          method: "post",
          url: "/admin/updateRole",
          data: params
        })
          .then(response => {
            // console.log(response);
            // console.log(response.data);//测试用接口
            this.postData = response.data; 
            //关掉对话框
            this.EditDialogVisible = false; 
            //刷新数据
            this.getRoleList(); 
             //提示修改成功
            this.$message.success("更新角色成功！");
            
          })
          .catch(error => {
            // console.log(error);
            this.$message.error("更新角色信息失败！");
             //刷新数据
            this.getRoleList();

          });
      });
    },
    // 删除窗口
    handleDelete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$axios.get(
            "/admin/roleDelete?role_id=" + row.roleId
          );
          console.log(res);
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getRoleList(); //刷新一次用户列表界面
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // console.log(index, row);//测试使用
    },

    //判断按钮状态绑定
    judegment(index, row) {
      // console.log(index, row);//测试使用
    },
    handleSelectionChange(val) {
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