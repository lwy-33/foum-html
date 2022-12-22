<template>
  <div>
    <div style="margin: 20px;">
      <el-form label-width="80px" >
        <el-form-item label="游戏类型" style="transform: translateX(32%)">
          <el-input v-model="typeName" placeholder="游戏类型" style="width: 250px; margin-right: 20px; "></el-input>
          <el-button style="border-radius: 25px" @click="findByVague"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button round type="primary" @click="showAddDialog"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    <el-table
        :cell-style="rowStyle"
        :data="gameTypeList"
        :header-cell-style="headStyle"
        border
        style="width: 100%;margin-top: 20px">
      <el-table-column
          label="游戏类型编号"
          prop="typeId"
          width="180">
      </el-table-column>
      <el-table-column
          label="游戏类型名称"
          prop="typeName"
          width="800">
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

    <el-dialog
        :visible.sync="dialogVisible"
        title="提示"
        width="30%">
      <el-form ref="gametypeForm" :model="gametype" :rules="rules" label-width="80px">
        <el-form-item label="游戏类型编号">
          <el-input v-model="gametype.typeId" disabled="" placeholder="游戏类型编号"></el-input>
        </el-form-item>
        <el-form-item label="游戏类型名称" prop="typeName">
          <el-input v-model="gametype.typeName" placeholder="游戏类型名称"></el-input>
        </el-form-item>
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
  name: "GameType",
  data(){
    return{
      gameTypeList:[],
      gametype:{typeId:'',typeName:''},
      dialogVisible:false,
      typeName: '',
      rules: {
        typeName: [
          { required: true, message: '请输入游戏类型名称', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    findAllGameType(){
      this.$axios.get("http://localhost:8090/gametype/findAllGameType").then(res=>{
        this.gameTypeList=res.data.dataobject
        console.log(this.gameTypeList);
      }).catch(err=>{console.log(err)})
    },
    findByVague(){
      this.$axios.get("http://localhost:8090/gametype/findByVague?typeName="+this.typeName).then(res=>{
        this.gameTypeList=res.data.dataobject
        console.log(this.gameTypeList);
      }).catch(err=>{console.log(err)})
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("您确定要删除此游戏类别吗?","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=>{
        this.$axios.get("http://localhost:8090/gametype/delGameTypeById?gameTypeId="+row.typeId).then(res=>{
          if(res.data.code==200){
            this.findAllGameType()
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
      this.$refs["gametypeForm"].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8090/gametype/editGameType',this.gametype).then(res=>{
            if(res.data.code==200){
              console.log(this.gametype)
              this.dialogVisible=false;
              this.findAllGameType();
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
          this.$message({
            message:"验证失败",
            type:'warning'
          })
          console.log('error sumbit!!')
          return false;
        }
      });

    },
    showAddDialog(){
      this.dialogVisible=true;
      this.gametype={}
    },
    showEditDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.gametype,row)
    },
    headStyle(){
      return "text-align:center"
    },
    rowStyle(){
      return "text-align:center"
    },
  },
  created() {
    this.findAllGameType();
  }
}
</script>

<style scoped>
placeholder-class {
  text-align: center;
}
</style>