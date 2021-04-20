<template>
  <div style="padding: 2%">
    <el-table
      id="out-table"
      :data="tableData"
      style="width: 100%; margin-top: 4%"
    >
      <el-table-column prop="id" label="序号"></el-table-column>

      <el-table-column prop="user_type" label="内容">
        <template slot-scope="scope">
          <img :src="scope.row.user.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="标题"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="title" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="warning">删除</el-button>
        </template>
      </el-table-column>
            <el-table-column prop="title" label="是否展示" width="200">
        <template slot-scope="scope">
          <el-switch
          @change="show_cahange(scope.row)"
            v-model="scope.row.show == 1 ? true : false"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
      value: "",
      edit_id: null,
      title: "",
      radio1: 1,
      pages: 1,
      page: 1,
    };
  },
  methods: {
    show_cahange(e) {
      console.log(e.show == 0 ? 1 : 0);
      // return
      axios.post("/liuyan", { edit_id: e.id, show: e.show == 0 ? 1 : 0 }).then((res) => {
        this.edit_id = null;
        this.get_list(this.page);
      });
    },
    // 打开编辑
    edit(e) {
      this.$router.push("/add_liuyan?id=" + e.id);
    },

    // 删除
    del(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("/liuyan", { del_id: e.id })
            .then((res) => {
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
      let obj = { icon: this.value, title: this.title };
      if (this.edit_id) {
        obj.edit_id = this.edit_id;
      } else {
        obj.add = "add";
      }
      axios.post("/liuyan", obj).then((res) => {
        this.edit_id = null;
        this.get_list(this.page);
      });
    },

    handleCurrentChange(currentPage) {
      this.get_list(currentPage);
    },

    get_list(limit) {
      axios
        .post("/liuyan", { query: "query", page: limit, b: 'b' })
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