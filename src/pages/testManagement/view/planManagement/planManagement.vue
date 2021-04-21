<!-- 登录界面 -->
<template>
  <div>
    <div class="nav">
      <div>计划管理</div>
    </div>
    <div class="contents" style="margin-top: 20px; overflow: hidden">
      <div class="names">
        <div class="title">计划名称：</div>
        <div style="width: 120px">
          <el-input
            v-model="search"
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
            placeholder="全部"
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
    <div class="button" @click="addplan">创建计划</div>

    <div class="tab_box">
      <el-table ref="multipleTable" :data="tableData.rows" style="width: 100%">
        <el-table-column label="计划计划" align="center">
          <template slot-scope="scope">{{ scope.row.planName }}</template>
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
          <template slot-scope="scope">{{
            scope.row.duration + "分钟"
          }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 2">
              <div @mouseover="onmouseover(scope.row)">
                <el-tooltip
                  effect="light"
                  class="item"
                  :content="tooltipText"
                  placement="bottom-start"
                >
                  <div class="statu">{{ scope.row.statu }}</div>
                </el-tooltip>
              </div>
            </div>
            <div v-else>{{ scope.row.statu }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="operations">
              <div
                class="operation"
                v-if="scope.row.status == 2 || scope.row.status == 5"
                @click="edit(scope.row)"
              >
                修改
              </div>
              <div
                class="operation"
                v-if="
                  scope.row.status == 1 ||
                  scope.row.status == 2 ||
                  scope.row.status == 5
                "
                @click="scrap(scope.row)"
              >
                计划作废
              </div>
              <div
                class="operation"
                v-if="scope.row.status == 2 || scope.row.status == 5"
                @click="del(scope.row)"
              >
                删除
              </div>
              <div
                class="operation"
                v-if="scope.row.status == 3"
                @click="repeal(scope.row)"
              >
                撤销审核
              </div>
              <div
                class="operation"
                v-if="scope.row.status == 0"
                @click="anew(scope.row)"
              >
                重新提交
              </div>
            </div>
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

      <!-- 创建计划-->
      <div>
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
                size="small"
                v-model="form.planName"
                placeholder="请输入计划名称"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="考试职业："
              :label-width="formLabelWidth"
              prop="jobId"
            >
              <el-select
                size="small"
                v-model="form.jobId"
                style="width: 450px"
                placeholder="请选择考试职业"
                @change="ChangeData"
              >
                <el-option
                  v-for="item in testSourcesList"
                  :key="item.id"
                  :label="item.jobCode + '-' + item.jobName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="考试等级："
              :label-width="formLabelWidth"
              prop="level"
            >
              <el-radio v-model="form.level" label="1">一级</el-radio>
              <el-radio v-model="form.level" label="2">二级</el-radio>
              <el-radio v-model="form.level" label="3">三级</el-radio>
              <el-radio v-model="form.level" label="4">四级</el-radio>
              <el-radio v-model="form.level" label="5">五级</el-radio>
            </el-form-item>

            <el-form-item
              label="考生人数："
              :label-width="formLabelWidth"
              prop="candidatesNumber"
            >
              <el-input
                size="small"
                type="number"
                v-model="form.candidatesNumber"
                placeholder="请输入考生人数"
              ></el-input>
            </el-form-item>

            <div class="data">
              <div>
                <el-form-item
                  label="考试时间："
                  label-width="120px"
                  prop="startTime"
                >
                  <el-date-picker
                    style="width: 200px"
                    size="small"
                    v-model="form.startTime"
                    type="datetime"
                    placeholder="开始时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="-" label-width="50px" prop="endTime">
                  <el-time-picker
                    style="width: 200px"
                    size="small"
                    v-model="form.endTime"
                    placeholder="结束时间"
                  >
                  </el-time-picker>
                </el-form-item>
              </div>
            </div>
            <el-form-item
              label="考试时长："
              :label-width="formLabelWidth"
              prop="duration"
            >
              <el-input
                disabled
                size="small"
                v-model="form.duration"
                placeholder="考试时长"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" label-width="120px">
              <el-input
                resize="none"
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="form.remarks"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="setDialogform('ruleForm')"
              >提交审核</el-button
            >
          </div>
        </el-dialog>
      </div>
      <!-- 修改 -->
      <div>
        <el-dialog
          title="修改计划"
          :visible.sync="show"
          width="40%"
          :destroy-on-close="true"
          :close-on-click-modal="false"
        >
          <el-form :model="forma" :rules="rules" ref="ruleForma">
            <el-form-item
              label="计划名称："
              :label-width="formLabelWidth"
              prop="planName"
            >
              <el-input
                size="small"
                v-model="forma.planName"
                placeholder="请输入计划名称"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="考试职业："
              :label-width="formLabelWidth"
              prop="jobId"
            >
              <el-select
                size="small"
                v-model="forma.jobId"
                style="width: 450px"
                placeholder="请选择考试职业"
                @change="ChangeData"
              >
                <el-option
                  v-for="item in testSourcesList"
                  :key="item.id"
                  :label="item.jobCode + '-' + item.jobName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="考试等级："
              :label-width="formLabelWidth"
              prop="level"
            >
              <el-radio v-model="forma.level" label="1">一级</el-radio>
              <el-radio v-model="forma.level" label="2">二级</el-radio>
              <el-radio v-model="forma.level" label="3">三级</el-radio>
              <el-radio v-model="forma.level" label="4">四级</el-radio>
              <el-radio v-model="forma.level" label="5">五级</el-radio>
            </el-form-item>

            <el-form-item
              label="考生人数："
              :label-width="formLabelWidth"
              prop="candidatesNumber"
            >
              <el-input
                size="small"
                type="number"
                v-model="forma.candidatesNumber"
                placeholder="请输入考生人数"
              ></el-input>
            </el-form-item>

            <div class="data">
              <div>
                <el-form-item
                  label="考试时间："
                  label-width="120px"
                  prop="startTime"
                >
                  <el-date-picker
                    style="width: 200px"
                    size="small"
                    v-model="forma.startTime"
                    type="datetime"
                    placeholder="开始时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="-" label-width="50px" prop="endTime">
                  <el-time-picker
                    style="width: 200px"
                    size="small"
                    v-model="forma.endTime"
                    placeholder="结束时间"
                  >
                  </el-time-picker>
                </el-form-item>
              </div>
            </div>
            <el-form-item
              label="考试时长："
              :label-width="formLabelWidth"
              prop="duration"
            >
              <el-input
                disabled
                size="small"
                v-model="forma.duration"
                placeholder="考试时长"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" label-width="120px">
              <el-input
                resize="none"
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="forma.remarks"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancela">取 消</el-button>
            <el-button type="primary" @click="setDialogforma('ruleForma')"
              >重新提交审核</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.nav {
  background-color: #2290ff;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  border-radius: 5px;
}
.contents {
  display: flex;
}
.names {
  margin-left: 20px;
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
.button {
  margin-bottom: 20px;
}
.data {
  display: flex;
}
.operations {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
}
.operation {
  padding: 0 8px;
  cursor: pointer;
  color: #2290ff;
  text-decoration: underline;
}
.dialog-footer {
  text-align: center;
}
.statu {
  cursor: pointer;
  text-decoration: underline;
}
</style>

<script>
import dayjs from "dayjs";
export default {
  name: "login",
  data() {
    return {
      search: "", //计划名称
      audit: "", //状态
      tableData: [], //表格数据
      pageNo: 1,
      pageSize: 5,
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
      dialogVisible: false, //对话框
      form: {
        //表单数据
        planName: "", //计划名称
        jobId: "", //考试职业
        level: "", //计划等级
        candidatesNumber: "", //考试人数
        startTime: "", //开始考试时间
        endTime: "", //结束考试时间
        duration: "", //考试时长
        remarks: "", // 备注
        id: "", //编辑上传
      },
      testSourcesList: [],
      rules: {
        planName: [
          { required: true, message: "计划书名不能为空", trigger: "blur" },
        ],
        jobId: [
          { required: true, message: "考试职业数不能为空", trigger: "blur" },
        ],
        level: [
          { required: true, message: "考试等级不能为空", trigger: "blur" },
        ],
        candidatesNumber: [
          { required: true, message: "考试人数不能为空", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "开始考试时间不能为空", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "结束考试时间不能为空", trigger: "blur" },
        ],
        duration: [
          { required: true, message: "考试时长不能为空", trigger: "blur" },
        ],
        remarks: [
          { required: true, message: "考试时间不能为空", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",

      show: false,
      forma: {
        //表单数据
        planName: "", //计划名称
        jobId: "", //考试职业
        level: "", //计划等级
        candidatesNumber: "", //考试人数
        startTime: "", //开始考试时间
        endTime: "", //结束考试时间
        duration: "", //考试时长
        remarks: "", // 备注
        id: "", //编辑时上传
      },
      tooltipText: "", //计划不通过的原因
    };
  },
  created() {
    this.$api.getJobfindJob().then((res) => {
      console.log(res);
      if (res.code == 0) {
        this.testSourcesList = res.data;
      }
    });
    this.getQuery();
  },
  methods: {
    getQuery() {
      //查询计划
      this.$api
        .getQueryPlan({
          search: this.search,
          status: this.audit,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
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
    addplan() {
      this.dialogVisible = true;
    },
    ChangeData() {},
    setDialogform(ruleForm) {
      //确认创建
      console.log(this.form);
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$api
            .addPlan({
              planName: this.form.planName, //计划名称
              jobId: this.form.jobId, //考试职业
              level: this.form.level, //计划等级
              candidatesNumber: this.form.candidatesNumber, //考试人数
              startTime: dayjs(this.form.startTime).format(
                "YYYY-MM-DD HH:mm:ss"
              ), //开始考试时间
              endTime:
                dayjs(this.form.startTime).format("YYYY-MM-DD") +
                " " +
                dayjs(this.form.endTime).format("HH:mm:ss"), //结束考试时间
              duration: this.form.duration, //考试时长
              remarks: this.form.remarks, // 备注
            })
            .then((res) => {
              if (res.code == 0) {
                this.dialogVisible = false;
                this.$message.success("创建计划成功");
                this.$refs.ruleForm.resetFields();
                this.getQuery();
              } else {
                this.$message.error(res.msg);
              }
              console.log(res);
            });
        } else {
          // console.log('error submit!!');
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    cancel() {
      //取消创建
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },

    edit(row) {
      //修改
      // console.log(row);
      this.$api.getPlanById(row.id).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          let time = res.data.endTime.substring(11).split(":");
          console.log(time);
          this.forma.planName = res.data.planName; //计划名称
          this.forma.jobId = res.data.jobId; //考试职业
          this.forma.level = res.data.level.toString(); //计划等级
          this.forma.candidatesNumber = res.data.candidatesNumber; //考试人数
          this.forma.startTime = res.data.startTime; // 考试开始时间
          this.forma.endTime = new Date(
            2016,
            9,
            10,
            Number(time[0]),
            Number(time[1]),
            Number(time[2])
          ); //结束考试时间
          console.log(res.data.endTime.substring(11));
          this.forma.duration = res.data.duration; //考试时长
          this.forma.remarks = res.data.insideReason; // 备注
          this.forma.id = res.data.id; // 编辑时上传
          this.show = true;
        }
      });
    },
    setDialogforma(ruleForma) {
      //确认编辑
      // console.log(dayjs(this.forma.endTime).format("HH:mm:ss"));
      console.log(this.forma);
      this.$refs[ruleForma].validate((valid) => {
        if (valid) {
          this.$api
            .addPlan({
              planName: this.forma.planName, //计划名称
              jobId: this.forma.jobId, //考试职业
              level: this.forma.level, //计划等级
              candidatesNumber: this.forma.candidatesNumber, //考试人数
              startTime: dayjs(this.forma.startTime).format(
                "YYYY-MM-DD HH:mm:ss"
              ), //开始考试时间
              endTime:
                dayjs(this.forma.startTime).format("YYYY-MM-DD") +
                " " +
                dayjs(this.forma.endTime).format("HH:mm:ss"), //结束考试时间
              duration: this.forma.duration, //考试时长
              remarks: this.forma.remarks, // 备注
              id: this.forma.id, // 编辑时上传
            })
            .then((res) => {
              if (res.code == 0) {
                this.show = false;
                this.$message.success("创建计划成功");
                this.$refs.ruleForma.resetFields();
                this.getQuery();
              } else {
                this.$message.error(res.msg);
              }
              console.log(res);
            });
        } else {
          // console.log('error submit!!');
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    cancela() {
      //取消编辑
      this.show = false;
      this.$refs.ruleForma.resetFields();
    },

    searchPlan() {
      //搜索
      this.search = this.search; //名称
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

    scrap(row) {
      //计划作废
      console.log(row);
      this.$confirm("此操作将永久作废该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.cancelPlan(row.id).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getQuery();
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
    del(row) {
      //删除
      console.log(row);
      this.$confirm("此操作将永久删除该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          ids.push(row.id);
          this.$api.delPlan(ids).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getQuery();
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
    repeal(row) {
      //撤销审核
      console.log(row);
      this.$confirm("此操作将永久作废该计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.cancelPlan(row.id).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getQuery();
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
    anew(row) {
      //重新提交
      console.log(row);
      this.$confirm("是否确认重新提交审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.reSubmitPlan(row.id).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getQuery();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    onmouseover(row) { //鼠标移入事件 查看不通过的原因
      // console.log(row);
      this.$api.getPlanById(row.id).then((res) => {
        // console.log(res);
        if(res.code == 0){
        this.tooltipText = res.data.insideReason
        }
      });
    },
  },
  components: {},
  watch: {
    form: {
      handler(val) {
        console.log(val);
        if (val.startTime && val.endTime) {
          let stareTime = dayjs(
            dayjs(this.form.startTime).format("YYYY-MM-DD HH:mm:ss")
          ).unix(); //开始考试时间
          let endTiem = dayjs(
            dayjs(this.form.startTime).format("YYYY-MM-DD") +
              dayjs(this.form.endTime).format("HH:mm:ss")
          ).unix(); //结束时间戳
          //    console.log(stareTime,endTiem);
          let testTime = endTiem - stareTime; //考试时间
          if (testTime < 0) {
            this.$message.error("考试时间设置错误");
            this.form.duration = "";
          } else {
            this.form.duration = parseInt(testTime / 60);
          }
        }
      },
      deep: true,
    },
    forma: {
      handler(val) {
        console.log(val);
        if (val.startTime && val.endTime) {
          let stareTime = dayjs(
            dayjs(this.forma.startTime).format("YYYY-MM-DD HH:mm:ss")
          ).unix(); //开始考试时间
          let endTiem = dayjs(
            dayjs(this.forma.startTime).format("YYYY-MM-DD") +
              dayjs(this.forma.endTime).format("HH:mm:ss")
          ).unix(); //结束时间戳
          console.log(stareTime, endTiem);
          let testTime = endTiem - stareTime; //考试时间
          if (testTime < 0) {
            this.$message.error("考试时间设置错误");
            this.forma.duration = "";
          } else {
            console.log(this.forma.duration);
            this.forma.duration = parseInt(testTime / 60);
          }
        }
      },
      deep: true,
    },
  },
};
</script>