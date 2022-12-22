<template>
  <div>
    <el-form class="el-f" label-width="80px">
      <el-form-item label="帖子名称" >
        <el-input v-model="titleName" placeholder="请输入帖子名称"></el-input>
      </el-form-item>
      <el-form-item label="所属用户" >
<!--        <el-input v-model="userId" placeholder="请选择所属用户"></el-input>-->
        <el-select v-model="userId" placeholder="游戏类型">
          <el-option
              v-for="userInfo in userList"
              :ket="userInfo.userId"
              :label="userInfo.username"
              :value="userInfo.userId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属游戏" >
<!--        <el-input v-model="gameId" placeholder="请选择所属游戏"></el-input>-->
        <el-select v-model="gameId" placeholder="游戏类型">
          <el-option
              v-for="gameInfo in gameList"
              :ket="gameInfo.gameId"
              :label="gameInfo.gameName"
              :value="gameInfo.gameId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button round size="small" type="primary" @click="findAllTitleByPage"><i class="el-icon-search"></i>查询</el-button>
        <el-button round size="small" type="primary" @click="Reset"><i class="el-icon-refresh"></i>重置</el-button>
      </el-form-item>
    </el-form>
    <el-button round type="primary"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    <el-button round type="danger" @click="delTitleByIds"><i class="el-icon-delete"></i>批量删除</el-button>

    <template>
      <el-table
          ref="multipleTable"
          :cell-style="rowStyle"
          :data="titleList"
          :header-cell-style="headStyle"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="30">
        </el-table-column>
        <el-table-column
            label="帖子编号"
            prop="titleId"
            width="120">
        </el-table-column>
        <el-table-column
            label="帖子名称"
            prop="titleName"

            width="120px">
        </el-table-column>
        <el-table-column
            label="帖子内容"
            prop="titleContent"

            width="120px">
        </el-table-column>
        <el-table-column
            label="所诉用户"
            prop="userInfo.username"
            show-overflow-tooltip
            width="120px">
        </el-table-column>
        <el-table-column
            label="游戏类型"
            prop="gameInfo.gameName"
            show-overflow-tooltip
            width="120px">
        </el-table-column>
        <el-table-column
            label="发布时间"
            prop="releaseTime"

            width="120px">
        </el-table-column>
        <el-table-column
            label="评论总数"
            prop="commentCount"
            show-overflow-tooltip
            width="120px">
        </el-table-column>
        <el-table-column
            label="点赞总数"
            prop="thumbsCount"
            show-overflow-tooltip
            width="200px">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                @click="showEditDialog(scope.$index, scope.row)"
                ><i class="el-icon-edit"></i>编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </template>

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
      <el-form ref="titleForm" :model="title" label-width="80px">

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="帖子名称" prop="email">
              <el-input v-model="title.titleName" placeholder="帖子名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="发布时间" prop="email">
              <el-input v-model="title.releaseTime" disabled="true" placeholder="发布时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="所属用户" prop="username">
              <el-input v-model="title.userInfo.username" disabled="true" placeholder="所属用户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="所属游戏" prop="password">
              <el-input v-model="title.gameInfo.gameName" disabled="true" placeholder="所属游戏"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" style="margin-right: 45px">
            <el-form-item label="评论总数">
              <el-input v-model="title.commentCount" disabled="true" placeholder="评论总数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="点赞总数">
              <el-input v-model="title.thumbsCount" disabled="true" placeholder="点赞总数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TitleManager",
  data(){
    return {
      titleList:[],
      userList:[],
      gameList:[],
      curPage:1,
      pageSize:5,
      total: 0,
      titleName:'',
      userId:'',
      gameId:'',
      dialogVisible:false,
      title:{
        titleName:'',
        titleContent:'',
        userId:'',
        gameId:'',
        releaseTime:'',
        commentCount:'',
        thumbsCount:'',
        userInfo:'',
        gameInfo:''
      },
    }
  },
  methods:{
    findAllUser(){
      this.$axios.get("http://localhost:8090/user/seleAll").then(res=>{
        this.userList=res.data.dataobject
        console.log(this.userList);
      }).catch(err=>{console.log(err)})
    },
    findAllGame(){
      this.$axios.get("http://localhost:8090/game/findAllGame").then(res=>{
        this.gameList = res.data.dataobject;
      }).catch(err=>console.log(err));
    },
    findAllTitleByPage(){
      this.$axios.get("http://localhost:8090/title/findAllTitleByPage",{
        params:{
          curPage:this.curPage,
          pageSize:this.pageSize,
          titleName:this.titleName,
          userId:this.userId,
          gameId:this.gameId
        }
      }).then(res=>{
        this.titleList = res.data.dataobject;
        console.log(res.data.dataobject)
      }).catch(err=>console.log(err));
    },
    getAllTitleCount(){
      this.$axios.get("http://localhost:8090/title/getAllTitleCount").then(res=>{
        this.total = res.data.dataobject;
        console.log(this.total)
        console.log(res.data.dataobject)
      }).catch(err=>console.log(err));
    },
    handleSizeChange(val) {
      this.pageSize=val;
      console.log(`每页 ${val} 条`);
      console.log(this.pageSize)
      this.findAllTitleByPage();
    },
    handleCurrentChange(val) {
      this.curPage=val
      console.log(`当前页: ${val}`);
      console.log(this.curPage)
      this.findAllTitleByPage();
    },
    headStyle(){
      return "text-align:center"
    },
    rowStyle(){
      return "text-align:center"
    },
    handleEdit() {
      this.$refs["titleForm"].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8090/title/editTitle', this.title).then(res => {
            if (res.data.code == 200) {
              console.log(this.title)
              this.dialogVisible = false;
              this.findAllTitleByPage();
              this.getAllTitleCount()
              this.$message({
                message: res.data.msg,
                type: "success"
              })
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              })
            }
          }).catch(err => {
            console.log(err)
          });
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
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("您确定要删除该帖子吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        this.$axios.get("http://localhost:8090/title/delTitleById?titleId="+row.titleId).then(res=>{
          if(res.data.code==200){
            this.findAllTitleByPage();
            this.getAllTitleCount()
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
    delTitleByIds(){
      this.$confirm("您确定要删除选中帖子吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        let titleIds=this.multipleSelection.map(value => value.titleId)//[{}]=>[1,2]
        this.$axios.post("http://localhost:8090/title/delTitleByIds",titleIds).then(res=> {
          if(res.data.code=200){
            this.findAllTitleByPage()
            this.getAllTitleCount()
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showEditDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.title,row)
    },
    Reset(){
      this.titleName=''
      this.userId=''
      this.gameId=''
    }
  },
  created() {
    this.findAllTitleByPage()
    this.getAllTitleCount()
    this.findAllUser()
    this.findAllGame()
  }
}
</script>

<style scoped>
.el-f{
  list-style: none;
  display: flex;
  /*float: left;*/
}
</style>