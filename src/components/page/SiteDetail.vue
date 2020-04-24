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
          <h1>数据库配置</h1>
          <div>
            <el-button
              type="primary"
              icon="el-icon-user"
              size="small"
              plain
              @click="showUserInfo"
            >查看用户</el-button>
            <!-- <el-button type="primary">获取文章</el-button> -->
            <el-button type="primary" icon="el-icon-tickets" size="small" plain  @click="showArticalList">获取文章</el-button>
          </div>
        </div>

        <div class="formFormat">
          <el-form-item label="id" prop="id">
            <el-input v-model="siteDetail.Id"></el-input>
          </el-form-item>
          <el-form-item label="网站" prop="Url">
            <el-input v-model="siteDetail.Url"></el-input>
          </el-form-item>
          <el-form-item label="是否可以注册" prop="Register">
            <el-input v-model="siteDetail.Register"></el-input>
          </el-form-item>
          <el-form-item label="是否可以发送文章" prop="Article">
            <el-input v-model="siteDetail.Article"></el-input>
          </el-form-item>
          <el-form-item label="是否需要翻墙" prop="Vnp">
            <el-input v-model="siteDetail.Vnp"></el-input>
          </el-form-item>
          <el-form-item label="是否需要邮箱验证" prop="EmailVerify">
            <el-input v-model="siteDetail.EmailVerify"></el-input>
          </el-form-item>
          <el-form-item label="是否需要谷歌验证" prop="GoogleVerify">
            <el-input v-model="siteDetail.GoogleVerify"></el-input>
          </el-form-item>
          <el-form-item label="是否可以丢弃" prop="Disposable">
            <el-input v-model="siteDetail.Disposable"></el-input>
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
            <el-input v-model="siteDetail.Status"></el-input>
          </el-form-item>
        </div>
      </el-card>

      <div class="topDistant">
        <el-button type="primary" @click="submitForm('siteDetail')" plain>更新</el-button>
        <!-- <el-button @click="resetForm('siteDetail')">重置</el-button> -->
        <el-button @click="open" type="danger" plain>删除该网站</el-button>
      </div>
    </el-form>
    <!--  用户信息弹窗 -->
    <el-dialog title="用户列表" :visible.sync="dialogTableVisible" >
      <el-table :data="userList"  height="450">
        <el-table-column property="Id" label="Id" width="150"></el-table-column>
        <el-table-column property="Username" label="用户名"></el-table-column>

        <el-table-column property="Mail" label="邮箱" width="200"></el-table-column>
        <el-table-column property="Password" label="密码"></el-table-column>
        <el-table-column property="Status" label="状态"></el-table-column>
      </el-table>
    </el-dialog>


<!-- 文章列表弹窗 -->
   <el-dialog title="文章列表" :visible.sync="dialogFormVisible" >
      <el-table :data="articalList"  height="450">
        <el-table-column property="Id" label="Id" width="150"></el-table-column>
        <el-table-column property="Keyword" label="文章"></el-table-column>

        <el-table-column property="Url" label="地址" width="200"></el-table-column>
     
      </el-table>
    </el-dialog>
  
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
      siteDetail: {},
      Id: "",
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
      },
      userList: [],
      dialogTableVisible: false,
      dialogFormVisible:  false,
      articalList: []
    };
  },

  mounted() {
    console.log(this.$route.query.id);
    // var params = this.$route.params.id;
    this.Id = this.$route.query.id;
    //    this.$api.getWebsiteId(this.$route.params.id).then(res=>console.log(res)
    //     )
    this.$axios
      .get("http://192.168.31.234:8080/v2/website_use/" + this.Id)
      .then(res => {
        this.siteDetail = res.data;
        console.log(res.data);
      });
  },
  methods: {
    showUserInfo() {
      this.$axios
        .get("http://192.168.31.234:8080/v2/article/user/1")
        .then(res => {
          console.log(res);
          this.articalList = res.data.data;
        });
        this.dialogTableVisible = true
    },
    showArticalList(){
       this.$axios
        .get("http://192.168.31.234:8080/v2/article/article/1")
        .then(res => {
          console.log(res);
          this.articalList = res.data.data;
        });
        this.dialogFormVisible = true
    },
    open() {
      this.$confirm("此操作将永久删除该网站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 暂未调用删除接口
          // this.$axios.delete("http://192.168.31.234:8080/v2/website_use",{this.$route.params.id}).then(data=>console.log(data)
          // )
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$router.go(-1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // console.log(this.siteDetail);
          this.$axios
            .put(
              "http://192.168.31.234:8080/v2/website_use/" + this.Id,
              this.siteDetail
            )
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
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style>
.row {
  display: flex;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

</style>