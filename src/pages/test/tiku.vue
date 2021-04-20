<template>
  <div style="padding: 2%">
    <el-button type="primary" @click="exportExcel" style="float: left"
      >新增题目</el-button
    >
    <el-table
      id="out-table"
      :data="tableData"
      style="width: 100%; margin-top: 4%"
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="title" label="题目标题"></el-table-column>
      <el-table-column prop="user_type" label="图片">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.xuanxiang" type="success" style="margin-top: 10px; margin-left: 10px;">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="warning">编辑</el-button>
          <el-button @click="del(scope.row)" type="warning">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input
        style="width: 300px; margin-top: 20px; display: block"
        placeholder="请输入题目标题"
        v-model="title"
      />
      <el-input
        style="width: 300px; margin-top: 20px; display: block"
        placeholder="请输入题目选项(用英文逗号隔开)"
        v-model="xuanxiang"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
    <div style="float: right; margin-top: 4%; padding-bottom: 4%">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="pages * 10"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  created() {
    this.get_list(this.page);
  },
  data() {
    return {
      page: 1,
      tableData: [],
      value: "",
      dialogVisible: false,
      edit_id: null,
      title: "",
      radio1: 1,
      pages: 1,
      xuanxiang: "",
      title: "",
    };
  },
  methods: {
    // 打开编辑
    edit(e) {
      this.xuanxiang = e.xuanxiang;
      this.title = e.title;
      this.dialogVisible = true;
      this.edit_id = e.id;
    },

    // 删除
    del(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.post("/tiku", { del_id: e.id }).then((res) => {
            if (res.data.code == 200) {
              this.get_list(this.page);
            } else {
              this.$message.error("操作失败");
            }
          });
        })
        .catch(() => {});
    },

    sub() {
      let obj = { title: this.title, xuanxiang: this.xuanxiang };
      if (this.edit_id) {
        obj.edit_id = this.edit_id;
      } else {
        obj.add = "add";
      }
      axios.post("/tiku", obj).then((res) => {
        this.edit_id = null;
        this.dialogVisible = false;
        this.get_list(this.page);
      });
    },

    handleCurrentChange(currentPage) {
      this.get_list(currentPage);
    },

    exportExcel() {
      this.dialogVisible = true;
    },

    get_list(limit) {
      axios
        .post("/tiku", { query: "query", page: limit })
        .then((res) => {
            res.data.data.forEach(element => {
                if(element.xuanxiang) {
                    element.xuanxiang = element.xuanxiang.split(',')
                }
            });
          this.tableData = res.data.data;
          console.log(this.tableData);
          this.pages = res.data.pages;
        });
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.value = res;
    },
  },
};
</script>

<style scoped>
.ccc {
}
</style>