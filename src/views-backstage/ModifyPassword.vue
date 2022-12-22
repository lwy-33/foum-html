<template>
  <div>
    <h2 style="font-size:36px;text-align: center;margin: 100px">修改密码</h2>
    <el-form ref="userForm" :model="user"
             :rules="rules" label-width="80px" style="width: 50%;transform: translateX(50%)">

      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="user.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="user.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="surePassword">
        <el-input v-model="user.surePassword" placeholder="请输入确认型密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="saveInfo"><i class="el-icon-folder-opened"></i>确认保存</el-button>
        <el-button type="danger" @click="$router.push('/AdminHome')"><i class="el-icon-d-arrow-left"></i>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ModifyPassword",
  data(){
    return {
      user:{
        userId:'',
        username:'',
        password:'',
        oldPassword:'',
        newPassword:'',
        surePassword:'',
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        surePassword: [
          {required: true, message: '请输入确认新密码', trigger: 'blur'},
        ],
      }
    }
  },
  methods:{
    saveInfo(){
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.user.password=this.user.newPassword
          if(this.user.oldPassword==this.user.newPassword){
            this.$message({
              message:"新密码不能与旧密码相同",
              type:"warning"
            })
          }else if(this.user.newPassword!=this.user.surePassword){
            this.$message({
              message:"确认新密码因与新密码相同",
              type:"warning"
            })
          }else{
            this.$axios.post("http://localhost:8090/user/modifyPassword",this.user).then(res=>{
              this.$message({
                message:res.data.msg,
                type:"success"
              })
              this.$router.push({path:'/login'})
            }).catch(err=>console.log(err));
          }
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
  },
  created() {
    this.user.userId=window.localStorage.getItem("userId")
    this.user.username=window.localStorage.getItem("username")
  }
}
</script>

<style scoped>

</style>