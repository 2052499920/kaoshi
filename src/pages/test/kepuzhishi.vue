<template>
  <div style="padding: 2%">
    <router-link to="/add_kepuzhishi">
      <el-button type="primary" style="float: left">新增科普知识</el-button>
    </router-link>
    <el-table
      id="out-table"
      :data="tableData"
      style="width: 100%; margin-top: 4%"
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="user_type" label="内容">
        <template slot-scope="scope">
          <p v-html="scope.row.html"></p>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="paixu(scope.row)" type="warning"
            >修改排序</el-button
          >
          <el-button @click="edit(scope.row)" type="warning">编辑</el-button>
          <el-button @click="del(scope.row)" type="warning">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
        tableData: [],
        value: '',
        edit_id: null,
        title: '',
        radio1: 1,
        pages: 1,
        page: 1,
      };
    },
    methods: {
      paixu(e) {
        let obj = e
        obj.edit_id = e.id
         this.$prompt('请输入新的排序(越小越靠前)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          obj.sort = value
          axios
          .post("/kepuzhishi", obj)
          .then((res) => {
            this.edit_id = null;
            this.get_list(this.page);
          });
        }).catch(() => {      
        });
      },
      // 打开编辑
      edit(e) {
        this.$router.push('/add_kepuzhishi?id=' + e.id) 
      },

      // 删除
      del(e) {
        this.$confirm(
          "此操作将永久删除, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            axios
              .post("/kepuzhishi", { del_id: e.id })
              .then((res) => {
                if (res.data.code == 200) {
                  this.get_list(this.page);
                } else {
                  this.$message.error("操作失败");
                }
              });
          })
          .catch(() => { });
      },

      sub() {
        let obj = { icon: this.value, title: this.title }
        if(this.edit_id) {
          obj.edit_id = this.edit_id
        }else {
          obj.add = 'add'
        }
        axios
          .post("/kepuzhishi", obj)
          .then((res) => {
            this.edit_id = null;
            this.get_list(this.page);
          });
      },

      handleCurrentChange(currentPage) {
        this.get_list(currentPage);
      },

      get_list(limit) {
        axios
          .post("/kepuzhishi", { query: "query", page: limit })
          .then((res) => {
            this.tableData = res.data.data;
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