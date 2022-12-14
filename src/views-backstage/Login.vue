<template>
  <div id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">
        系统登陆
        <el-button @click="toRegister">点我注册</el-button>
      </h3>
      <el-form-item>
        <el-input v-model="Loginform.username" autocomplete="off" placeholder="用户名" type="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="Loginform.password" autocomplete="off" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:48%;border: none;float: left" type="primary" @click="Login">登录</el-button>
        <el-button style="width:48%;border: none;float: right" type="primary" @click="Reset">重置</el-button>
      </el-form-item>
      <p>{{Loginform}}</p>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      Loginform: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    toRegister(){
      this.$router.push({path:'/Register'})
    },
    Login(){
      this.$axios.post('http://localhost:8090/user/PasswordVerification',this.Loginform).then(res=>{
        this.Loginform=res.data.dataobject;
        // alert(this.Loginform.password=='0')
        // console.log(this.Loginform)

        if(res.data.code==200){
          console.log(this.Loginform)
          window.localStorage.setItem("userId",this.Loginform.userId);
          window.localStorage.setItem("token",res.data.token);
          window.localStorage.setItem("nickname",this.Loginform.nickname);
          window.localStorage.setItem("userImage",this.Loginform.userImage);
          window.localStorage.setItem("personal",this.Loginform.personal);
          if(this.Loginform.roleId>2){
            this.$router.push({name:'Home'})
            this.$message({
              message:"登陆成功!",
              type:'success'
            })
          }else{
            this.$router.push({name:'AdminHome'})
            this.$message({
              message:"登陆成功，欢迎来到后台管理系统",
              type:'success'
            })
          }


        }else{ if(res.data.code==300) {
          this.$message({
            message: "密码错误!",
            type: 'success'
          })

          window.location.reload();
        }
        }

      }).catch(err=>{
        console.log(err);
      });

    },
    Reset(){
      this.Loginform.username=''
      this.Loginform.password=''
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