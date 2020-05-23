<template>
  <div style="height: 100%" class="bg-img wrap">
    <div style="height:100%;display: flex;align-items: center;">
      <div class="container login-card">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="ruleForm.account"
              style="width: 320px"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item align="center">
            <el-button
              style="width: 40%"
              type="primary"
              @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button
              style="width: 40%"
              type="info"
              @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 登陆数据对象绑定
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        //验证用户名是否合法
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        //预验证
        if (valid) {

          this.$axios.get('/admin/userLogin?password=' + this.ruleForm.password + '&userName=' + this.ruleForm.account).then((res) => {
            console.log(res)
            console.log(res.data)//返回所有列的表头和状态				
            console.log(res.data.data)//返回success
            if (res.data.data == 'success') {
              this.$message.success('登陆成功')
              //登陆成功后的token 保存到客户端sessionStorage中
              //项目中除了登陆之外的其他api必须登陆后才可访问
              window.sessionStorage.setItem('token', res.data.token)
              this.$router.push({ path: '/top' })            }
            else {
              return this.$message.error("登陆失败")
            }

          }).catch((error) => {

            console.log(error)

            this.$alert('网络请求问题，联系管理员修复', '管理员的提示', {
              confirmButtonText: '确定'
            });
          })

        }
        else {
          console.log('error submit!!');
          return false;

        }
      });

    },
    //点击重置按钮，重置登陆表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.bg-img {
  background-image: url("../../assets/img/index.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.img-card {
  width: 100%;
  height: 100%;
  text-align: center;
}

.login-card {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  margin: 50px;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
}
</style>
