<template>
  <div>
    <el-container style=" border: 1px solid #eee; height: 100vh">
      <el-header style="background-color: rgb(48,65,86);height: 70px">
        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="12">
              <div style="display: flex">
                <div style="margin-top: 15px;font-size: larger;margin-right: 50px" ><p style="color: white">游戏论坛后台管理系统</p></div>
                <div style="margin-top: 15px;font-size: larger;" ><p>
                  <el-page-header style="color: #409EFF" @back="goBack">
                  </el-page-header>
                </p></div>
                <div style="margin-top: 15px;font-size: larger;" ><p> <el-link type="primary" @click="goReception">前台</el-link></p></div>
              </div>
            </el-col>
            <el-col :span="12">
              <ul class="_ul">
                <li><el-link type="primary"><i class="el-icon-s-home"></i>首页</el-link></li>
                <li>
                  <el-link type="primary">
                    <el-badge :value="10" class="el-icon-message">
                    </el-badge>
                  </el-link>
                </li>
                <li>
                  <el-link type="primary">
                    <el-badge :value="12" class="el-icon-bell">
                    </el-badge>
                  </el-link>
                </li>
<!--                <li><el-link type="primary"><i class="el-icon-user-solid"></i>:admin</el-link></li>-->
                <li><el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-user-solid"></i>  admin<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-header>
      </el-header>
      <el-container>
        <el-aside style="background-color: rgb(238, 241, 246)" width="220px">
          <el-menu
              :default-openeds="['1', '3']"
              active-text-color="#ffd04b" background-color="rgb(48,65,86)"
              style="height: 100%; "
              text-color="#fff"
              @select="menuItemClick">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user"></i>用户管理</template>
              <el-menu-item index="/userManager">用户管理</el-menu-item>
              <el-menu-item index="/adminManager">管理员管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>游戏类别管理</template>
                <el-menu-item index="/gameType">游戏类别</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-mobile"></i>游戏信息管理</template>
                <el-menu-item index="/game">游戏信息</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-document"></i>帖子管理</template>
              <el-menu-item index="4-1">帖子管理</el-menu-item>
              <el-menu-item index="4-2">最新帖子</el-menu-item>
              <el-menu-item index="4-3">最热帖子</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-chat-line-round"></i>评论管理</template>
              <el-menu-item index="5-1">评论管理</el-menu-item>
              <el-menu-item index="5-2">评论统计</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-message-solid"></i>通知管理</template>
              <el-menu-item index="6-1">通知管理</el-menu-item>
              <el-menu-item index="6-2">发布通知</el-menu-item>
            </el-submenu>
            <el-menu-item><i class="el-icon-star-on"></i>收藏夹</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


export default {
  name: "AdminHome",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goBack() {
      console.log('go back');
      this.$router.push({name:'Login'})
    },
    goReception(){
      this.$router.push({name:'Home'})
    },
    menuItemClick(index){
      this.$router.push(index);
    }
  },
}
</script>

<style scoped>
._ul{
  list-style: none;
  display: flex;
  float: right;
}
li{
  margin-right: 50px;
  margin-top: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>