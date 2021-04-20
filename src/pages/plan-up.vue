<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">计划列表</a>
    </div>
    <div class="title" style="overflow: hidden; margin-top: 20px">计划列表</div>
    <div class="contents" style="margin-top: 20px; overflow: hidden">
      <div class="names">
        <div class="title">计划名称：</div>
        <div style="width: 120px">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            size="small"
          ></el-input>
        </div>
      </div>
      <div class="names">
        <div class="title">状态:</div>
        <div style="width: 140px">
          <el-select
            size="small"
            v-model="audit"
            style="margin-left: 15px"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in auditList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btnSearch">
        <el-button type="primary" plain size="small" @click="searchPlan"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="button" @click="submit">提交确认</div>
    <div class="button" @click="abolish">计划不通过</div>
    <div class="tab_box">
      <el-table
        ref="multipleTable"
        :data="tableData.rows"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="100" align="center">
        </el-table-column>
        <el-table-column label="计划名称" align="center">
          <template slot-scope="scope">{{ scope.row.planName }}</template>
        </el-table-column>
        <el-table-column label="考试职业" align="center">
          <template slot-scope="scope">{{ scope.row.jobName }}</template>
        </el-table-column>
        <el-table-column label="考试等级" align="center">
          <template slot-scope="scope">{{ scope.row.level }}</template>
        </el-table-column>
        <el-table-column label="考试人数" align="center">
          <template slot-scope="scope">{{
            scope.row.candidatesNumber
          }}</template>
        </el-table-column>
        <el-table-column label="考试时间" align="center" width="250px">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="考试时长" align="center">
          <template slot-scope="scope">{{ scope.row.duration }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{ scope.row.statu }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
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

    <div>
      <el-dialog title="不通过的原因" :visible.sync="visible">
        <el-input
          resize="none"
          type="textarea"
          :rows="3"
          placeholder="请输入不通过的原因"
          v-model="reason"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/results_report.css";
.contents {
  display: flex;
}
.names {
  display: flex;
  align-items: center;
}
.title {
  margin-right: 0px;
  font-size: 13px;
  color: #566573;
}
.btnSearch {
  margin-left: 15px;
}
.page {
  text-align: right;
  padding: 15px 50px 10px 0;
  background-color: #fff;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      tableData: [],
      ids: [],
      search: "",
      startDate: "",
      endDate: "",
      testSources: "",
      planPhase: "",
      status: "",
      pageNo: 1,
      pageSize: 5,
      input: "",
      audit: "",
      auditList: [
        {
          id: "",
          label: "全部",
          value: "",
        },
        {
          id: 0,
          label: "未提交",
          value: 0,
        },
        {
          id: 1,
          label: "内部审核中",
          value: 1,
        },
        {
          id: 2,
          label: "内部审核不通过",
          value: 2,
        },
        {
          id: 3,
          label: "待审核",
          value: 3,
        },
        {
          id: 4,
          label: "审核通过",
          value: 4,
        },
        {
          id: 5,
          label: "审核不通过",
          value: 5,
        },
      ],
      visible: false, //弹窗理由
      reason: "", //计划不通过理由
      list: [],
    };
  },
  created() {
    // this.$api.exportJobList().then((res) => {
    //   console.log(res);
    // });
    this.getQuery();
  },
  methods: {
    getQuery() {
      //查询计划
      this.$api
        .getQueryPlan({
          search: this.search,
          status: this.status,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 0) {
            res.data.rows.map((item) => {
              this.auditList.map((itema) => {
                if (item.status == itema.value) {
                  item.statu = itema.label;
                }
              });
            });
            this.tableData = res.data;
          }
        });
    },
    handleSelectionChange(val) {
      let ids = [];
      val.map((item) => {
        ids.push(item);
      });
      this.ids = ids;
    },
    submit() {
      //确认提交
      if (this.ids.length == 0) {
        this.$message.warning("至少选择一个提交");
      } else {
        let list = [];
        this.ids.map((item) => {
          list.push(item.id);
        });
        this.$api.affirmSubmit(list).then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.ids = [];
            this.getQuery();
          }
        });
      }
    },
    abolish() {
      //计划作废
      console.log(this.ids);
      if (this.ids.length == 0) {
        this.$message.warning("至少选择一个计划");
      } else {
        let flag = this.ids.some((item) => {
          return item.statu == "待审核" ||item.statu == "内部审核不通过" ;
        });
        if (flag) {
          this.$message.error("只能拒绝内部审核中的计划");
        } else {
          this.visible = true;
          let obj = {};
          this.ids.map((item) => {
            obj.id = item.id;
            this.list.push(obj);
          });
        }
      }
    },
    cancel() {
      //取消作废
      this.visible = false;
      this.reason = "";
    },
    confirm() {
      //确认作废
      if (this.reason == "") {
        this.$message.error("理由不能为空");
      } else {
        this.list.map((item) => {
          item.insideReason = this.reason;
        });
        this.$api.refusePlan(this.list).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.list = [];
            this.reason = "";
            this.getQuery();
            this.visible = false;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    selectable(row, index) {
      // if (row.status == "未提交") {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    searchPlan() {
      //搜索
      this.search = this.input; //名称
      this.status = this.audit; //计划阶段
      this.getQuery();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuery();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getQuery();
    },
  },
  components: {},
};
</script>