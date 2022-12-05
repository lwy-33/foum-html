<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <div style="display: flex">
              <div style="margin-top: 24px"><img src="../images/admin-logo-pc.png" style="margin-right: 20px"></div>
              <div style="margin-top: 15px">
                <el-input placeholder="请输入关键字" style="width: 300px;margin-right: 15px;"></el-input>
                <el-button round size="small" style="margin-right: 15px" type="primary">搜索</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <ul>
              <li><el-link type="primary"><i class="el-icon-s-home"></i>首页</el-link></li>
              <li><el-link type="primary"><i class="el-icon-message"></i>消息</el-link></li>
              <li><el-link type="primary"><i class="el-icon-s-operation"></i>发现</el-link></li>
              <el-button type="primary" >登录</el-button>
            </ul>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Top",
}
</script>

<style scoped>
ul{
  list-style: none;
  display: flex;
  float: right;
}
li{
  margin-right: 50px;
  margin-top: 5px;
}
</style>