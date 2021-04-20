<template>
  <div>
    <div class="nav">
      <div>职业工种</div>
    </div>
    <div class="add">
      <el-button type="primary" size="mini" @click="add">新增工种</el-button>
    </div>
    <div>
      <el-table :data="tableData.rows" style="width: 100%">
        <el-table-column label="工种编码" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.jobCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工种名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.jobName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color: #f8902a"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <div>
      <el-dialog
        title="新增工种"
        @close="cancel('ruleForm')"
        :visible.sync="show"
        width="600px"
        :close-on-click-modal="false"
      >
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="工种编码" label-width="80px" prop="jobId">
            <el-input
              type="number"
              size="small"
              style="width: 300px"
              v-model="form.jobId"
              placeholder="请输入工种编码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="工种名称" prop="teachName" label-width="80px">
            <el-input
              size="small"
              style="width: 300px"
              v-model="form.teachName"
              placeholder="请输入工种名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="tijiao">
          <el-button @click="cancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submit('ruleForm')"
            >提 交</el-button
          >
        </div>
      </el-dialog>
    </div>

    <div>
      <div>
        <el-dialog
          title="编辑工种"
          @close="cancela('ruleForma')"
          :visible.sync="showa"
          width="600px"
          :close-on-click-modal="false"
        >
          <el-form :model="forma" :rules="rulesa" ref="ruleForma">
            <el-form-item label="工种编码" label-width="80px" prop="jobId">
              <el-input
                type="number"
                size="small"
                style="width: 300px"
                v-model="forma.jobId"
                placeholder="请输入工种编码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="工种名称" prop="teachName" label-width="80px">
              <el-input
                style="width: 220px"
                v-model="forma.teachName"
                placeholder="请输入工种名称"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="tijiao">
            <el-button @click.stop="cancela('ruleForma')">取 消</el-button>
            <el-button type="primary" @click="submita('ruleForma')"
              >提 交</el-button
            >
          </div>
        </el-dialog>
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
      show: false,
      showa: false,
      form: {
        jobId: "", //职业工种id
        teachName: "", //工种名称
      },
      forma: {
        jobId: "", //职业工种id
        teachName: "", //工种名称
        id: "", //编辑时上传
      },
      options: [],
      rules: {
        jobId: [
          { required: true, message: "职业编码不能为空", trigger: "blur" },
        ],
        teachName: [
          { required: true, message: "工种名称不能为空", trigger: "blur" },
        ],
      },
      rulesa: {
        jobId: [
          { required: true, message: "职业编码不能为空", trigger: "blur" },
        ],
        teachName: [
          { required: true, message: "工种名称不能为空", trigger: "blur" },
        ],
      },
      tableData: [], //表格数据
      getFrom: {
        pageNo: 1, //当前页码
        pageSize: 5, //每页数量
      },
    };
  },
  components: {},
  methods: {
    add() {
      //新增按钮
      this.show = true;
    },
    cancel(ruleForm) {
      //取消新增
      this.$refs.ruleForm.resetFields();
      this.show = false;
    },
    submit(ruleForm) {
      //确定新增
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$api
            .saveOccupation({
              jobCode: this.form.jobId,
              jobName: this.form.teachName,
            })
            .then((res) => {
              // console.log(res);
              if (res.code == 0) {
                this.$refs.ruleForm.resetFields();
                this.show = false;
                this.getTextbookList();
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          this.$message.error("表单填写不完整");
          return false;
        }
      });
    },
    getTextbookList() {
      //获取工种列表
      this.$api.getTeachingByPage(this.getFrom).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    handleEdit(index, row) {
      //编辑
      this.forma.id = row.id;
      this.forma = row;
      this.showa = true;
    },
    cancela(ruleForma) {
      //取消编辑
      this.showa = false;
    },
    submita(ruleForma) {
      //确定编辑
      // console.log(this.forma);
      this.$refs[ruleForma].validate((valid) => {
        if (valid) {
          this.$api.saveTeaching({
             jobCode: this.form.jobId,
              jobName: this.form.teachName,
              id: this.form.id,
          }).then((res) => {
            if (res.code == 0) {
              this.showa = false;
              this.getTextbookList();
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("表单填写不完整");
          return false;
        }
      });
    },

    handleDelete(index, row) {
      //删除
      // console.log(index, row);
      this.$confirm("此操作将永久删除该教材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.delCraft(row.id).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getTextbookList();
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
      // console.log(`每页 ${val} 条`);
      this.getFrom.pageSize = val;
      this.getTextbookList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getFrom.pageNo = val;
      this.getTextbookList();
    },
  },
  created() {
    this.getTextbookList();
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
.add {
  padding: 8px 0 8px 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px #cdd1d3;
  margin: 20px 0;
}
.tijiao {
  text-align: center;
}
.pagination {
  text-align: center;
  padding: 30px 0;
  background-color: #fff;
}
</style>