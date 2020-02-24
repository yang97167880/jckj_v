<template>
  <div style="height: 100%" class="bg-img wrap">
    <div style="height:100%;display: flex;align-items: center;">
      <div class="container login-card">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" style="width: 320px" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item align="center">
            <el-button style="width: 40%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button style="width: 40%" type="info" @click="resetForm('ruleForm')">重置</el-button>
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
       rules:{
         //验证用户名是否合法
         account:[
            {required: true,message:"请输入用户名",trigger:"blur"},
         ],
          //验证密码是否合法
       password:[
            {required: true,message:"请输入密码",trigger:"blur"},
       ]
  }
    }
  },
 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid)=>
       {
         //预验证
         if(valid) 
         {
           alert('submit!');
          console.log(this.ruleForm);
          this.$router.replace('home')
         }
         else {
            console.log('error submit!!');
            return false;

          }
       });
     
    },
    //点击重置按钮，重置登陆表单
    resetForm(formName){
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
