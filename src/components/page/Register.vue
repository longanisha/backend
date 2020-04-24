<template>
  <div class="register">
    <div class="header">
      <!-- <div class="funcChoose">
     

        <el-checkbox label="需要翻墙" @change="needVpn()" v-model="needVPN"></el-checkbox>
        <el-checkbox label="需要邮箱验证" @change="needEmail()" v-model="needEmails"></el-checkbox>
        <el-checkbox label="需要谷歌验证" @change="needGoogleVerify()" v-model="needGoogle"></el-checkbox>
        <el-checkbox label="可以丢弃" @change="needDis()" v-model="Disposable"></el-checkbox>
      </div>-->
      <div class="searchBar">
        <el-checkbox v-model="checked" @change="handleSearch">是否精确查找</el-checkbox>
        <el-input
          class="searchInput"
          v-model="search"
          @input="changeSqlList"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </div>
      <div class="searchBar">
        <router-link :to="'addWebsite'">
          <el-button icon="el-icon-circle-plus" size="mini" class="btnStyle">添加</el-button>
        </router-link>
      </div>
    </div>

    <el-table
      :data="searchList"
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="网址">
        <template slot-scope="scope">
          <p class="jumpToDetail" @click="handleEdit(scope.$index, scope.row)">{{ scope.row.Url}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="SiteExplain" label="网站名"></el-table-column>
      <el-table-column prop="CreateTime" sortable label="创建时间"></el-table-column>
      <!-- 进程控制 -->
      <!-- <el-table-column>
        <template slot="header" slot-scope="scope">
          <span>请输入总进程</span>
          <el-input
            size="mini"
            @input="allProcessNum"
            v-model.number="allProcess"
            placeholder="统一控制进程数量"
          />
        </template>
        <template slot-scope="scope">
          <el-input
            size="mini"
            @input="processesNum(scope.$index, scope.row)"
            v-model.number="scope.row.lines"
            placeholder="修改单独进程数量"
          />
        </template>
      </el-table-column>-->

      <!-- 线程控制 -->
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <div>
            <span>请输入总数量</span>

            <el-input
              size="mini"
              @input="allThreadsNum"
              v-model.number="allThreads"
              placeholder="请输入总数量"
             class="inputSize"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <el-input
            size="mini"
            @input="threadsNum(scope.$index, scope.row)"
            v-model.number="scope.row.threads"
            placeholder="修改单独进程数量"
            class="inputSize"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checked" @change="handleSearch">是否精确查找</el-checkbox>
          <el-input v-model="search" @input="changeSqlList" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>

          <el-button type="danger" @click="dialogVisible = true" size="mini">删除</el-button>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>请问是否删除该网站</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteRow(scope.$index, siteList)">确 定</el-button>
            </span>
          </el-dialog>

        </template>
      </el-table-column>-->
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="seletedWebsites()" size="mini">递交网站</el-button>

      <el-popover placement="top" width="160" v-model="visible" size="mini">
        <p>是否确定删除所选网站</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="deletedWebsites()">确定</el-button>
        </div>
        <el-button slot="reference" type="danger" size="mini" plain>删除选中网站</el-button>
      </el-popover>

      <!-- <el-button @click="deletedWebsites()" type="danger">删除选中网站</el-button> -->
      <el-button type="primary" size="mini" class="btnStyle" @click="seleteAllWebsites()">全选{{numberOfWebsites}}个网站</el-button>
      <el-button @click="toggleSelection()" size="mini" plain>取消选择</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 2000]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="numberOfWebsites"
    ></el-pagination>

    <el-dialog title="提示" :visible.sync="showHint" width="30%" :before-close="handleClose">
      <div ref="hint">
        亲!全部成功的情况下,本次启动至少需要
        <font color="#FF0000">{{hints}}</font> 个邮箱.
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showHint = false">取 消</el-button>
        <!-- <router-link to="/start" @click.native="showHint = false"> -->
        <el-button type="primary" @click="showHint = false;requestEmail=true">下一步</el-button>
        <!-- </router-link> -->
      </span>
    </el-dialog>
    <el-dialog title="输入邮箱" :visible.sync="requestEmail" :before-close="handleClose">
      <span>请问是否再次设置邮箱？</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="startTask">取 消</el-button>
        <el-button type="primary" @click="inputEmails= true">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="输入邮箱" :visible.sync="inputEmails" :before-close="handleClose">
      <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="textarea"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="startTask">取 消</el-button>
        <el-button type="primary" @click="startTaskAndChangeEmail">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// const cityOptions = ["需要翻墙", "需要邮箱验证", "需要谷歌验证", "可以丢弃"];

Array.prototype.removeByValue = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};
export default {
  data() {
    return {
      input: "",

      checkAll: false,
      checkedCities: [],

      isIndeterminate: true,
      siteList: [],
      search: "",
      multipleSelection: [],
      checked: false,
      searchList: [],

      allThreads: "",
      singlePRocess: 3,
      currentPage4: 1,
      totalWebsite: "",
      limits: "",
      pages: "",
      visible: false,
      dialogVisible: false,
      needVPN: false,
      needEmails: false,
      needGoogle: false,

      Disposable: false,

      checkList: [],
      verifyFilter: [],
      threads: 1,

      Projects: {},
      hints: "",
      showHint: false,
      inputEmails: false,
      textarea: "",
      numberOfWebsites: 0,
      allProcess: "",
      lines: "",
      requestEmail: false
    };
  },
  watch: {
    allProcess(val) {
      this.lines = this.allProcess;
    }
  },

  methods: {
// 全选所有网站
seleteAllWebsites(){
  this.$refs.multipleTable.selection
  console.log( this.$refs.multipleTable.selection);
  
},


    //  开启任务
    startTask() {
      this.requestEmail = false;
      this.inputEmails = false;

      this.$axios
        .post("http://192.168.31.234:8080/v2/start/", this.Projects)
        .then(res => console.log(res));
      this.$message({
        message: "恭喜你，已经递交成功",
        type: "success"
      });
    },
    startTaskAndChangeEmail() {
      this.requestEmail = false;
      this.inputEmails = false;
      if (this.textarea) {
        this.$axios
          .post("http://192.168.31.234:8080/v2/config/email/", this.textarea)
          .then(res => console.log(res));
        this.$axios
          .post("http://192.168.31.234:8080/v2/start/", this.Projects)
          .then(res => console.log(res));
      } else {
        this.$axios
          .post("http://192.168.31.234:8080/v2/start/", this.Projects)
          .then(res => console.log(res));
      }
      this.$message({
        message: "恭喜你，已经递交成功",
        type: "success"
      });
    },
    // 翻墙筛选
    // needVpn() {
    //   this.needVPN != this.needVPN;

    //   if (this.needVPN) {
    //     this.verifyFilter.push("Vpn:''");

    //     // this.$api.getWebsites(this.verifyFilter).then(res => console.log(res));
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         console.log(res);
    //         this.searchList = res.data.data;

    //         this.numberOfWebsites = res.data.length;
    //       });
    //   } else {
    //     this.verifyFilter.removeByValue("Vpn:''");
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   }
    // },
    // // 需要邮箱验证
    // needEmail() {
    //   this.needEmails != this.needEmails;

    //   if (this.needEmails) {
    //     this.verifyFilter.push("EmailVerify:1");

    //     // this.$api.getWebsites(this.verifyFilter).then(res => console.log(res));
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   } else {
    //     this.verifyFilter.removeByValue("EmailVerify:1");
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   }
    // },
    // needGoogleVerify() {
    //   this.needGoogle != this.needGoogle;

    //   if (this.needGoogle) {
    //     this.verifyFilter.push("GoogleVerify:1");

    //     // this.$api.getWebsites(this.verifyFilter).then(res => console.log(res));
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   } else {
    //     this.verifyFilter.removeByValue("GoogleVerify:1");
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   }
    // },
    // needDis() {
    //   this.Disposable != this.Disposable;

    //   this.allProcess = "";
    //   if (this.Disposable) {
    //     this.verifyFilter.push("Disposable:0");

    //     // this.$api.getWebsites(this.verifyFilter).then(res => console.log(res));
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         console.log(res);

    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;

    //         // var webs = res.data;
    //         // console.log(res.data);
    //         // this.numberOfWebsites = res.data.length;
    //         // for (let i in webs) {
    //         //   // console.log(webs[i]);
    //         //   webs[i].lines = "";
    //         //   webs[i].threads = "";
    //         // }
    //         // this.siteList = webs;

    //         // this.searchList = this.siteList;
    //       });
    //   } else {
    //     this.verifyFilter.removeByValue("Disposable:0");
    //     this.$axios
    //       .get(
    //         "http://192.168.31.234:8080/v2/website_use/?query=" +
    //           this.verifyFilter
    //       )
    //       .then(res => {
    //         this.searchList = res.data.data;
    //         this.numberOfWebsites = res.data.data.length;
    //       });
    //   }
    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // 控制每页显示数量
    handleSizeChange(val) {
      this.limits = val;
      this.$api.getPageLimit({ limit: val }).then(res => {
        this.searchList = res.data;
        // console.log(this.searchList);
      });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(val);
      var params = { limit: this.limits, offset: val - 1 };
      this.$api.getPageLimit(params).then(res => {
        this.searchList = res.data;

        // console.log(this.searchList);
      });
      // console.log(`当前页: ${val}`);
    },
    // 控制统一输入进程
    // allProcessNum(val) {
    //   console.log(val);
    //   // console.log(this.siteList);
    //   this.searchList.map(item => (item.lines = Number(val)));
    //   console.log(this.searchList);
    // },
    allThreadsNum(val) {
      console.log(this.searchList);

      this.searchList.map(item => (item.threads = Number(val)));
    },
    processesNum(index, row) {
      console.log(row);
    },
    threadsNum(index, row) {
      console.log(index, row);
    },
    deleteRow(index, rows) {
      this.dialogVisible = false;
      rows.splice(index, 1);
    },
    handleEdit(index, rows) {
      console.log(rows.Id);
      var id = rows.Id;
      this.$router.push({ path: `/webside-details/`, query: { id } });
      // window.location.reload();

      // location.reload()
      // this.$router.go(0);
    },
    //  精准查询动态渲染页面
    handleSearch() {
      this.checked != this.checked;
      if (this.checked) {
        this.exactSearch(this.search);
      } else {
        this.blurSearch(this.search);
      }
    },
    //准确查询函数
    exactSearch(val) {
      if (isNaN(val)) {
        this.searchList = this.siteList.filter(
          data =>
            !this.search ||
            data.SiteExplain.toLowerCase() == this.search.toLowerCase()
        );
      } else {
        this.searchList = this.siteList.filter(
          data => !this.search || this.search == data.Id
        );
      }
    },
    //模糊查询函数
    blurSearch(val) {
      if (isNaN(val)) {
        this.searchList = this.siteList.filter(
          data =>
            !this.search ||
            data.SiteExplain.toLowerCase().includes(
              this.search.toLowerCase()
            ) ||
            data.ChartName.toLowerCase().includes(this.search.toLowerCase()) ||
            data.Url.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.searchList = this.siteList.filter(
          data => !this.search || this.search == data.Id
        );
      }
    },
    //查询列表动态渲染
    changeSqlList(val) {
      // var ifNum = parseInt(val)
      // console.log(isNaN(val));

      if (this.checked) {
        this.exactSearch(val);
      } else {
        this.blurSearch(val);
      }
    },

    // handleCheckedCitiesChange(value) {
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.cities.length;
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.cities.length;
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      
    },
    seletedWebsites(rows) {
      var seletedSites = this.$refs.multipleTable.selection;

      console.log(isEmpty);
      if (seletedSites.length) {
        var isEmpty = seletedSites.every(
          item => item.lines != "" && item.threads != ""
        );
        if (isEmpty) {
          var list = seletedSites.map(item => {
            return {
              Id: item.Id,
              Types: 1,
              OpenNumber: 1,
              CountAll: item.threads
            };
          });
          this.Projects.Projects = list;
          console.log(this.Projects);
          this.$axios
            .post("http://192.168.31.234:8080/v2/start/hint/", this.Projects)
            .then(res => {
              console.log(res.data.emailCount);

              this.hints = res.data.emailCount;
              this.showHint = true;
            });

          // this.$api.openHint(this.Projects).then(res=>console.log(res)
          // )
        } else {
          this.$message.error("递交失败,请输入数量");
        }
      } else {
        this.$message.error("递交失败，您并未选中任何网站");
      }
    },
    deletedWebsites(rows) {
      //暂未调用删除接口
      var arr2 = this.siteList;
      var arr1 = this.$refs.multipleTable.selection;

      // this.$axios.delete("http://192.168.31.234:8080/v2/website_use",{2}).then(data=>console.log(data)
      // )

      this.searchList = arr2.filter(
        item => !arr1.some(ele => ele.Url === item.Url)
      );
      this.visible = false;
      console.log(this.searchList);
    }
  },
  mounted() {
    //   this.$axios.get("http://192.168.31.234:8080/v2/website_use?query=Register:1 ").then(res => {
    // console.log(res);

    // });
    this.$api.getWebsites({ Register: 1 }).then(res => {
      var webs = res.data;
      console.log(res);
      this.numberOfWebsites = res.count;
      for (let i in webs) {
        // console.log(webs[i]);
        // webs[i].lines = "";
        webs[i].threads = "";
      }
      this.siteList = webs;

      this.searchList = this.siteList;
    });
  },
  watch: {
    // '$route'(to, from) {
    //   this.$router.go(0);
    // }
  }
};
</script>

<style scoped>
.funcChoose {
  padding: 20px;
}
.jumpToDetail:hover {
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  /* background-color: aliceblue; */
}
.searchBar {
  display: flex;
  align-items: center;
}
.searchInput {
  margin-left: 20px;
}
.el-pagination {
  display: flex;
  /* justify-items: center; */
  justify-content: center;
  margin-top: 30px;
}
</style>