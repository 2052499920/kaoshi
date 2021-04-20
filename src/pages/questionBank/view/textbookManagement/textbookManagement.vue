<template>
  <div>
    <div class="nav">
      <div>教材管理</div>
    </div>
    <div class="add">
      <el-button type="primary" size="mini" @click="add">新增教材</el-button>
    </div>
    <div>
      <el-table :data="tableData.rows" style="width: 100%">
        <el-table-column label="教材名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.teachName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职业工种" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.jobCode + "-" + scope.row.jobName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职业等级" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.levelInfo }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
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
        title="新增教材"
        @close="cancel('ruleForm')"
        :visible.sync="show"
        width="600px"
        :close-on-click-modal="false"
      >
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="职业工种" label-width="80px" prop="jobId">
            <el-select v-model="form.jobId" placeholder="请选择职业工种">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.jobCode + '-' + item.jobName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职业等级" prop="level" label-width="80px">
            <el-checkbox-group v-model="form.level">
              <el-checkbox label="1">一级</el-checkbox>
              <el-checkbox label="2">二级</el-checkbox>
              <el-checkbox label="3">三级</el-checkbox>
              <el-checkbox label="4">四级</el-checkbox>
              <el-checkbox label="5">五级</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教材名称" prop="teachName" label-width="80px">
            <el-input
              style="width: 220px"
              v-model="form.teachName"
              placeholder="请输入教材名称"
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
          title="编辑教材"
          @close="cancela('ruleForma')"
          :visible.sync="showa"
          width="600px"
          :close-on-click-modal="false"
        >
          <el-form :model="forma" :rules="rulesa" ref="ruleForma">
            <el-form-item label="职业工种" label-width="80px" prop="jobId">
              <el-select v-model="forma.jobId" placeholder="请选择职业工种">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.jobCode + '-' + item.jobName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职业等级" prop="level" label-width="80px">
              <el-checkbox-group v-model="forma.level">
                <el-checkbox label="1">一级</el-checkbox>
                <el-checkbox label="2">二级</el-checkbox>
                <el-checkbox label="3">三级</el-checkbox>
                <el-checkbox label="4">四级</el-checkbox>
                <el-checkbox label="5">五级</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="教材名称" prop="teachName" label-width="80px">
              <el-input
                style="width: 220px"
                v-model="forma.teachName"
                placeholder="请输入教材名称"
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
        level: [], //职业工种等级
        teachName: "", //教材名称
        id: "", //编辑时上传
      },
      forma: {
        jobId: "", //职业工种id
        level: [], //职业工种等级
        teachName: "", //教材名称
        id: "", //编辑时上传
      },
      options: [],
      rules: {
        jobId: [
          { required: true, message: "职业工种不能为空", trigger: "blur" },
        ],
        level: [
          { required: true, message: "职业等级不能为空", trigger: "blur" },
        ],
        teachName: [
          { required: true, message: "教材名称不能为空", trigger: "blur" },
        ],
      },
      rulesa: {
        jobId: [
          { required: true, message: "职业工种不能为空", trigger: "blur" },
        ],
        level: [
          { required: true, message: "职业等级不能为空", trigger: "blur" },
        ],
        teachName: [
          { required: true, message: "教材名称不能为空", trigger: "blur" },
        ],
      },
      tableData: [], //表格数据
      getFrom: {
        jobId: "", //职业工种id
        level: [], //职业工种等级
        teachName: "", //教材名称
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
          this.form.level = this.form.level.sort().toString();
          // console.log( this.form);
          this.$api.saveTeaching(this.form).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$refs.ruleForm.resetFields();
              this.show = false;
              this.getTextbookList();
              this.$message.success(res.msg);
            } else {
              this.form.level = this.form.level.split(',');
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
      //获取教材列表
      this.$api.getTextbook(this.getFrom).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    handleEdit(index, row) {
      //编辑
      // console.log(row);
      this.forma.id = row.id;
      // row.level = row.level.;
      this.forma = row;
      this.forma.level = this.forma.level.split(",");
      // console.log(this.forma);
      this.showa = true;
    },
    cancela(ruleForma) {
      //取消编辑
      // console.log(this.forma);
      this.forma.level = this.forma.level.toString();
      // this.$refs.ruleForma.resetFields();
      this.showa = false;
    },
    submita(ruleForma) {
      //确定编辑
      // console.log(this.forma);
      this.$refs[ruleForma].validate((valid) => {
        if (valid) {
          this.forma.level = this.forma.level.sort().toString();
          // console.log( this.form);
          this.$api.saveTeaching(this.forma).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              // this.$refs.ruleForma.resetFields();
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
          this.$api.delTeaching(row.id).then((res) => {
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
    this.$api.getJobfindJob().then((res) => {
      // console.log(res);
      if (res.code == 0) {
        this.options = res.data;
      }
    });
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