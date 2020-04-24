<template>
  <div class="header">
    <div>
      <div class="logo">
        <h1>后台管理系统</h1>
      </div>
      <div class="header-right">
        <!-- <p>欢迎登陆</p> -->
        <div class="user-avator">
          <img src="../../assets/img/avatar1.jpg" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  position: fixed;
     width: 100%;
      background-image: linear-gradient(to right, #C10EEE, #E7797A);
 
  z-index: 100;
}
.header > div {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 60px;
  align-items: center;
}
.logo {
  color: wheat;
  line-height: 100%;
}
.header-right {
  display: flex;
  align-items: center;
}
.user-avator {
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
img {
  height: 100%;
}
</style>