<template>
  <div id="poster">
    <el-form ref="registerForm" :model="user" :rules="rules" class="register-container" label-position="left" label-width="0px">
      <h3 class="register_title">
        系统注册
        <el-button @click="toLogin">返回登录</el-button>
      </h3>
      <el-form-item prop="username">
        <el-input v-model="user.username" autocomplete="off" placeholder="用户名" type="usernane"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" autocomplete="off" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="_password">
        <el-input v-model="user._password" autocomplete="off" placeholder="确认密码" type="passwordn"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="电子邮件"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <template>
          <el-radio v-model="user.sex" label="男">男</el-radio>
          <el-radio v-model="user.sex" label="女">女</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button style="width:48%;border: none;float: left" type="primary" @click="Register">注册</el-button>
        <el-button style="width:48%;border: none;float: right" type="primary" @click="Reset">重置</el-button>
      </el-form-item>
      {{user}}
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空！"));
      }
      else {
        const reg=/^[1-9][0-9]{2,}@qq.com$/
        if(reg.test(value)){
          callback();
        }else {
          return callback(new Error("邮箱格式不正确！"));
        }
      }
    };
    return {
      user: {
        username: '',
        password: '',
        _password:'',
        email:'',
        sex:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        _password: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    toLogin(){
      this.$router.push({path:'/Login'})
    },
    Register(){
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8090/user/register',this.user).then(res=>{
            if(res.data.code==200){
              console.log(this.user)
              if(this.user.password==this.user._password){
                this.$message({
                  message:res.data.msg,
                  type:"success"
                })
              }else{
                this.$message({
                  message:"密码和确认密码不一致",
                  type:"warning"
                })
                console.log("密码和确认密码不一致")
              }
            }else {
              this.$message({
                message:res.data.msg,
                type:"warning"
              })
            }
          }).catch(err=>{console.log(err)});
        } else {
          this.$message({
            message:"验证失败",
            type:'warning'
          })
          console.log('error sumbit!!')
          return false;
        }
      });
    },
    Reset(){
      this.user.username=''
      this.user.password=''
      this.user._password=''
      this.user.email=''
      this.user.sex=''
    }
  }
}
</script>

<style scoped>
.register_title{
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
.register-container{
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