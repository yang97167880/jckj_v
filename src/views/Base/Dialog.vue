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
   
      this.$refs[formName].validate(async valid => {
        if (valid){
           let obj = {
      username: this.ruleForm.username,
      password:  this.ruleForm.password,
      tel: this.ruleForm.tel,
      
    };
           console.log(obj);
         const{data:res}= await  this.$axios
         .post('/admin/userAdd',qs.stringify(obj),{headers:{'Content-Type':'application/x-www-form-urlencoded'}}
         ) 
         .then(res => {  
             console.log(res);
            console.log(res.data);      
          if(res.data.status == "success"){
             alert('注册成功!');         
         
           //关闭窗口
          //  this.dialogFormVisible = false;
          //重置用户列表数据
              this.$refs[formName].resetFields();
          
          }
         else {
          console.log('注册失败!!');
          return false;
        }
        }).catch(error => {
          console.log(error);
          this.$alert("网络请求问题，联系管理员修复", "管理员的提示", {
            confirmButtonText: "确定"
          });
        });
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>