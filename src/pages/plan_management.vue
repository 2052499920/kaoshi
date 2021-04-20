<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">计划管理</a>
    </div>
    <div class="title" style="overflow: hidden; margin-top: 15px">计划列表</div>

    <div class="top_title" style="margin-top: 15px">
      <img src="../assets/jingao.png" class="warning_icon" alt="" />
      <div style="float: left; margin-left: 20px">
        <p class="warning_text">
          1.数据来源为“考务上报”的计划。若要查询“考前”“考中”的信息，请到考务系统查看，本页仅展示“考务中”的计划
        </p>
        <p class="warning_text">
          2.数据来源为监管上报的计划，可在本系统查看“考前”“考后的”数据
        </p>
      </div>
    </div>

    <div class="contents" style="overflow: hidden; margin-top: 10px">
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
        <div class="title">考试时间：</div>
        <div>
          <el-date-picker
            v-model="tiem"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="names">
        <div class="title">数据来源:</div>
        <div style="width: 150px">
          <el-select
            size="small"
            v-model="datas"
            style="margin-left: 15px"
            placeholder="选择来源"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="names">
        <div class="title">计划阶段:</div>
        <div style="width: 150px">
          <el-select
            size="small"
            v-model="plan"
            style="margin-left: 15px"
            placeholder="选择计划"
          >
            <el-option
              v-for="item in planList"
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

    <div style="overflow: hidden; margin-top: 10px">
      <!-- <div class="button" @click="addplan">创建计划</div> -->
      <!-- <div class="button" style="background: #f4f4f4; color: #1c1c1c">删除</div> -->
      <div class="button" @click="present">确认提交</div>
    </div>
    <div class="" style="padding: 20px 0 0 20px">
      <!-- <el-row>
        <el-col :span="4" v-for="item in 6">
          <div class="yuan"></div>
          <div class="bg-purple">计划名称</div>
        </el-col>
      </el-row> -->
      <!-------------------------表格------------------------------->
      <el-table
        ref="multipleTable"
        :data="tableData.rows"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          :selectable="selectable"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="计划名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考生人数" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.candidatesNumber
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试职业数" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.occupationsNumber
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据来源" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.testSources }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计划阶段" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.planPhase }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开考时间" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.startDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
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
    <!-------------------------对话框--------------------------->
    <el-dialog
      title="创建计划"
      :visible.sync="dialogVisible"
      width="40%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="计划名称："
          :label-width="formLabelWidth"
          prop="planName"
        >
          <el-input
            v-model="form.planName"
            placeholder="请输入计划名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考生人数："
          :label-width="formLabelWidth"
          prop="candidatesNumber"
        >
          <el-input
            type="number"
            v-model="form.candidatesNumber"
            placeholder="请输入考生人数"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考试职业数："
          :label-width="formLabelWidth"
          prop="occupationsNumber"
        >
          <el-input
            type="number"
            v-model="form.occupationsNumber"
            placeholder="请输入考试职业数"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="数据来源："
          :label-width="formLabelWidth"
          prop="testSources"
        >
          <el-select
            v-model="form.testSources"
            style="margin-left: 15px"
            placeholder="请选择数据来源"
            @change="ChangeData"
          >
            <el-option
              v-for="item in testSourcesList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始考试时间："
          :label-width="formLabelWidth"
          prop="startDate"
        >
          <el-date-picker
            v-model="form.startDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- <el-input
            v-model="form.startDate"
            placeholder="开始考试时间"
          ></el-input> -->
        </el-form-item>
        <el-form-item
          label="考试时长："
          :label-width="formLabelWidth"
          prop="duration"
        >
          <el-input v-model="form.duration" placeholder="考试时长"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setDialogform('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/plan_management.css";
.page {
  text-align: right;
  margin: 15px 50px 10px 0;
}
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
</style>

<script>
import dayjs from "dayjs";
export default {
  name: "login",
  data() {
    return {
      tableData: [], //表格数据
      form: {
        //表单数据
        planName: "",
        candidatesNumber: "",
        occupationsNumber: "",
        startDate: "",
        duration: "",
        testSources: "",
      },
      rules: {
        planName: [
          { required: true, message: "计划书名不能为空", trigger: "blur" },
        ],
        candidatesNumber: [
          { required: true, message: "考生人数不能为空", trigger: "blur" },
        ],
        occupationsNumber: [
          { required: true, message: "考试职业数不能为空", trigger: "blur" },
        ],
        startDate: [
          { required: true, message: "开始考试时间不能为空", trigger: "blur" },
        ],
        duration: [
          { required: true, message: "考试时长不能为空", trigger: "blur" },
        ],
        testSources: [
          { required: true, message: "数据来源不能为空", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      testSourcesList: [
        {
          id: 1,
          label: "监考上报",
          value: 1,
        },
        {
          id: 2,
          label: "考务上报",
          value: 2,
        },
      ],
      dataList: [
        {
          id: 1,
          label: "监考上报",
          value: 1,
        },
        {
          id: 2,
          label: "考务上报",
          value: 2,
        },
      ],
      dialogVisible: false, //对话框
      search: "",
      startDate: "",
      endDate: "",
      testSources: "",
      planPhase: "",
      status: "",
      pageNo: 1,
      pageSize: 5,
      input: "",
      tiem: "",
      datas: "",
      plan: "",
      planList: [
        {
          id: 1,
          label: "计划上报",
          value: 1,
        },
        {
          id: 2,
          label: "计划确认",
          value: 2,
        },
        {
          id: 3,
          label: "成绩上报",
          value: 3,
        },
        {
          id: 4,
          label: "成绩审核",
          value: 4,
        },
        {
          id: 5,
          label: "证书生成",
          value: 5,
        },
        {
          id: 6,
          label: "已归档",
          value: 6,
        },
        {
          id: 7,
          label: "计划作废",
          value: 7,
        },
      ],
      ids:[]
    };
  },
  created() {
    this.getQuery();
  },
  methods: {
    addplan() {
      // this.$router.push('/addPlan')
      this.dialogVisible = true;
    },
    ChangeData() {},
    //提交考试计划
    setDialogform(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.form.startDate = dayjs(this.form.startDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          // console.log(this.form);
          this.$api.addPlan(this.form).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.getQuery();
              this.dialogVisible = false;
              this.$message.success("创建计划成功");
            }
          });
        } else {
          // console.log('error submit!!');
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    getQuery() {
      //查询计划
      this.$api
        .getQueryPlan({
          search: this.search,
          startDate: this.startDate,
          endDate: this.endDate,
          testSources: this.testSources,
          planPhase: this.planPhase,
          status: this.status,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.tableData = res.data;
          }
        });
    },
    handleEdit(index, row) {
      this.$message.warning("功能开发中");
      //编辑
      // console.log(index, row);
    },
    handleDelete(index, row) {
      //删除
      var ids = [];
      ids.push(row.id);
      // console.log(index, row);
      this.$confirm("此操作将永久删除该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.delPlan(ids).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.getQuery();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    searchPlan() {
      //搜索
      this.search = this.input; //名称
      if (this.tiem) {
        this.tiem.map((item, index) => {
          if (index == 0) {
            this.startDate = dayjs(item).format("YYYY-MM-DD HH:mm:ss"); //开始时间
          } else {
            this.endDate = dayjs(item).format("YYYY-MM-DD HH:mm:ss"); //结束时间
          }
        });
      }
      this.testSources = this.datas; //数据
      this.planPhase = this.plan; //计划阶段
      this.getQuery();
    },
    present() {
      //确认提交
      if (this.ids.length == 0) {
        this.$message.warning("至少选择一个提交");
      } else {
        this.$api.affirmSubmit(this.ids).then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.ids = [];
            this.getQuery();
          }
        });
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
      let ids = [];
      val.map((item) => {
        ids.push(item.id);
      });
      this.ids = ids;
      // console.log(ids);
    },
    selectable(row, index) {
      if (row.status == "未提交") {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {},
};
</script>