<template>
  <div style="height: 100%" class="bg-img wrap">
    <div style="height:100%;display: flex;align-items: center;">
      <div class="container login-card">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input
              v-model="form.account"
              style="width: 320px"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item align="center">
            <el-button style="width: 80%" type="primary" @click="Login"
              >登录</el-button
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
      form: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    Login () {
      this.$router.replace('home')
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
