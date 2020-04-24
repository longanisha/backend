<template>
  <div class="setting">
    <el-form
      :model="list"
      status-icon
      :rules="rules"
      ref="list"
      label-width="180px"
      class="demo-list"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>数据库配置</h2>
        </div>
        <div class="formFormat">
          <el-form-item label="数据库名称" prop="sql_database">
            <el-input v-model="list.sql_database"></el-input>
          </el-form-item>
          <el-form-item label="数据库host" prop="sql_host">
            <el-input v-model="list.sql_host"></el-input>
          </el-form-item>
          <el-form-item label="数据库密码" prop="sql_pass">
            <el-input v-model="list.sql_pass"></el-input>
          </el-form-item>
          <el-form-item label="数据库端口" prop="sql_port">
            <el-input v-model="list.sql_port"></el-input>
          </el-form-item>
          <el-form-item label="数据库账号" prop="sql_user">
            <el-input v-model="list.sql_user"></el-input>
          </el-form-item>
          <el-form-item label="延迟时间" prop="timeout">
            <el-input v-model="list.timeout"></el-input>
          </el-form-item>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>验证配置</h2>
        </div>

          <div class="formFormat"> <el-form-item class="inputStyle" label="打码平台:普通打码key" prop="verify_key1" size="medium">
          <el-input v-model="list.verify_key1"></el-input>
        </el-form-item>
        <el-form-item label="打码平台:谷歌验证key" prop="verify_key2">
          <el-input v-model="list.verify_key2"></el-input>
        </el-form-item>
        <el-form-item label="打码平台:普通打码Url" prop="verify_url1">
          <el-input v-model="list.verify_url1"></el-input>
        </el-form-item>
        <el-form-item label="打码平台:谷歌验证Url" prop="verify_url2">
          <el-input v-model="list.verify_url2"></el-input>
        </el-form-item> </div>
       
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>其他配置</h2>
        </div>

         <div class="formFormat">
 <el-form-item label="等待email发送间隔" prop="email_interval_time">
          <el-input v-model="list.email_interval_time"></el-input>
        </el-form-item>
        <el-form-item label="等待email发送时间" prop="email_time">
          <el-input v-model="list.email_time"></el-input>
        </el-form-item>
        <el-form-item label="最多连续错误次数" prop="err_count">
          <el-input v-model.number="list.err_count"></el-input>
        </el-form-item>
        <el-form-item label="代理最多错误次数" prop="proxy_err_count">
          <el-input v-model.number="list.proxy_err_count"></el-input>
        </el-form-item>
        <el-form-item label="发送状态间隔秒数" prop="send_status">
          <el-input v-model="list.send_status"></el-input>
        </el-form-item>
        <el-form-item label="数量不可达到cpu百分比" prop="cpu_max">
          <el-input v-model="list.cpu_max"></el-input>
        </el-form-item>
        <el-form-item label="数量不可达到内存百分比" prop="ram_max">
          <el-input v-model="list.ram_max"></el-input>
        </el-form-item>
        <el-form-item label="线程数量" prop="thread_count" type="number">
          <el-input v-model.number="list.thread_count"></el-input>
        </el-form-item>

         </div>
       
      </el-card>
      <el-form-item>
        <el-button type="primary" @click="submitForm('list')" plain>提交</el-button>
        <el-button @click="resetForm('list')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmptty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      } else {
        callback();
      }
    };
    return {
      list: {},
      // list: {

      //   email_interval_time: 1,
      //   email_time: 60,
      //   err_count: 30,
      //   proxy_err_count: 30,
      //   send_status: 10,
      //   sql_database: "web2",
      //   sql_host: "cdb-hb4r7l0i.bj.tencentcdb.com",
      //   sql_pass: "W46j_EmFFMXBDF",
      //   sql_port: "10000",
      //   sql_user: "root",
      //   timeout: 30,
      //   verify_key1: "qwfffffff888",
      //   verify_key2: "cb02438b4c9a94f746aa7bbd9477a834",
      //   verify_url1: "http://89.248.174.24",
      //   verify_url2: "https://2captcha.com",
      //   cpu_max: 50,
      //   ram_max: 50,
      //   thread_count: 1
      // },
      rules: {
        email_interval_time: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        email_time: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        err_count: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        proxy_err_count: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        send_status: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        sql_database: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        sql_host: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        sql_pass: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        sql_port: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        sql_user: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        timeout: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        verify_key1: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        verify_key2: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        verify_url1: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        verify_url2: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        cpu_max: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        ram_max: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        thread_count: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.$axios.get("http://192.168.31.234:8080/v1/get/config/").then(res => {
      this.list = res.data;
    });
    //  this.$api.getSql().then((res)=>{
    //         console.log(res);

    //       })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // console.log(this.list);
          this.$axios
            .post("http://192.168.31.234:8080/v2/config", this.list)
            .then(res => {
              console.log(res);
            });
          // var a = JSON.stringify(this.list)
          // this.$api.submitSetting(this.list).then(res=>console.log(res)
          // )
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.setting {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.demo-dynamic {
  width: 100%;
}
.demo-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-card {
  margin-bottom: 20px;
  width: 80%;
}
.text {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>