<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <el-col :sm="24" :md="16"><img src="./assets/banner.png" alt="" style="width:100%"></el-col>
    </el-row>
    <router-view/>
    <div class="foot">
      <el-divider></el-divider>
      <span>2020年11月26-29日</span><br>
      <span>浦东新国际博览中心</span>
    </div>
  </div>
</template>

<style>
body{
  margin:0px;
  padding:0px;
  background:black;
}
#app {
  height:100%;
  touch-action:pan-y;
  background-color:black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  
}
.foot{
  width:80%;
  margin:50px auto 0px auto;
  padding-bottom:50px;
}
</style>
