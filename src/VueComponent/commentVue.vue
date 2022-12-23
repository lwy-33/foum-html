<script src="../js/drawer-drag.js"></script>
<template>
  <div>
<!--    <p>dfshtb</p>-->
<!--        <p>{{commentList}}</p>-->
    <div style="position: relative;">
      <div style="">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :placeholder=placeholder
            v-model="commentContent">
        </el-input>
      </div>

      <div style="margin-top: -20px;position: absolute;margin-left: 94%">
        <el-button type="primary" @click="commentEvent" icon="el-icon-s-promotion">评论</el-button>
      </div>
    </div>

    <div style="margin-top:20px">
      <div v-for="(comment,index) in commentList" style="margin-top: 14px;position: relative">
        <el-card class="box-card">
          <el-row :gutter="24">
            <el-col :span="3">
              <div class="circleImg1" style="">
<!--                <i><img class="circleImg1" :src="require('D://userImage//userImage//'+comment.by3+'.png')" alt=""></i>-->
                <el-image :src="comment.by3" class="circleImg1" fit="fill"></el-image>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="font-size: 15px">
                <p>{{ comment.by2 }}</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple" style="float: right;color: #8c939d;font-size: 10px">
                <p>{{comment.commentTime}}</p>
              </div>
            </el-col>

          </el-row>
          <p style="text-align: center">{{ comment.commentContent }}</p>
          <!--                      评论(少掉评论数字段)-->
          <!--        <p style="float: right">{{comment.commentContent}}</p>-->
          <p class="dzplC">{{comment.commentCount}}</p>
          <a @click="comments(comment.commentId,comment.becommentTypeId,comment.by2)" style="float: right"><img class="dzpl" src="./../images/comment.png"></a>
          <!--                    点赞-->
          <p class="dzplC">{{comment.thumbsCount}}</p>
          <!--        -->
          <a @click="thums(comment.commentId,comment.by1,index)"><ThumsVue
              :state="comment.by1!=0"

              style="float: right"></ThumsVue></a>
        </el-card>

      </div>
    </div>

    <el-drawer
        v-drawer-drag
        title="评论"
        :append-to-body="true"
        :before-close="handleClose"
        :visible.sync="innerDrawer"
        :destroy-on-close="true"
        size="size">
      <comment-vue
          :becommentId=commentId1
          :becommentTypeId=1
          :nickname="commentNickName"
          :destroy-on-close="true"
          ></comment-vue>
    </el-drawer>
  </div>

</template>

<script>

import ThumsVue from "@/VueComponent/thumsVue";
export default {
  name: "commentVue",
  components: {ThumsVue},
  data() {
    return {
      commentInstance:{},
      commentContent:'',
      commentNickName:'',
      // size:'',
      placeholder:'请输入内容',
      commentTypeId1:'',
      commentId1:'',
      commentTypeId:'',
      commentId:'',
      innerDrawer:false,
      userId: '',
      commentList: [],
    }
  },
  props: {
    becommentId: {
      type: Number,
    },
    becommentTypeId: {
      type: Number,
    },
    nickname:{
      type:String
    }
  },
  methods: {
    commentEvent(){
      //时间列在后台获取当前时间
      this.commentInstance={userId:this.userId,becommentTypeId:this.becommentTypeId,becommentId:this.becommentId,commentContent:this.commentContent,thumbsCount:0}
      console.log(this.commentInstance)
      this.$axios.post("http://localhost:8090/comment/addComment",this.commentInstance).then(res=>{
        if(res.data.code==200){
          this.$message({
            message: '评论成功！',
            type: 'success'
          });
          //重新请求数据
          this.commentContent=''
          this.loadData()
        }
      }).catch(err=>console.log("写入评论报错："+err))
    },
    handleClose(done) {

    },
    comments(titleId,typeId,nickName){//nick是为了添加评论时指定昵称
      // alert(nickName)
      this.commentNickName=nickName;
      // alert(this.size)
      this.commentId1=titleId;
      this.commentTypeId1= typeId;
      // alert(titleId+"  "+ty)
      this.innerDrawer = true
    },
    thums(titleId,likeOrNot,index){
      //          当前登录用户                帖子id            0约定为点赞类型为帖子
      // alert(titleId+"    "+this.titleList[index].likeOrNot+"   "+index)
      if(likeOrNot==0||likeOrNot==null){
        this.commentList[index].by1=1;
        this.commentList[index].thumbsCount++;
      }else{
        this.commentList[index].by1=0;
        this.commentList[index].thumbsCount--;
      }
      // alert(titleId)
      console.log(this.commentList[index])
      this.thumbs={userId:this.userId,bethumbsId:titleId,bethumbsTypeId:1}
      this.$axios.post("http://localhost:8090/thumbs/addThumbs",this.thumbs).then(res=>{
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'success'
        });
      })

    },
    loadData(){
      this.$axios.get("http://localhost:8090/comment/GetCommentById?userId="+this.userId+"&becommentId=" + this.becommentId + "&becommentTypeId=" + this.becommentTypeId).then(res => {
        // alert(res.data.code)
        this.commentList = res.data.dataobject;
        console.log(this.commentList)
      }).catch(err => console.log("读取评论:" + this.becommentId + " " + this.becommentTypeId + err))
    }
  },
  created() {
    this.placeholder="给"+this.nickname+"评论："


    // this.size*=0.95;
    this.userId = window.localStorage.getItem("userId");
    this.loadData();
  }
}
</script>

<style scoped>
.circleImg1 {
  /*  右上头像*/
  border-radius: 30px;
  width: 40px;
  height: 40px;
}

.dzpl{
  float: right;
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
.dzplC{
  /*background-color: red;*/
  float: right;
  margin-right: 30px;
}
body, h1, h2, h3, h4, h5, h6, ul, li, ol, dl, dt, dd, p, span, div, object, iframe, pre, a, abbr, cite, input, button, select, option {
  margin: 0;
  padding: 0;
  font-weight: normal;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

body {
  position: relative;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  line-height: 1.57142857;
  background-color: #f5f6f7;
  color: #333;
  min-height: 100%;
}

body {
  min-width: 1200px;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: #f5f6f7;
  line-height: 24px;
  font-size: 16px;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'Arial', 'SimSun';
}

</style>