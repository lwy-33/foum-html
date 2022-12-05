<template>
  <div id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">
        系统注册
        <el-button @click="toLogin">返回登录</el-button>
      </h3>
      <el-form-item>
        <el-input v-model="Registerform.username" autocomplete="off" placeholder="用户名" type="usernane"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="Registerform.password" autocomplete="off" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="Registerform._password" autocomplete="off" placeholder="确认密码" type="passwordn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:48%;border: none;float: left" type="primary" @click="Register">注册</el-button>
        <el-button style="width:48%;border: none;float: right" type="primary" @click="Reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      Registerform: {
        username: '',
        password: '',
        _password:''
      }
    }
  },
  methods:{
    toLogin(){
      this.$router.push({path:'/Login'})
    },
    Register(){

    },
    Reset(){
      this.Registerform.username=''
      this.Registerform.password=''
      this.Registerform._password=''
    }
  }
}
</script>

<style scoped>
.login_title{
  text-align: center;
  margin: 0px auto 40px auto;
  color: #505458;
}
#poster{
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  width: 350px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>