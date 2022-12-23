<template>
  <div>
    <h2 style="font-size:36px;text-align: center;margin: 50px">个人中心</h2>
    <el-form :model="loginUser" label-width="80px" style="width: 50%;transform: translateX(50%)">
<!--      <el-image :src="loginUser.userImage"-->
<!--                fit="fill"-->
<!--                style="width: 100px;height: 100px">-->

<!--      </el-image>-->
      <el-form-item>
        <el-upload
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            action="http://localhost:8090/uploadFile1"
            class="avatar-uploader">
          <img v-if="loginUser.userImage" :src="loginUser.userImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="loginUser.username" disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-input v-model="loginUser.sex" disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="loginUser.email" disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-input v-model="loginUser.roleInfo.roleName" disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="loginUser.nickname"></el-input>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input v-model="loginUser.personal"></el-input>
      </el-form-item>

      <el-form-item label="被访问次数" prop="bebrowseCount">
        <el-input v-model="loginUser.bebrowseCount" disabled="true"></el-input>
      </el-form-item>

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
    },
    handleAvatarSuccess(response) {
      this.loginUser.userImage=response.dataobject
    },
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;
  margin-top: 20px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  transform: translateX(80%);
  border-radius: 100%;
}
</style>