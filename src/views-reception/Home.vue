<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">

        <div style="text-align: center" class="grid-content bg-purple ">
          <!--      导航栏和头像，名称，登出-->
          <div style="height: 200px ;margin: auto" class="">
            <!--        头像用户名简介-->
            <!--            <img class="circleImg" src="D:\userImage\userImage\1.png">-->
            <img class="circleImg" :src="require('D://userImage//userImage//'+user.userImage+'.png')" alt="">
            <h2>{{ user.nickname }}</h2>
            <p>{{ user.personal }}</p>
          </div>
          <div  style="height: 90% ">
            <!--        导航栏@open="handleOpen" @close="handleClose" :collapse="isCollapse"-->
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo backclass" id="back">
              <div v-for="game in games"  ><template  class=""><el-submenu index="game.gameId" >
                <span @click="gameType(game.gameId)" slot="title">{{ game.gameName }}</span>
              </el-submenu></template></div>


            </el-menu>

          </div>
          <div>
            <!--          登出-->

          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <!--      主题-->
        <div class="grid-content bg-purple">
          <div style="">
            <!--          搜索框，（主题），通知，个人中心-->
            <el-row :gutter="10">
              <el-col :span="15"><div class="grid-content bg-purple" style="margin: 0 auto" >
                <div style="margin-left: 100px">
                  <el-input
                      placeholder="请输入内容"
                      v-model="input"
                      clearable>
                  </el-input>
                </div>

              </div></el-col>

              <el-col :span="4"><div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-search"></el-button>
              </div></el-col>

              <el-col :span="1">
                <el-badge :value="UnreadCount" class="item">
                  <a>
                    <!--                  <img v-show="newMessage" src="./../images/HaveMessage.png" style="height: 40px;width: 40px">-->
                    <img  src="./../images/noMessage.png" style="height: 30px;width: 30px">
                  </a>
                </el-badge>
              </el-col>
              <el-col :span="3"><div class="grid-content bg-purple"  style="float: right;">
                <img class="circleImg1" :src="require('D://userImage//userImage//'+user.userImage+'.png')" alt="">
                <el-dropdown style="">
                  <span class="el-dropdown-link" style="font-size: 30px">
                   {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>收藏库</el-dropdown-item>
                    <el-dropdown-item>关注</el-dropdown-item>
                    <el-dropdown-item>换个头像</el-dropdown-item>
                    <el-dropdown-item>改改密码</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div></el-col>
            </el-row>

          </div>
          <div>
            <!--          帖子列表，图片转播，推荐用户-->
            <el-row :gutter="15">
              <el-col :span="19">
                <div style=" " class="grid-content bg-purple">
                  <!--                帖子列表-->


                  <div  v-for="(p,index) in titleList"  style="margin-top: 14px;position: relative" >

                    <el-card class="box-card">
                      <el-row :gutter="10">
                        <el-col :span="6"><div  class="grid-content bg-purple" style="height: 80px;background-color: red">
                          <div  @mouseenter="titleOnEnterTd(index)" @mouseleave="titleOnLeaveTd(index)">
                            <!--                          帖子用户头像-->
                            <img class="circleImg1" :src="require('D://userImage//userImage//'+p.user.userImage+'.png')" alt="">
                            <a v-show="p.whetherToPayAttention" style="margin-bottom: 0px"><img style="margin-bottom: -9px;border-radius: 5px;
                              width: 20px;height: 20px;margin-left: -30px;" src="./../images/+.png" ></a>
                            <p style="margin-bottom: 0px">{{p.user.nickname}}</p>
                            <p style="margin-bottom: 0px">{{p.title.releaseTime}}</p>
                          </div>
                        </div></el-col>
                        <el-col :span="18"><div class="grid-content bg-purple" style="position: relative">
                          <div style="position:absolute; z-index:1;">
                            <p>{{p.title.titleName}}</p>
                          </div>
                          <div style="position:absolute;top: 10px;z-index:2;">
                            <PersonalInformationVue
                                :queryUserId="p.title.userId"
                                v-show="showUser[index]"
                                ></PersonalInformationVue>
                          </div>
<!--                          <div v-show="" style="z-index:2;height: 80px;width: 80px;background-color: white;position: absolute">-->

<!--                          </div>-->
                        </div></el-col>
                        <!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
                        <!--                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
                      </el-row>
                      <!--                      //whetherToPayAttention是否关注；whetherToCollect是否收藏；likeOrNot是否点赞-->
                      <!--                      收藏-->
                      <p class="dzplC">{{p.by3}}</p>
<!--                      <a v-show="p.whetherToCollect" style="float: right" ><img class="dzpl" src="./../images/couect.png"></a>-->
<!--                      <a v-show="!p.whetherToCollect" style="float: right"><img class="dzpl" src="./../images/noCouect.png"></a>-->
                      <a @click="couect(p.title.titleId,p.whetherToCollect,index)"><CouectVue
                          :state="p.whetherToCollect==1"
                          style="float: right"></CouectVue></a>
                      <!--                      评论-->
                      <p class="dzplC">{{p.title.commentCount}}</p>
                      <a @click="drawer = true" style="float: right"><img class="dzpl" src="./../images/comment.png"></a>
                      <!--                      点赞-->
                      <p class="dzplC">{{p.title.thumbsCount}}</p>
                      <a @click="thums(p.title.titleId,p.likeOrNot,index)"><ThumsVue
                          :state="p.likeOrNot==1"

                          style="float: right"></ThumsVue></a>

                    </el-card>

                  </div>


                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <!--                右侧边栏-->
                  <div>
                    <!--                  图片转播（不行就广告）-->
                    <template>
                      <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item in icon" :key="item">
                          <a><img style="height: 200px;width: 100px" :src="require('D://userImage//icon//'+item+'.png')" alt=""></a>
                        </el-carousel-item>
                      </el-carousel>
                    </template>
                  </div>
                  <div v-for="recommendedUser in recommendedUsers" class="d_div">
                    <!--                  推荐用户-->
                    <div style="float: left;" >
                      <a><img class="circleImg1" :src="require('D://userImage//userImage//'+recommendedUser.userImage+'.png')" alt=""></a>
                      <!--                      跳转用户该用户-->
                    </div>
                    <div>
                      <h3 style="margin-top: 0px">{{recommendedUser.nickname}}</h3>
                      <p style="margin-top: -20px">{{recommendedUser.personal}}</p>
                    </div>
                    <div  style="margin-right: 20px ;float: right;margin-top: -50px;width: 20px;height: 20px">
                      <img style="width: 30px;height: 30px" v-show="recommendedUser.by3==1" src="./../images/whetherToPayAttention.png">
                      <img style="width: 30px;height: 30px" v-show="!(recommendedUser.by3==1)" src="./../images/payNoAttentionTo.png">

                      <!--                      <el-button v-show="!recommendedUser.whetherToPayAttention" type="primary" icon="el-icon-close"></el-button>-->
                      <!--                      <el-button v-show="recommendedUser.whetherToPayAttention" type="primary" icon="el-icon-check"></el-button>-->
                    </div>

                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import Top from "@/components/Top";
import ThumsVue from "@/VueComponent/thumsVue";

import couectVue from "@/VueComponent/couectVue";
import CouectVue from "@/VueComponent/couectVue";
import PersonalInformationVue from "@/VueComponent/personalInformationVue";
export default {

  name: "Home",
  components: {PersonalInformationVue, CouectVue, ThumsVue},
  data(){
    return{
      showUser:[],
      drawer: false,
      thumbs:{},
      token:'',
      nickname:'',
      count: 2,
      input:'',
      games:[],
      icon:[1,2,3,6,7,8,9,10],
      user:{},
      UnreadCount:0,
      //whetherToPayAttention是否关注；whetherToCollect是否收藏；likeOrNot是否点赞
      titleList:[],
      recommendedUsers:[],
      //  whetherToPayAttention是否关注
    }

    //   token:'',
    //   count: 2,
    //   games:[],
    //   icon:[1,2,3,6,7,8,9,10],
    //   user:{username:"455",userImage:"非常666",personal:"简介",userId:2},
    //   UnreadCount:3,
    //   //whetherToPayAttention是否关注；whetherToCollect是否收藏；likeOrNot是否点赞
    //   titleList:[{title:{titleId:1,titleName:"vdsgfgfdr的封建时代发的时间方便vbdf",by3:8,releaseTime:"2022-11-22 00:00:00",commentCount:4, thumbsCount:98},
    //       user:{nickname:"ygmz",userImage:'1'},whetherToPayAttention:false,whetherToCollect:true,likeOrNot:false},
    //     {title:{titleId:2,titleName:"der",gameName:"和平暖暖",releaseTime:"2022-1-22 00:00:00",by3:8,commentCount:89, thumbsCount:8},
    //       user:{nickname:"广泛的",userImage:'4'},whetherToPayAttention:true,whetherToCollect:false,likeOrNot: true}],
    //   recommendedUsers:[{userId:5,nickname:"xli",personal:"功夫老爸",whetherToPayAttention:false}],
    // //  whetherToPayAttention是否关注

  },
  created() {
    this.user.userId=window.localStorage.getItem("userId");
    this.token=window.localStorage.getItem("token");
    this.user.nickname=window.localStorage.getItem("nickname");
    this.user.userImage=window.localStorage.getItem("userImage");
    this.user.personal=window.localStorage.getItem("personal");
    this.loadingGame()
    this.loadingTitle()
    this.loadingRecommendedUsers()
  //  加载信息
    this.$axios.get("http://localhost:8090/notice/loadNotification?userId="+this.user.userId).then(res=>{
      this.UnreadCount=res.data.dataobject;
    })
  },
  methods: {
    titleOnLeaveTd(index){
//鼠标离开titleUserId的事件。
      this.showUser[index]=false;
      alert("离开"+index+this.showUser[index])
    },
    titleOnEnterTd(index){
//鼠标进入titleUserId的事件。

      this.showUser[index]=true;
      alert("进入"+index+this.showUser[index])
    },
    couect(titleId,whetherToCollect,index){
      //          当前登录用户                帖子id            0约定为点赞类型为帖子
      // alert(titleId+"    "+this.titleList[index].likeOrNot+"   "+index)
      if(whetherToCollect==0||whetherToCollect==null){
        this.titleList[index].whetherToCollect=1;
      }else{
        this.titleList[index].whetherToCollect=0;
      }

      var couect={userId:this.user.userId,titleId:titleId}
      console.log(couect)
      this.$axios.post("http://localhost:8090/couect/favoriteEvents",couect).then(res=>{
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'success'
        });
      })

    },

    thums(titleId,likeOrNot,index){
      //          当前登录用户                帖子id            0约定为点赞类型为帖子
      // alert(titleId+"    "+this.titleList[index].likeOrNot+"   "+index)
      if(likeOrNot==0||likeOrNot==null){
        this.titleList[index].likeOrNot=1;
        this.titleList[index].title.thumbsCount++;
      }else{
        this.titleList[index].likeOrNot=0;
        this.titleList[index].title.thumbsCount--;
      }
      console.log(this.titleList[index])
      this.thumbs={userId:this.user.userId,bethumbsId:titleId,bethumbsTypeId:0}
      this.$axios.post("http://localhost:8090/thumbs/addThumbs",this.thumbs).then(res=>{
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'success'
        });
      })

    },
    // likeEvent(){
    //   this.$axios.get("").then(res=>{})
    // },
    gameType(gameId){
      this.$axios.get("http://localhost:8090/show/showTitles?userId="+this.user.userId+"&gameId="+gameId).then(res=>{
        this.titleList=res.data.dataobject;
        // console.log("帖子：---------------------------------")
        // console.log(this.titleList)
      }).catch(err=>console.log("读取帖子出错"+err))
    },
    loadingGame(){
      this.$axios.get("http://localhost:8090/show/showAllGame").then(res=>{
        this.games=res.data.dataobject;
        console.log("游戏：")
        console.log(this.games)
      }).catch(err=>console.log("读取游戏出错"+err))
    },
    loadingRecommendedUsers(){
      this.$axios.get("http://localhost:8090/show/showRecommendedUsers?userId="+this.user.userId).then(res=>{
        this.recommendedUsers=res.data.dataobject;
        console.log("推荐用户：-------------------------------")
        console.log(this.recommendedUsers)
      }).catch(err=>console.log("读取推荐用户出错"+err))
    },
    loadingTitle(){
      this.$axios.get("http://localhost:8090/show/showTitles?userId="+this.user.userId+"&gameId="+1).then(res=>{
        this.titleList=res.data.dataobject;
        console.log("帖子：---------------------------------")
        console.log(this.titleList)
      }).catch(err=>console.log("读取帖子出错"+err))
    },
    wzry(){
      alert("fdsbgry")
    },
    load(){
      // this.count+=3
      // alert("++")
      // this.titleList[this.count++]=this.titleList[0]
      // console.log(this.titleList)
      // this.titleList[this.titleList.length+1]=this.titleList[1]
    },
  },
  computed:{
    backIndex(){
      return {
        'urlda':'url(D:\\userImage\\icon\\1.png)'
      }
    }
  }
}
</script>

<style scoped>

.backclass div{
  margin-top: 15px;
  opacity: 0.8;
}


.dzplC{
  /*background-color: red;*/
  float: right;
  margin-right: 30px;
}
.dzpl{
  float: right;
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.circleImg{
  /*  头像*/
  border-radius: 30px;
  width: 60px;
  height: 60px;
}
.attention1{
  /*关注按钮*/
  border-radius: 5px;
  width: 20px;
  height: 20px;
  margin-left: -30px;
  /*margin-top: 0px;*/
}

.circleImg1{
  /*  右上头像*/
  border-radius: 30px;
  width: 40px;
  height: 40px;
}
/*ul{*/
/*  list-style: none;*/
/*  display: flex;*/
/*  float: right;*/
/*}*/
/*li{*/
/*  margin-right: 50px;*/
/*  margin-top: 5px;*/
/*}*/
.d_div{
  /*list-style: none;*/
  /*display: flex;*/
  /*background-color: red;*/
  float: left;
  width: 300px;
  margin-left: 30px;
}
</style>
<!--


-->