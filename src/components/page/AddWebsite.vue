<template>
  <div class="setting">
    <el-form
      :model="siteDetail"
      status-icon
      :rules="rules"
      ref="siteDetail"
      label-width="150px"
      class="demo-siteDetail"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>添加网站</h2>
        </div>
        <div class="formFormat">
          <el-form-item label="网站" prop="Url">
            <el-input v-model="siteDetail.Url"></el-input>
          </el-form-item>
          <el-form-item label="是否可以注册" prop="Register">
            <el-select v-model="siteDetail.Register" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
            <!-- <el-input v-model="siteDetail.Register"></el-input> -->
          </el-form-item>
          <el-form-item label="是否可以发送文章" prop="Article">
            <el-select v-model="siteDetail.Article" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
            <!-- <el-input v-model="siteDetail.Article"></el-input> -->
          </el-form-item>
          <el-form-item label="是否需要翻墙" prop="Vnp">
            <!-- <el-input v-model="siteDetail.Vnp"></el-input> -->
            <el-select v-model="siteDetail.Vnp" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要邮箱验证" prop="EmailVerify">
            <!-- <el-input v-model="siteDetail.EmailVerify"></el-input> -->
            <el-select v-model="siteDetail.EmailVerify" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要谷歌验证" prop="GoogleVerify">
            <!-- <el-input v-model="siteDetail.GoogleVerify"></el-input> -->
            <el-select v-model="siteDetail.GoogleVerify" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否可以丢弃" prop="Disposable">
            <!-- <el-input v-model="siteDetail.Disposable"></el-input> -->
            <el-select v-model="siteDetail.Disposable" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" prop="SiteExplain">
            <el-input v-model="siteDetail.SiteExplain"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="CreateTime">
            <el-input v-model="siteDetail.CreateTime"></el-input>
          </el-form-item>
          <el-form-item label="数据库字段名" prop="ChartName">
            <el-input v-model="siteDetail.ChartName"></el-input>
          </el-form-item>
          <el-form-item label="是否可用" prop="Status">
            <!-- <el-input v-model="siteDetail.Status"></el-input> -->
            <el-select v-model="siteDetail.Status" placeholder="请选择" class="inputSeletion">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-card>
      <div class="topDistant">
        <el-button type="primary" @click="submitForm('siteDetail')" plain>添加</el-button>
        <el-button @click="resetForm('siteDetail')" plain>重置</el-button>
      </div>
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
      siteDetail: {
        Url: "",
        Register: "",
        Article: "",
        Vpn: "",
        EmailVerify: "",
        GoogleVerify: "",
        Disposable: "",
        SiteExplain: "",
        CreateTime: "",
        ChartName: "",
        Status: ""
      },

      rules: {
        Id: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        Url: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        Register: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        Article: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        Vnp: [{ required: true, validator: checkEmptty, trigger: "blur" }],
        EmailVerify: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        GoogleVerify: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        Disposable: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        SiteExplain: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        CreateTime: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        ChartName: [
          { required: true, validator: checkEmptty, trigger: "blur" }
        ],
        Status: [{ required: true, validator: checkEmptty, trigger: "blur" }],
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
    // this.$axios
    //   .post("http://192.168.31.234:8080/v2/website_use")
    //   .then(res => {
    //     this.siteDetail = res.data;
    //     console.log(res.data);
    //   });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // console.log(this.siteDetail);
          this.$axios
            .post("http://192.168.31.234:8080/v2/website_use/", this.siteDetail)
            .then(res => {
              console.log(res);
            });
          // var a = JSON.stringify(this.siteDetail)
          // this.$api.submitSetting(this.siteDetail).then(res=>console.log(res)
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

<style>
.row {
  display: flex;
}
</style>