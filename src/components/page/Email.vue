<template>
  <div class="emailContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>
          邮箱设置时间:
          <span>{{emailList.CreateTime}}</span>
        </h3>
        <h3>
          邮箱数量:
          <span>{{num}}</span>
        </h3>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 15}"
        placeholder="请输入内容"
        v-model="emailList.OneList"
      
        value="textarea"
      ></el-input>
      <el-button type="primary" size="mini " class="submitEmails" @click="submitEmails">递交</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      emailList: "",
      num: ""
    };
  },
  mounted() {
    this.$api.getEmailList().then(res => {
      console.log(res);

      this.emailList = res;
      // this.emailList.OneList = this.emailList.OneList.toString();

      this.num = res.OneListLen;
     
    });
  },
  methods: {
 
    submitEmails() {
      // this.emailList.OneList = this.emailList.OneList.split(",")
      console.log(this.emailList.OneList);
      this.$axios
        .post(
          "http://192.168.31.234:8080/v2/config/email/",
          this.emailList.OneList
        )
        .then(res => console.log(res));
    }
  }
};
</script>

<style scoped>
.emailContainer {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  display: flex;
  justify-content: space-around;
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 60%;
  /* height: 500px; */
}
.submitEmails {
  margin: 20px auto;
}
</style>