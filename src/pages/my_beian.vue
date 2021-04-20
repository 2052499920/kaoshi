<!-- 登录界面 -->
<template>
  <div>
    <div>
      <div class="top_title">
        当前位置：备案管理-<a style="cursor: pointer">我的备案</a>
      </div>
      <div class="tab_box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="oName" label="评价机构名称" align="center">
          </el-table-column>
          <el-table-column prop="oType" label="评价机构类型" align="center">
          </el-table-column>
          <el-table-column prop="address" label="评价机构种类" align="center">
          </el-table-column>
          <el-table-column
            prop="oAttribute"
            label="评价机构属性"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="organ" label="所属机构" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)">继续编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tab_data">
        <div style="padding-top: 50px" v-if="tableData.length == 0">
          <img
            src="../assets/no_data.png"
            style="width: 130px; height: 100px; display: block; margin: auto"
            alt=""
          />
          <p class="no_data_txt">
            您暂未申请备案，<span class="no_apply" @click="applyFor"
              >申请备案</span
            >
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="top_title">备案记录</div>
      <div>
        <div class="search">
          <el-select
            size="small"
            v-model="records"
            placeholder="请选择备案信息"
          >
            <el-option
              v-for="item in recordsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            class="select"
            size="small"
            v-model="state"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button size="small" type="primary" plain @click="searchList"
            >搜索</el-button
          >
        </div>
        <div></div>
      </div>
      <div class="">
        <el-table :data="findRecordList.rows" style="width: 100%">
          <el-table-column prop="jobStandards" label="备案内容" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="提交时间" align="center">
          </el-table-column>
          <el-table-column prop="statusInfo" label="状态" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="findRecordList.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/my_beian.css";
.search {
  padding: 10px 0 10px 15px;
}
.select {
  padding: 0 15px;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      tableData: [],
      findRecordList: [],
      recordsList: [
        {
          id: 1,
          label: "职业信息",
          value: 1,
        },
        {
          id: 2,
          label: "人员队伍信息",
          value: 2,
        },
        {
          id: 3,
          label: "方案资料上传",
          value: 3,
        },
      ],
      records: 1,
      stateList: [
        {
          id: 0,
          label: "未提交",
          value: "0",
        },
        {
          id: 1,
          label: "待审核",
          value: 1,
        },
        {
          id: 2,
          label: "审核通过",
          value: 2,
        },
        {
          id: 3,
          label: "审核不通过",
          value: 3,
        },
      ],
      state: "",
      pageNo: 1,
      pageSize: 5,
    };
  },
  created() {
    this.$api.findOrganInfo().then((res) => {
      // console.log(res);
      if (res.code == 0) {
        if (res.data) {
          this.tableData.push(res.data);
        }
      }
    });
    this.getfindRecord();
  },
  methods: {
    applyFor() {
      this.$router.push("/record_info");
    },
    handleEdit(row) {
      // console.log(row);
      this.$router.push("/record_info");
    },
    searchList() {
      this.getfindRecord();
    },
    getfindRecord() {
      // console.log(this.pageSize);
      this.$api
        .findRecord({
          type: this.records,
          status: this.state,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.rows.map((item) => {
              this.stateList.map((itema) => {
                if (item.status == itema.id) {
                  item.statusInfo = itema.label;
                }
              });
              if (this.records == 1) {
                item.jobStandards = "职业信息";
              } else if (this.records == 2) {
                item.jobStandards = "人员队伍信息";
              } else {
                item.jobStandards = "方案资料上传";
              }
            });
          }
          // console.log(res);
          this.findRecordList = res.data;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getfindRecord();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getfindRecord();
    },
  },
  components: {},
};
</script>
<style scoped>
.no_apply {
  color: #1b68d6;
  cursor: pointer;
}
.pagination {
  text-align: right;
  margin: 20px 20px 0 0;
}
</style>