<template>
 <Top></Top>
</template>

<script>
import Top from "@/components/Top";

export default {
  name: "Home",
 data(){
    return{

    }
 },
  components:{
    Top
  }
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