<template>
  <div>
    <el-form class="el-f" label-width="80px">
      <el-form-item label="用户名" >
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-input v-model="sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="昵称" >
        <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button round size="small" type="primary" @click="getAllUserByPage"><i class="el-icon-search"></i>查询</el-button>
        <el-button round size="small" type="primary" @click="Reset"><i class="el-icon-refresh"></i>重置</el-button>
      </el-form-item>
    </el-form>
    <el-button round type="primary" @click="showAddDialog"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    <el-table
        :data="userList"
        :cell-style="rowStyle"
        :header-cell-style="headStyle"
        style="width: 100%">
      <el-table-column
          label="用户编号"
          prop="userId"
          width="95">
      </el-table-column>

      <el-table-column
          label="头像"
          prop="userImage"
          width="110">
        <template slot-scope="scope" >
          <!--          <span v-for="(item2,index2) in scope.row.userImage" >-->
          <el-popover
              placement="right"
              trigger="click"
              width="400">
<!--            <img  :src="src" width="400px" height="400px"/><br>-->
            <img slot="reference" :src="src+scope.row.userImage+hz" height="100px" style="border-radius: 100%" width="100px" >
          </el-popover>
          <!--            require('D://userImage//userImage//'+item2+'.png')-->
          <!--    这个是实现点击图片放大功能的代码-->
          <!--          </span>-->
        </template>
      </el-table-column>

<!--      <el-table-column label="发布图片" align="center" prop="userImage" width="400px">-->
<!--        <template slot-scope="scope" >-->
<!--&lt;!&ndash;          <span v-for="(item2,index2) in scope.row.userImage" >&ndash;&gt;-->
<!--            <el-popover-->
<!--                placement="right"-->
<!--                width="400"-->
<!--                trigger="click">-->
<!--              <img  :src="src" width="400px" height="400px"/><br>-->
<!--            <img  slot="reference" :src="src" width="100px" height="100px" >-->
<!--          </el-popover>-->
<!--&lt;!&ndash;            require('D://userImage//userImage//'+item2+'.png')&ndash;&gt;-->
<!--            &lt;!&ndash;    这个是实现点击图片放大功能的代码&ndash;&gt;-->
<!--&lt;!&ndash;          </span>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->

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
              @click="showEditDialog(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>

    </el-table>

<!--    <div>-->
<!--      <img  :src="require('D://userImage//userImage//'+url+'.png')" /><br>-->
<!--    </div>-->

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

    <el-dialog
        :visible.sync="dialogVisible"
        title="提示">
      <el-form ref="userForm" :model="user" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username" placeholder="用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password" placeholder="密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="性别" prop="sex">
<!--              <el-input v-model="user.sex"></el-input>-->
              <template>
                <el-radio v-model="user.sex" label="男">男</el-radio>
                <el-radio v-model="user.sex" label="女">女</el-radio>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="user.email" placeholder="电子邮件"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="user.roleId" placeholder="角色">
                <el-option
                    v-for="role in roleList"
                    :ket="role.roleId"
                    :label="role.roleName"
                    :value="role.roleId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="user.nickname" placeholder="昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="个人简介">
              <el-input v-model="user.personal" placeholder="个人简介"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="被访问次数" prop="bebrowseCount">
              <el-input v-model="user.bebrowseCount" placeholder="被访问次数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="3">
          <p style="margin-left: 12px;margin-top: 100px">头像</p>
        </el-col>
        <el-col :span="20">
          <el-upload
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              action="https://jsonplaceholder.typicode.com/posts/"
              class="avatar-uploader">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
      {{user}}
      {{imageUrl}}
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "UserManager",
  data() {
    var validatebebrowseCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空！"));
      }
      else {
        const reg=/^[0-9][0-9]*$/
        if(reg.test(value)){
          callback();
        }else {
          return callback(new Error("请输入整形数字!"));
        }
      }
    };
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
      userList:[],
      roleList:[],
      curPage:1,
      pageSize:5,
      total: 0,
      username:'',
      sex:'',
      nickname:'',
      dialogVisible:false,
      user:{
        password:'',
        nickname:'',
        sex:'',
        email:'',
        roleId:'',
        userImage:'',
        bebrowseCount:'',
        personal:'',
        username:''
      },
      src: 'http://localhost:8090/user/file/',
      hz:'.png',
      imageUrl: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        bebrowseCount: [
          { required: true, validator: validatebebrowseCount, trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    // getUser(){
    //   console.log(this.da)
    //   this.$axios.post("http://localhost:8090/user/getUser",this.da).then(res=>{
    //     this.userList=res.data.dataobject;
    //   }).catch(err=>{console.log(err)});
    // },
    findAll(){
      this.$axios.get("http://localhost:8090/role/findAll").then(res=>{
        this.roleList=res.data.dataobject
        console.log(this.roleList);
      }).catch(err=>{console.log(err)})
    },
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
    handleEdit() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8090/user/editUser',this.user).then(res=>{
            if(res.data.code==200){
              console.log(this.user)
              this.dialogVisible=false;
              this.getAllUserByPage()
              this.getAllCount()
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
          }).catch(err=>{console.log(err)});
        } else {
          alert("验证失败")
          console.log('error sumbit!!')
          return false;
        }
      });


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
    },
    Reset(){
      this.username='';
      this.sex='';
      this.nickname=''
    },
    showAddDialog(){
      this.dialogVisible=true;
      this.user={}
    },
    showEditDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.user,row)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isPNG && isLt2M;
    },
    headStyle(){
      return "text-align:center"
    },
    rowStyle(){
      return "text-align:center"
    }
  },
  created() {
    this.getAllUserByPage()
    this.getAllCount()
    this.findAll()
  }
}
</script>

<style scoped>
.el-f{
  list-style: none;
  display: flex;
  /*float: left;*/
}
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
}
</style>