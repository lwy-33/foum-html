<template>
  <div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <el-table
          :data="userList"
          style="width: 100%">
        <el-table-column
            label="用户编号"
            prop="userId"
            width="120">
        </el-table-column>
        <el-table-column
            label="头像"
            prop="userImage"
            width="120">
        </el-table-column>
        <el-table-column
            label="用户名"
            prop="username"
            width="120">
        </el-table-column>
        <el-table-column
            label="密码"
            prop="password"
            width="120">
        </el-table-column>
        <el-table-column
            label="性别"
            prop="sex"
            width="120">
        </el-table-column>
        <el-table-column
            label="电子邮件"
            prop="email"
            width="120">
        </el-table-column>
        <el-table-column
            label="角色"
            prop="roleInfo.roleName"
            width="120">
        </el-table-column>
        <el-table-column
            label="昵称"
            prop="nickname"
            width="120">
        </el-table-column>
        <el-table-column
            label="个人简介"
            prop="personal"
            width="120">
        </el-table-column>
        <el-table-column
            label="被访问次数"
            prop="bebrowseCount"
            width="120">
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
  </div>
</template>

<script>
export default {
  name: "AdminManager",
  data() {
    return {
      userList:[],
      curPage:1,
      pageSize:5,
      total: 0,
      form: {
        name: '',
      }
    }
  },
  methods:{
    getAllUserByPage(){
      this.$axios.get("http://localhost:8090/user/getAllAdminByPage?curPage="+this.curPage+"&pageSize="+this.pageSize).then(res=>{
        this.userList = res.data.dataobject;
        console.log(this.total)
      }).catch(err=>console.log(err));
    },
    getAllCount(){
      this.$axios.get("http://localhost:8090/user/getAllAdminCount").then(res=>{
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
    }
  },
  created() {
    this.getAllUserByPage()
    this.getAllCount()
  }
}
</script>

<style scoped>

</style>