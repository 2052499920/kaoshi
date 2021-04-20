<template>
  <div>
    <div class="nav">
      <div>练习题库管理</div>
    </div>
    <div class="contenta">
      <div class="contenta1">
        <div class="selet">
          <span class="texts">职业工种</span>
          <el-select
            size="mini"
            v-model="form.jobId"
            placeholder="请选择职业工种"
            style="width: 200px"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.jobCode + '-' + item.jobName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="selet">
          <span class="texts">职业等级</span>
          <el-select
            size="mini"
            v-model="form.level"
            placeholder="请选择职业等级"
            style="width: 200px"
          >
            <el-option
              v-for="item in levelList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="texts">关联教材</span>
          <el-select
            size="mini"
            v-model="form.teachingId"
            placeholder="请选择关联教材"
            style="width: 200px"
            @visible-change="visibleChange"
          >
            <el-option
              v-for="item in teachingIdList"
              :key="item.id"
              :label="item.teachName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="contenta2">
        <div class="keyword selet">
          <div>
            <span class="texts">试题关键字</span>
          </div>
          <div style="width: 200px">
            <el-input
              size="mini"
              placeholder="多个试题关键字用逗号隔开"
              v-model="form.keyword"
            >
            </el-input>
          </div>
        </div>
        <div class="selet">
          <span class="texts">试题类型</span>
          <el-select
            size="mini"
            v-model="form.topicType"
            placeholder="试题类型"
            style="width: 100px"
          >
            <el-option
              v-for="item in topicTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="selet">
          <span class="texts">试题状态</span>
          <el-select
            size="mini"
            v-model="form.status"
            placeholder="试题状态"
            style="width: 100px"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button size="mini" type="primary" @click="search">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="contentb">
      <el-table :data="tableData.rows" style="width: 100%">
        <el-table-column label="编号" align="center" width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="试题类型" align="center" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.answer }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
              @change="changeSwitch($event, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="职业工种" align="center" width="240">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.jobCode + "-" + scope.row.jobName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联教材" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.teachName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试题内容" align="center" width="150">
          <template slot-scope="scope">
            <span
              style="margin-left: 10px overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >{{ scope.row.stem }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              style="color: #f8902a"
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      form: {
        jobId: "", //职业工种id
        level: "", //职业等级
        keyword: "", // 关键字
        status: "", // 试题状态1启用、0禁用
        teachingId: "", // 关联教材id
        topicType: 1, // 试题类型
        pageNo: 1, //当前页码
        pageSize: 5, // 每页显示数量
      },
      options: [], //职业工种列表
      levelList: [
        //职业等级列表
        {
          id: 1,
          label: "一级",
          value: 1,
        },
        {
          id: 2,
          label: "二级",
          value: 2,
        },
        {
          id: 3,
          label: "三级",
          value: 3,
        },
        {
          id: 4,
          label: "四级",
          value: 4,
        },
        {
          id: 5,
          label: "五级",
          value: 5,
        },
      ],
      teachingIdList: [], //关联教材列表
      topicTypeList: [
        //试题类型
        {
          id: 1,
          label: "单选题",
          value: 1,
        },
        {
          id: 2,
          label: "多选题",
          value: 2,
        },
        {
          id: 3,
          label: "填空题",
          value: 3,
        },
        {
          id: 4,
          label: "简答题",
          value: 4,
        },
      ],
      statusList: [
        //试题状态
        {
          id: 1,
          label: "开启",
          value: 1,
        },
        {
          id: 0,
          label: "禁用",
          value: 0,
        },
      ],
      tableData: [], //表格数据
      condition: "", //定义一个试题状态
    };
  },
  components: {},
  methods: {
    getTestQuestionList() {
      //查询题库列表
      this.$api.getTestQuestiona(this.form).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          res.data.rows.map((item) => {
            if (item.status == 1) {
              item.switch = true;
            } else {
              item.switch = false;
            }
          });
          this.tableData = res.data;
        }
      });
    },
    visibleChange(val) {
      //打开关联教材下拉框并搜索关联教材
      if (val) {
        if (this.form.jobId && this.form.level) {
          this.$api
            .findQustionBanks({
              jobId: this.form.jobId,
              level: this.form.level.toString(),
            })
            .then((res) => {
              //   console.log(res);
              if (res.code == 0) {
                this.teachingIdList = res.data;
              }
            });
        } else {
          this.$message.error("请先选择职业功能和职业等级");
        }
      }
    },
    search() {
      //搜索
      this.form.pageNo = 1;
      this.getTestQuestionList(); //查询题库列表的方法
    },
    changeSwitch(e, row) {
      //改变考试题状态
      // console.log(e, row);
      this.condition = "";
      if (e) {
        this.condition = 1;
      } else {
        this.condition = 0;
      }
      this.$api
        .updateStatusa({
          id: row.id,
          topicType: this.form.topicType,
          status: this.condition,
        })
        .then((res) => {
          //   console.log(res);
          if (res.code == 0) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    handleEdit(index, row) {
      //编辑
      // console.log(index, row);
      localStorage.setItem("editPascal", JSON.stringify(row));
      //   sessionStorage.setItem("path", "/editPascal");
      this.$router.push("/editPascala");
    },
    handleDelete(index, row) {
      //删除
      // console.log(index, row);
      this.$confirm("此操作将永久删除该试题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .delQuestionsa({
              id: row.id,
              topicType: this.form.topicType,
            })
            .then((res) => {
              // console.log(res);
              if (res.code == 0) {
                this.getTestQuestionList(); //查询题库列表的方法
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.getTestQuestionList(); //查询题库列表的方法
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.form.pageNo = val;
      this.getTestQuestionList(); //查询题库列表的方法
    },
  },
  created() {
    this.$api.getJobfindJob().then((res) => {
      // console.log(res);
      if (res.code == 0) {
        this.options = res.data;
      }
    });
    // if (sessionStorage.getItem("CareerList")) {
    //   this.options = JSON.parse(sessionStorage.getItem("CareerList"));
    // } else {
    //   this.$api.findOccupationList().then((res) => {
    //     this.options = res.data;
    //     sessionStorage.setItem("CareerList", JSON.stringify(res.data));
    //   });
    // }
    this.getTestQuestionList(); //查询题库列表的方法
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
.nav {
  background-color: #2290ff;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  border-radius: 5px;
}
.contenta {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.contenta1 {
  display: flex;
}
.texts {
  font-size: 13px;
  color: #474e5f;
  margin-right: 5px;
}
.selet {
  margin-right: 20px;
}
.keyword {
  display: flex;
  align-items: center;
}
.contenta2 {
  display: flex;
  margin-top: 20px;
}
.contentb {
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
}
.pagination {
  text-align: center;
  margin: 10px;
}
</style>