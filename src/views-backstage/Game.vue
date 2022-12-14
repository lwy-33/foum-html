<template>
  <div>
    <el-form class="el-f" label-width="80px">
      <el-form-item label="游戏名称" >
        <el-input v-model="gameName" placeholder="请输入游戏名称"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型" prop="roleId">
        <el-select v-model="gameTypeId" placeholder="游戏类型">
          <el-option
              v-for="gameType in gameTypeList"
              :ket="gameType.typeId"
              :label="gameType.typeName"
              :value="gameType.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button round size="small" type="primary" @click="findByVague"><i class="el-icon-search"></i>查询</el-button>
        <el-button round size="small" type="primary" @click="Reset"><i class="el-icon-refresh"></i>重置</el-button>
      </el-form-item>
    </el-form>
    <el-button round type="primary" @click="showAddDialog"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    <el-button round type="danger" @click="delGameByIds"><i class="el-icon-delete"></i>批量删除</el-button>
    <template>
      <el-table
          ref="multipleTable"
          :cell-style="rowStyle"
          :data="gameList"
          :header-cell-style="headStyle"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
<!--        <el-table-column-->
<!--            label="日期"-->
<!--            width="120">-->
<!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
<!--        </el-table-column>-->
        <el-table-column
            label="游戏编号"
            prop="gameId"
            width="100">
        </el-table-column>
        <el-table-column
            label="游戏图标"
            prop="gameIcon"
            show-overflow-tooltip
            width="400px">
        </el-table-column>
        <el-table-column
            label="游戏名称"
            prop="gameName"
            show-overflow-tooltip
            width="200px">
        </el-table-column>
        <el-table-column
            label="游戏类型"
            prop="by3"
            show-overflow-tooltip
            width="200px">
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
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </template>
    <el-dialog
        :visible.sync="dialogVisible"
        title="提示"
        width="30%">
      <el-form label-width="80px">
        <el-form-item label="游戏名称">
          <el-input v-model="game.gameName" placeholder="游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="游戏类型" prop="roleId">
          <el-select v-model="game.gameTypeId" placeholder="游戏类型">
            <el-option
                v-for="gameType in gameTypeList"
                :ket="gameType.typeId"
                :label="gameType.typeName"
                :value="gameType.typeId"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <p style="margin-left: 12px;margin-top: 100px">游戏图标</p>
          </el-col>
          <el-col :span="17">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
    {{this.multipleSelection}}
  </div>
</template>
<script>
export default {
  name: "Game",
  data() {
    return {
      gameList:[],
      gameTypeList:[],
      multipleSelection: [],
      gameName:'',
      gameTypeId:'',
      game:{gameName:'',gameTypeId:'',gameIcon:''},
      dialogVisible:false,
      imageUrl:''
    }
  },
  methods: {
    findAllGameType(){
      this.$axios.get("http://localhost:8090/gametype/findAllGameType").then(res=>{
        this.gameTypeList=res.data.dataobject
        console.log(this.gameTypeList);
      }).catch(err=>{console.log(err)})
    },
    findByVague(){
      this.$axios.get("http://localhost:8090/game/findByVague?gameName="+this.gameName+"&gameTypeId="+this.gameTypeId).then(res=>{
        this.gameList=res.data.dataobject
        console.log(this.gameList);
      }).catch(err=>{console.log(err)})
    },
    findAllGame(){
      this.$axios.get("http://localhost:8090/game/findAllGame").then(res=>{
        this.gameList = res.data.dataobject;
        //console.log(res.data.dataobject)
      }).catch(err=>console.log(err));
    },
    delGameByIds(){
      this.$confirm("您确定要删除此游戏信息吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        let gameIds=this.multipleSelection.map(value => value.gameId)//[{}]=>[1,2]
        this.$axios.post("http://localhost:8090/game/delGameByIds",gameIds).then(res=> {
          if(res.data.code=200){
            this.findAllGame()
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
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("您确定要删除此游戏信息吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        this.$axios.get("http://localhost:8090/game/delGameById?gameId="+row.gameId).then(res=>{
          if(res.data.code==200){
            this.findAllGame()
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
    handleEdit(){
      this.$axios.post('http://localhost:8090/game/editGame',this.game).then(res=>{
        if(res.data.code==200){
          console.log(this.game)
          this.dialogVisible=false;
          this.findAllGame();
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
    showAddDialog(){
      this.dialogVisible=true;
      this.game={}
    },
    showEditDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.game,row)
    },
    Reset(){
      this.gameName=''
      this.gameTypeId=''
    },
    headStyle(){
      return "text-align:center"
    },
    rowStyle(){
      return "text-align:center"
    },
  },
  created() {
    this.findAllGame();
    this.findAllGameType();
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