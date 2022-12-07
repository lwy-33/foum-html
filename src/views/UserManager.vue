<template>
  <div>
    <el-form ref="form" class="el-form" label-width="80px">
      <el-form-item label="用户名" >
        <el-input v-model="username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-input v-model="sex" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="昵称" >
        <el-input v-model="nickname" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button round size="small" type="primary" @click="getAllUserByPage">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table
        :data="userList"
        style="width: 100%">
      <el-table-column
          label="用户编号"
          prop="userId"
          width="110">
      </el-table-column>
      <el-table-column
          label="头像"
          prop="userImage"
          width="110">
      </el-table-column>
      <el-table-column
          label="用户名"
          prop="username"
          width="110">
      </el-table-column>
      <el-table-column
          label="密码"
          prop="password"
          width="110">
      </el-table-column>
      <el-table-column
          label="性别"
          prop="sex"
          width="110">
      </el-table-column>
      <el-table-column
          label="电子邮件"
          prop="email"
          width="110">
      </el-table-column>
      <el-table-column
          label="角色"
          prop="roleInfo.roleName"
          width="110">
      </el-table-column>
      <el-table-column
          label="昵称"
          prop="nickname"
          width="110">
      </el-table-column>
      <el-table-column
          label="个人简介"
          prop="personal"
          width="110">
      </el-table-column>
      <el-table-column
          label="被访问次数"
          prop="bebrowseCount"
          width="110">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block">
      <el-pagination
          :current-page="curPage"
          :page-size="pageSize"
          :page-sizes="[2, 5, 10, 15]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManager",
  data() {
    return {
      userList:[],
      curPage:1,
      pageSize:5,
      total: 0,
      username:'',
      sex:'',
      nickname:''
    }
  },
  methods:{
    // getUser(){
    //   console.log(this.da)
    //   this.$axios.post("http://localhost:8090/user/getUser",this.da).then(res=>{
    //     this.userList=res.data.dataobject;
    //   }).catch(err=>{console.log(err)});
    // },
    getAllUserByPage(){
      this.$axios.get("http://localhost:8090/user/getAllUserByPage",{
        params:{
          curPage:this.curPage,
          pageSize:this.pageSize,
          username:this.username,
          sex:this.sex,
          nickname:this.nickname
        }
      }).then(res=>{
        this.userList = res.data.dataobject;
        console.log(this.total)
      }).catch(err=>console.log(err));
    },
    getAllCount(){
      this.$axios.get("http://localhost:8090/user/getAllCount").then(res=>{
        this.total = res.data.dataobject;
        console.log(this.total)
        console.log(res.data.dataobject)
      }).catch(err=>console.log(err));
    },
    handleSizeChange(val) {
      this.pageSize=val;
      this.getAllUserByPage()
    },
    handleCurrentChange(val) {
      this.curPage=val;
      this.getAllUserByPage()
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("您确定要删除此用户信息吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        this.$axios.get("http://localhost:8090/user/delUserById?userId="+row.userId).then(res=>{
          if(res.data.code==200){
            this.getAllUserByPage()
            this.getAllCount()
            this.$message({
              message:res.data.msg,
              type:'success'
            });
          }
        }).catch(err=>{console.log(err)})
      }).catch(()=>{
        this.$message({
          message:"已经取消删除",
          type:'warning'
        })
      })
    }
  },
  created() {
    this.getAllUserByPage()
    this.getAllCount()
  }
}
</script>

<style scoped>
.el-form{
  list-style: none;
  display: flex;
  float: left;
}
</style>