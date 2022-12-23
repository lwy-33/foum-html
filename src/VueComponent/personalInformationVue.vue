<template>
<!--浮动个人信息-->
  <div class="app"><el-row :gutter="20">
    <el-col :span="12"><div class="grid-content bg-purple">
<!--      <img style="width: 80px;height: 80px" class="circleImg1" :src="require('D://userImage//userImage//'+user.userImage+'.png')" alt="">-->
      <el-image :src="user.userImage" class="circleImg1" fit="fill"></el-image>
      <p style="margin-left: 10px; font-weight: bold; font-family: '楷体';font-size: 12px">{{user.nickname}}</p>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
      <p style="text-align: center;font-family: '楷体'">{{user.personal}}</p>
    </div></el-col>

  </el-row>

<!--    <div style="height: 40px;width: 80px">-->
<!--      <img style="width: 80px;height: 80px" class="circleImg1" :src="require('D://userImage//userImage//'+user.userImage+'.png')" alt="">-->
<!--      <p style="margin-left: 10px; font-weight: bold; font-family: '楷体';font-size: 12px">{{user.nickname}}</p>-->
<!--    </div>-->
<!--    <div style="height: 40px;width: 80px">-->
<!--      <p style="margin: auto">{{user.personal}}</p>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "personalInformationVue",
  data(){
    return{
      user:{},

    }
  },
  props:{
    queryUserId:{
      type:Number,
    }
  },
  created() {
    // alert("fds"+this.queryUserId)
    this.$axios.get("http://localhost:8090/user/userByUserId?userId="+this.queryUserId).then(res=>{
      if(res.data.code==200){
        this.user=res.data.dataobject
      }else{
      }

    }).catch(err=>console.log("读取用户失败:"+err));
  }
}
</script>

<style scoped>

.app{
  /*z-index:2;*/
  height: 80px;
  width: 300px;
  background-color: white;position: absolute
}
</style>