<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="3"><div class="grid-content bg-purple">
        <i><img src=""></i>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <p>{{}}</p>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        回复<p>{{}}</p>
      </div></el-col>
      <el-col :span="15"><div class="grid-content bg-purple">

      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "commentVue"
}
</script>

<style scoped>

</style>