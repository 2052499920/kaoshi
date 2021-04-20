<template>
  <div style="padding: 2%;">
    <!-- <el-button type="primary" @click="exportExcel" style="float: left;">新增广告</el-button> -->
    <el-table id="out-table" :data="tableData" style="width: 100%; margin-top: 4%;">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="user_type" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 100px; height: 100px;" alt="">
        </template>
      </el-table-column>
      <!-- <el-table-column prop="title" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="warning">编辑</el-button>
          <el-button @click="del(scope.row)" type="warning">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-radio-group v-model="radio1">
      <el-radio-button label="1">顶部</el-radio-button>
      <el-radio-button label="2">中部</el-radio-button>
    </el-radio-group>
      <el-upload style="margin-top: 20px;" class="avatar-uploader" action="/uploadsFile" name="file" :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="value" :src="'/public/static/img/' + value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input
      style="width: 300px; margin-top: 20px; display: block"
      placeholder="请输入跳转路径"
      v-model="link"
    />
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>

        <div style="float: right; margin-top: 4%;padding-bottom: 4%;">
      <el-pagination  @current-change="handleCurrentChange"
         layout="prev, pager, next, jumper" :total="pages*10"></el-pagination>
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
        dialogVisible: false,
        edit_id: null,
        link: '',
        radio1: 1,
        page: 1,
        pages: 1,
      };
    },
    methods: {

      // 打开编辑
      edit(e) {
        this.radio1 = e.type
        this.value = e.img;
        this.link = e.link
        this.dialogVisible = true;
        this.edit_id = e.id;
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
              .post("/user", { del_id: e.id })
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
        let obj = { img: this.value, link: this.link, type: this.radio1 }
        if(this.edit_id) {
          obj.edit_id = this.edit_id
        }else {
          obj.add = 'add'
        }
        axios
          .post("/user", obj)
          .then((res) => {
            this.edit_id = null;
            this.dialogVisible = false
            this.get_list(this.page);
          });
      },

      handleCurrentChange(currentPage) {
        this.get_list(currentPage);
      },

      exportExcel() {
        this.dialogVisible = true
      },

      get_list(limit) {
        axios
          .post("/user", { get_user_info_list: "get_user_info_list", page: limit })
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
  .ccc {}
</style>