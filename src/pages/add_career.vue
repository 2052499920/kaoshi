<!-- 登录界面 -->
<template>
  <div style="position: relative; height: 100%">
    <div class="top_title">
      当前位置：职业管理-<a style="cursor: pointer">我的职业</a>-新增职业
    </div>
    <div style="overflow: hidden; width: 90%; margin: 50px auto">
      <el-row :gutter="20">
        <el-col :span="6" class="center_box">
          <router-link
            to="/record_info"
            class="item_box"
          >
            <div style="overflow: hidden">
              <span class="item_box_text">基本信息</span>
              <img :src="urla" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/add_career" class="item_box" style="background-color: #EDEDED">
            <div style="overflow: hidden">
              <span class="item_box_text">职业信息</span>
              <img :src="urlb" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/team_info" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">人员队伍信息</span>
              <img :src="urlc" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/newPlan" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">方案和资料上传</span>
              <img :src="urld" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div style="overflow: hidden">
      <div class="button" @click="addProfession">新增职业</div>
    </div>
    <div style="margin: 20px auto; width: 100%">
      <el-table :data="tableData.rows" style="width: 100%">
        <el-table-column prop="jobCode" label="编码" align="center">
        </el-table-column>

        <el-table-column prop="jobName" label="职业" align="center">
        </el-table-column>

        <el-table-column prop="levelInfo" label="等级" align="center">
        </el-table-column>

        <el-table-column prop="jobType" label="标准类型" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
        >
        </el-pagination>
      </div>
    </div>

    <div class="bottom_box center_box">
      <div style="width: 300px; height: 100%; overflow: hidden">
        <div class="back_but" @click="lastStep">上一步</div>
        <div class="back_but bottom_but_right" @click="add">下一步</div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/add_career.css";
.page {
  text-align: right;
  margin: 15px 50px 10px 0;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 5,
            urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
    };
  },
  created() {
    this.getfindJobInfo();
        this.$api.checkSubmitReview().then((res) => {
      // console.log(res.data);
      if (res.data.oCount > 0) {
        this.urla = require("../assets/chas.jpg");
      }
      if (res.data.JobCount > 0) {
        this.urlb = require("../assets/chas.jpg");
      }
      if (res.data.personnelCount >= 4) {
        this.urlc = require("../assets/chas.jpg");
      }
      if (res.data.programmeCount >= 10) {
        this.urld = require("../assets/chas.jpg");
      }
    });
  },
  methods: {
    addProfession() {
      this.$router.push("/career_info");
    },
    add() {
      this.$router.push("/team_info");
    },
    lastStep() {
      this.$router.push("/record_info");
    },
    handleEdit(index, row) {
      // console.log(index, row);
      localStorage.setItem("job", JSON.stringify(row));
      this.$router.push("/editOccupation");
    },
    handleDelete(index, row) {
      // console.log(index, row);
      let ids = [];
      ids.push(row.id);
      this.$confirm("此操作将永久删除该职业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.delOccupation(ids).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getfindJobInfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getfindJobInfo() {
      this.$api
        .findJobInfo({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 0) {
            //jobTypes
            this.tableData = res.data;
          }
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getfindJobInfo();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getfindJobInfo();
    },
  },
  components: {},
};
</script>