<template>
  <div class="taskDetails">
    <el-table :data="taskDetail" style="width: 100%">
      <el-table-column prop="Id" label="ID"></el-table-column>

      <el-table-column prop="AllCount" label="所有数量"></el-table-column>
      <el-table-column prop="CrateTime" label="创建时间"></el-table-column>
      <el-table-column label="结束时间">
        <template
          slot-scope="scope"
        >{{scope.row.EndTime=="0001-01-01T00:00:00Z"? "null":scope.row.EndTime}}</template>
      </el-table-column>
      <el-table-column prop="NowCount" label="现在数量"></el-table-column>

      <el-table-column prop="Status" label="状态">
        <template slot-scope="scope">
          <div class="dots" :style="{'backgroundColor':dotColor}"></div>
        
        </template>
      </el-table-column>
      <el-table-column prop="UpdateTime" label="更新时间"></el-table-column>
    </el-table>

    <div class="gap"></div>
    <div class="taskListTitl">
      <h2>任务列表</h2>
    </div>

    <el-table :data="websiteStateInfo" style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <el-button
            @click="getAllwebsiteState(scope.$index, scope.row)"
            type="text"
            size="small"
          >{{ scope.row.Id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="AllCount" label="所有数量"></el-table-column>

      <el-table-column prop="CrateTime" label="创建时间"></el-table-column>
      <el-table-column label="结束时间">
        <template
          slot-scope="scope"
        >{{scope.row.EndTime=="0001-01-01T00:00:00Z"? "null":scope.row.EndTime}}</template>
      </el-table-column>
      <el-table-column prop="ErrCode" label="错误码"></el-table-column>
      <el-table-column prop="ErrMsg" label="错误信息"></el-table-column>
      <el-table-column prop="FailedCount" label="失败账号"></el-table-column>
      <el-table-column prop="NowCount" label="现在数量"></el-table-column>

      
      <el-table-column prop="Status" label="状态">
        <template slot-scope="scope">
         
             <div class="dots" :style="{'backgroundColor':scope.row.Status}"></div>
            <!-- <li class="dotStatus" :style="{'backgroundColor':scope.row.status}"></li> -->
       
        </template>
      </el-table-column>
      <el-table-column prop="SuccessCount" label="成功账号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :style="{'visibility':stopTask?'hidden':'visible'}"
            @click="handleStop(scope.$index, scope.row)"
          >停止</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="Uuid" label="唯一ID"></el-table-column> -->
      <!-- <el-table-column prop="WebsiteStateId" label="网站状态ID"></el-table-column> -->
    </el-table>

    <el-dialog title="	状态列表" :visible.sync="dialogTableVisible" width="80%">
      <p>过期时间：{{taskList.ExpirationTime}}</p>
      <p>最后接收数据时间：{{taskList.LastTime}}</p>
      <el-table :data="postList">
        <el-table-column prop="all_count" label="所有数量"></el-table-column>
        <el-table-column prop="err_code" label="错误码"></el-table-column>
        <el-table-column prop="err_msg" label="错误信息"></el-table-column>
        <el-table-column prop="failed_count" label="失败数量"></el-table-column>
        <el-table-column prop="now_count" label="	正在进行任务数量"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <div class="dots" :style="{'backgroundColor':scope.row.status}"></div>
          </template>
        </el-table-column>
        <el-table-column prop="success_count" label="成功数量"></el-table-column>
        <!-- <el-table-column prop="uuid" la
        bel="Uuid"></el-table-column>-->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDetail: [],
      websiteStateInfo: [],
      dotStatus: "",
      postListDotStatus: [],
      dotColor: "",
      Uuid: "",
      postList: [],
      taskList: [],
      dialogTableVisible: false,
      stopTask: false
    };
  },
  methods: {
    getAllwebsiteState(index, row) {
      var params = row.Id;
      this.dialogTableVisible = true;
      console.log(this.dialogTableVisible);

      this.$axios
        .get("http://192.168.31.234:8080/v2/website_state_info/" + params)
        .then(res => {
          this.Uuid = res.data.Uuid;
        });
      this.$axios
        // .get("http://192.168.31.234:8080/v2/start/first_uuid/" + this.Uuid)
        .get(
          "http://192.168.31.234:8080/v2/start/first_uuid/ac8fc86e-f970-46fd-88e1-cb5e4e3338b9"
        )
        .then(res => {
          // this.taskList = res.data;
          this.postList = res.data.PostList;
          console.log(res.data.PostList);
          this.postList.map(item=>{
            switch (item.status) {
          case "1":
            item.status = "#2EFFFC";
            break;
          case "2":
            item.status = "#FEB880";
            break;
          case "3":
            item.status = "#FEB880";
        }
          })
       
          
        });
    },
    handleStop(index, row) {
      console.log(row.Uuid);
      this.stopTask = !this.stopTask;
      console.log(this.stopTask);

      this.$axios
        .get("http://192.168.31.234:8080/v2/start/stop/" + row.Uuid)
        .then(res => {
          console.log(res);
        });
      this.$message({
        message: "任务已经停止",
        type: "success"
      });
    }
  },
  mounted() {
    console.log(this.$route.query);
    var params = this.$route.query.id;
    this.$axios
      .get("http://192.168.31.234:8080/v2/website_state/" + params)
      .then(res => {
        console.log(res);
        this.taskDetail.push(res.data);
  this.taskDetail.map(item => {
        console.log(item.UpdateTime);
        
        var UpdateTime =  item.UpdateTime
        var CrateTime =  item.CrateTime

       item.UpdateTime = CrateTime.substring(0, UpdateTime.indexOf("+"));
       item.CrateTime =  UpdateTime.substring(0,  CrateTime.indexOf("+"));
      
      });




        this.dotStatus = this.taskDetail[0].Status;
        console.log(this.taskDetail[0].Status);

        switch (this.dotStatus) {
          case "1":
            this.dotColor = "#2EFFFC";
            break;
          case "2":
            this.dotColor = "#FEB880";
            break;
          case "3":
            this.dotColor = "#FEB87F";
        }
      });
    this.$axios
      .get(
        "http://192.168.31.234:8080/v2/website_state_info/?query=WebsiteStateId.Id:" +
          params
      )
      .then(res => {
      
        this.websiteStateInfo.push(res.data.data[0]);
        var dotStatus = res.data.data[0].Status

  console.log(this.websiteStateInfo);


  this.websiteStateInfo.map(item => {
        console.log(item.CrateTime);
        
        var EndTime =  item.EndTime
        var CrateTime =  item.CrateTime

       item.EndTime = EndTime.substring(0, EndTime.indexOf("+"));
       item.CrateTime =  CrateTime.substring(0,  CrateTime.indexOf("+"));
      
      });


        
        switch (dotStatus) {
          case "1":
            res.data.data[0].Status = "#2EFFFC";
            break;
          case "2":
           res.data.data[0].Status = "#FEB880";
            break;
          case "3":
            res.data.data[0].Status = "#FEB87F";
        }
      });
    // this.$api.getWebsiteStateInfo().then(res => {
    //   console.log(res.data);
    //   this.websiteStateInfo = res.data;
    // });
  }
};
</script>

<style scoped>
.gap {
  margin-top: 80px;
}
.taskListTitl {
  /* margin: 50px 0; */
  padding: 0 0 20px 0;
  text-align: center;
  border-bottom: 1px solid #606266;
}
.dots {
  display: flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px;
}

.dots > li {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px;
}

.dialog > .el-dialog {
  width: 80% !important;
}
</style>