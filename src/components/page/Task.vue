<template>
  <div>
    <el-table :data="taskList" style="width: 100%">
      <el-table-column label="任务ID" class="jumpToDetail">
        <template slot-scope="scope">
          <router-link
            class="idStyle"
            :to="{path:'/task-details',query: {id: scope.row.Id}}"
            @click.native="refresh"
          >{{ scope.row.Id}}</router-link>

          <!-- <p  @click="jumpToTaskDetail(scope.$index, scope.row)" >{{ scope.row.Id}}</p> -->
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="CrateTime"></el-table-column>
      <el-table-column label="结束时间">
        <template
          slot-scope="scope"
        >{{scope.row.EndTime=="0001-01-01T00:00:00Z"? "null":scope.row.EndTime}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div class="dots" :style="{'backgroundColor':scope.row.Status}"></div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="UpdateTime"></el-table-column>
      <el-table-column label="操作" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-button type="primary" @click="refresh(scope.row)" plain>刷新</el-button>
          <el-button type="danger" @click="deleteWebsiteState(scope.row)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      taskList: [],

      EndTime: "",
      dotStatus: [],
      dotColor: "",
      currentPage4: 5,
      total: 0
    };
  },
  mounted() {
    this.$api.getTaskList().then(res => {
      // console.log(res);
      this.total = res.count;
      this.taskList = res.data;

      // var time = res.data[0].UpdateTime;
      this.taskList.map(item => {
        console.log(item.UpdateTime);
        
        var UpdateTime =  item.UpdateTime
        var CrateTime =  item.CrateTime

       item.UpdateTime = CrateTime.substring(0, UpdateTime.indexOf("+"));
       item.CrateTime =  UpdateTime.substring(0,  CrateTime.indexOf("+"));
      
      });
console.log(this.taskList);

      // var newTime = time.substring(0, time.indexOf("+"));
      // console.log(newTime);
//  console.log(res.data);
      res.data.map(item => {
        switch (item.Status) {
          case "1":
            item.Status = "#2EC7CA";
            break;
          case "2":
            item.Status = "#E46D71";
            break;
          case "3":
            item.Status = "#E46D71";
        }
      });
    });
  },
  methods: {
    refresh() {
      this.$router.go(0);
    },

    jumpToTaskDetail(index, row) {
      // console.log(row.Id);
      var id = row.Id;
      this.$router.push({ path: "/task-details", query: { id } });
      window.location.reload();
    },
    refresh(row) {
      // console.log(row);
      this.$axios
        .get(
          "http://192.168.31.234:8080/v2/website_state/update_state/" + row.Id
        )
        .then(res => {
          this.taskList.map(item => {
            // console.log(item);
            if (item.Id == res.Id) {
              console.log(2222222);

              Object.assign(item, res);
            }
            // window.location.reload();
          });
          this.$message("刷新成功");
          //  console.log(this.taskList);
        });
    },
    deleteWebsiteState(row) {
      var params = row.Id;

      // this.$axios.delete("http://192.168.31.234:8080/v2/website_state/"+ params ).then(data=>{console.log(data) ;window.location.reload()}
      // )
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var params = { limit: this.limits, offset: val - 1 };
      this.$api.getPageLimit(params).then(res => {
        this.searchList = res.data;

        // console.log(this.searchList);
      });
    }
  }
};
</script>
<style scoped>
.jumpToDetail {
  cursor: pointer;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.idStyle {
  text-decoration: none;
  color: #409eff;
}

.dots {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px;
}
.block {
  margin-top: 30px;
}
</style>
