<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/top' }">
        <i class="el-icon-s-home"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- +添加管理员 -->
      <el-table
        ref="multipleTable"
        :data="userlist"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 管理员列表界面 -->
        <el-table-column :render-header="renderHeader">
          <el-table-column label="管理员列表">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="uid" label="ID"></el-table-column>
            <el-table-column prop="username" label="登录名"></el-table-column>
            <el-table-column prop="title" label="角色"></el-table-column>
            <el-table-column prop="createdAt" label="加入时间"></el-table-column>
            <el-table-column prop="tel" label="手机号"></el-table-column>
            <el-table-column prop="status" label="是否已启用">
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
                  @click="handleStart(scope.$index,scope.row)"
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
      <!-- 分页区页面 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNo"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!--添加管理员对话框 Form
    用户名form.name
    密码form.psd
    重复密码form.re_psd
    选择权限form.charactor_right
    超级管理员 SuperAdministrator
    管理员 Administrator
    -->
    <el-dialog
      title="注册信息填写"
      :visible.sync="dialogFormVisible"
      @close="closeDilog('ruleForm')"
      :append-to-body="true"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off" placeholder="请填写用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="psd">
          <el-input v-model="ruleForm.psd" autocomplete="off" placeholder="请填写密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" :label-width="formLabelWidth" prop="repsd">
          <el-input v-model="ruleForm.repsd" autocomplete="off" placeholder="重复密码"></el-input>
        </el-form-item>
        <el-form-item label="选择权限" :label-width="formLabelWidth" prop="charactorRight">
          <el-select v-model="ruleForm.charactorRight" placeholder="请选择角色权限">
            <el-option label="超级管理员" value="SuperAdministrator"></el-option>
            <el-option label="管理员" value="Administrator"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改管理员信息对话框 -->
    <el-dialog
      title="编辑管理员信息"
      :visible.sync="EditDialogVisible"
      width="50%"
      @close="closeDilog('editFormRef')"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID">
          <el-input v-model="editForm.uid" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="EditAdminInfo( editForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  // uid: '',
  inject: ["reload"],
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      } else {
        const regTel = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!regTel.test(value)) {
          return callback(new Error("请输入合法手机号"));
        } else {
          callback();
        }
      }
    };
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkPsd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.repsd !== "") {
          this.$refs.ruleForm.validateField("repsd");
        }
        callback();
      }
    };
    var checkRepsd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.psd) {
        callback(new Error("两次输入密码不一致!"));
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
      msg: "管理员列表",
      // uid: " ",
      //管理员列表信息参数
      queryInfo: {
        query: "",
        //当前的页数
        pageNo: 1,
        //每页显示多少数据
        pageSize: 10
      },
      //管理员列表
      userlist: [],
      //列表条数总数
      total: 0,

      // 编辑角色信息展示
      EditDialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 表单验证宽度
      formLabelWidth: "100",
      // 添加管理员表单验证
      ruleForm: {
        account: "",
        psd: "",
        repsd: "",
        charactorRight: ""
      },
      // 查询管理员信息
      editForm: {
        uid: "",
        username: "",
        title: "",
        tel: ""
      },
      editForm_Post: {
        tel: "",
        uid: "",
        username: ""
      },
      //管理员信息规则
      editFormRules: {
        username: [
          {
            require: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            validator: checkAccount,
            trigger: "blur"
          }
        ],
        tel: [
          {
            require: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: checkTel,
            trigger: "blur"
          }
        ],
        title: [
          {
            require: true,
            message: "请输入角色",
            trigger: "blur"
          },
          {
            validator: checkCharactorRight,
            trigger: "blur"
          }
        ]
      },
      //  表单预验证规则
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        psd: [{ validator: checkPsd, trigger: "blur" }],
        repsd: [{ validator: checkRepsd, trigger: "blur" }],
        charactorRight: [{ validator: checkCharactorRight, trigger: "blur" }]
      }
    };
  },

  // 周期函数
  created() {
    this.getUserList();
  },

  methods: {
    // 获取用户列表请求
    async getUserList() {
      const { data: res } = await this.$axios.get("/admin/getUserList", {
        params: this.queryInfo
      });
      if (res.status !== "success") {
        //this.$message.success("管理员信息获取成功");//测试管理员页面自动获取时可使用
        this.$alert("网络请求问题，联系管理员修复", "管理员的提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$message.success("管理员信息获取成功");
        this.userlist = res.data.list;
        // console.log(res.data)//查看用户数据
        this.total = res.data.pageRows;
      }
    },
    //添加管理员，修改管理员的关闭窗口
    closeDilog: function(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields(); //将form表单重置
    },
    //添加管理员确认窗口
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
    //抬头“添加管理员”
    renderHeader() {
      return (
        <div>
          <el-button
            type="primary"
            icon="el-icon-circle-plus"
            on-click={() => (this.dialogFormVisible = true)}
          >
            添加管理员
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
            "/admin/banAdmin?uid=" + row.uid + "&status=1"
          );

          this.$message({
            type: "success",
            message: "启用成功!"
          });
          this.getUserList(); //刷新一次用户列表界面
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
            "/admin/banAdmin?uid=" + row.uid + "&status=0"
          );

          this.$message({
            type: "success",
            message: "停用成功!"
          });
          this.getUserList(); //刷新一次用户列表界面
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消停用"
          });
        });

    // console.log(index, row);//输出index第几行 和row信息
    },
    // 管理员信息编辑窗口
    async handleEdit(row) {
      //console.log(row); //测试row(包含uid，title,createdAt,tel)
      this.editForm = row;
      this.EditDialogVisible = true;
    },

    //修改管理员信息并提交
    EditAdminInfo() {
      this.$refs.editFormRef.validate(valid => {
        //判断与校验是否通过
        // console.log(valid)//判断与校验是否通过
        if (!valid) return; //发起修改用户信息的数据请求
      
        let params = new URLSearchParams();
        params.append("tel", this.editForm.tel);
        params.append("uid", this.editForm.uid);
        params.append("username", this.editForm.username);
        // for (var value of params.keys()) {
        //   console.log(value); //遍历所有key  俩者是对应的
        // }
        // for (var value of params.values()) {
        //   console.log(value); //遍历所有的值
        // }

        this.$axios({
          method: "post",
          url: "/admin/updateAdmin",
          data: params
       
        })
          .then(response => {
            // console.log(response);
            // console.log(response.data);//测试用接口
          this.postData = response.data;
          this.EditDialogVisible = false; 
          //提示修改成功
            this.$message.success("更新用户成功！");
            //刷新数据
            this.getUserList(); 
          })
          .catch(error => {
            // console.log(error);
            this.$message.error("更新用户信息失败！");
          });
      });
    },

    // 删除窗口
    async handleDelete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$axios.get(
            "/admin/adminDelete?uId=" + row.uid
          );
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.userlist.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getUserList(); //刷新一次用户列表界面
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
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNo = newPage;
      this.getUserList();
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