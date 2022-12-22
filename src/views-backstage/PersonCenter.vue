<template>
  <div>
    <h2 style="font-size:36px;text-align: center;margin: 100px">个人中心</h2>
    <el-form :model="loginUser" label-width="80px">
      <el-row>
        <el-col :span="11" style="margin-right: 45px">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.username" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="密码">
            <el-input v-model="loginUser.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" style="margin-right: 45px">
          <el-form-item label="性别" prop="sex">
           <el-input v-model="loginUser.sex" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="loginUser.email" disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" style="margin-right: 45px">
          <el-form-item label="角色">
            <el-input v-model="loginUser.roleInfo.roleName" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="loginUser.nickname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" style="margin-right: 45px">
          <el-form-item label="个人简介">
            <el-input v-model="loginUser.personal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="被访问次数" prop="bebrowseCount">
            <el-input v-model="loginUser.bebrowseCount" disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="success" @click="saveInfo"><i class="el-icon-folder-opened"></i>保存</el-button>
        <el-button type="danger" @click="$router.push('/AdminHome')"><i class="el-icon-d-arrow-left"></i>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PersonCenter",
  data(){
    return{
      loginUser:{}
    }
  },
  methods:{
    saveInfo(){
      this.$axios.post('http://localhost:8090/user/editUser',this.loginUser).then(res=>{
        if(res.data.code==200){
          console.log(this.loginUser)
          this.$message({
            message:res.data.msg,
            type:"success"
          })
        }else {
          this.$message({
            message:res.data.msg,
            type:"warning"
          })
        }
      }).catch();
    }
  },
  created() {
    this.$axios.get('http://localhost:8090/user/getUserInfo',{
      headers:{
        'token':window.localStorage.getItem('token')
      }
    }).then(res=>{
      if(res.data.code==200){
        this.loginUser=res.data.dataobject;
      }else{
        this.$message({
          message:res.data.msg,
          type:'warning'
        });
      }
    });
  },
}
</script>

<style scoped>

</style>