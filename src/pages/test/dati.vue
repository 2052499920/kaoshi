<template>
  <div style="padding: 2%">
    <!-- <el-button type="primary" @click="exportExcel" style="float: left;">新增广告</el-button> -->
    <el-table
      id="out-table"
      :data="tableData"
      style="width: 100%; margin-top: 4%"
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="nickname" label="昵称">
        <template slot-scope="scope">
          <p>{{ scope.row.user_info.nickname }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="user_type" label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.user_info.avatar"
            style="width: 100px; height: 100px"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="title" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="show_details(scope.row)" type="warning"
            >详情</el-button
          >
          <el-button @click="del(scope.row)" type="warning">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div v-for="item in obj">
            <p style="margin-left: 10px;">{{item.title}}</p>
            <el-tag v-for="item in item.list" type="success" style="margin-left: 10px;">{{item}}</el-tag>
        </div>
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
      tableData: [],
      value: "",
      dialogVisible: false,
      edit_id: null,
      link: "",
      radio1: 1,
      page: 1,
      pages: 1,
      obj: "",
    };
  },
  methods: {
    // 打开编辑
    show_details(e) {
      this.dialogVisible = true;
      let data = e.data.split("&");
      data.pop()
      console.log(data);
      let list = [];
      data.forEach((element, i) => {
        element = element.slice(0, element.length - 1);
        
        let obj = {};
        obj.title = element.split("：")[0];
        obj.list = element.split("：")[1].split(",");
        list.push(obj);
      });
        this.obj = list;
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
      let obj = { img: this.value, link: this.link, type: this.radio1 };
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
        .post("/tiku", {
          get_dati_jilu_list: "get_dati_jilu_list",
          page: limit,
        })
        .then((res) => {
          this.tableData = res.data.data;
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