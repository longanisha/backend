<template>

<el-container class="mainContainer">
  <el-header><v-header></v-header></el-header>
  <el-container>
    <el-aside width="255px"> <v-sidebar></v-sidebar></el-aside>
    <el-container >
      <el-main > <transition name="move" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition></el-main>
      
    </el-container>
  </el-container>
</el-container>

</template>

<script>
import vHeader from "./Header";
import vSidebar from "./Sidebar";
export default {
  data() {
    return {};
  },
  components: {
    vHeader,
    vSidebar
  }
};
</script>

<style scoped>
 .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
   
  }
  
  .el-main {
    color: #333;
    text-align: center;
    
    /* line-height: 160px; */
  }
  /* .mainContainer {
    background-color: #EAF2F5;

  } */
  body > .el-container {
    margin-bottom: 40px;
   
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
/* .wrapper {
    display: flex;
    flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.container {
    display: flex;
    flex: 1;
    margin-top: 60px;
}
.content {
      flex: 1;
  width: auto;
  height: 100%;
  padding: 10px;
  margin-left: 250px;

  box-sizing: border-box;
} */
</style>