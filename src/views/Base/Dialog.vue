<template>
  <div
    class="container"
    style="border:0px;background:rgba(0,0,0,0);text-align:center;padding-top:10px"
  >
    <h1 class="font2">WELLCOME</h1>

    <div class="container" style=" background-color: rgba(0, 0, 0, 0);border:0px">
      <br />
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="账号" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer" style="shuo ">
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </span>
  </div>
</template>
<script>
import qs from 'qs'

export default {
  data () {
    //预验证函数
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      } else {
        callback();
      }
    };
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系电话不能为空'));
      }
      setTimeout(() => {
        if (value.length < 11) {
          callback(new Error('必须是11位手机号'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
      
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        tel: ''
      },
      rules: {
        username: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        tel: [
          { validator: checkTel, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    submitForm (formName) {
       this.$refs[formName].validate(valid => {
        //判断与校验是否通过
        // console.log(valid)//判断与校验是否通过
        if (!valid) return; //发起修改用户信息的数据请求
      
        let params = new URLSearchParams();
        params.append("tel", this.ruleForm.tel);
        params.append("password", this.ruleForm.password);
        params.append("username", this.ruleForm.username);
       
        this.$axios({
          method: "post",
          url: "/admin/userAdd",
          data: params
       
        }) .then(response => {
            // console.log(response);
            // console.log(response.data);//测试接口数据
          //提示注册成功
           this.$notify({
          title: '成功',
          message: '用户注册成功',
          type: 'success'
        });    
// console.log(this.$refs[formName])
//重置窗口
   this.$refs[formName].resetFields();

})
          .catch(error => {
           this.$notify.error({
          title: '错误',
          message: '用户注册失败——该用户名已被注册'
        });

          });
       })
    },
     //注册用户的重置函数
    resetForm (formName) {
      this.$refs[formName].resetFields();

    },
   
  }
}
</script>