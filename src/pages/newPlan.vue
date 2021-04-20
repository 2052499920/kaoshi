<!-- 登录界面 -->
<template>
  <div style="position: relative; height: 100%">
    <div class="top_title">
      当前位置：职业管理-<a style="cursor: pointer">我的职业</a>-方案
    </div>
    <div style="overflow: hidden; width: 90%; margin: 50px auto">
           <el-row :gutter="20">
        <el-col :span="6" class="center_box">
          <router-link
            to="/record_info"
            class="item_box"
          >
            <div style="overflow: hidden">
              <span class="item_box_text">基本信息</span>
              <img :src="urla" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/add_career" class="item_box" >
            <div style="overflow: hidden">
              <span class="item_box_text">职业信息</span>
              <img :src="urlb" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/team_info" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">人员队伍信息</span>
              <img :src="urlc" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/newPlan" class="item_box" style="background-color: #EDEDED">
            <div style="overflow: hidden">
              <span class="item_box_text">方案和资料上传</span>
              <img :src="urld" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div style="overflow: hidden">
      <el-dropdown trigger="click" size="mini" @command="hander">
        <div class="button">上传 <i class="el-icon-caret-bottom"></i></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in list"
            :key="index"
            :command="item.value"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div style="margin: 20px auto; width: 100%">
      <el-table :data="tableData.rows" style="width: 100%">
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.certificatesType
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUplload(scope.$index, scope.row)"
              >下载</el-button
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

    <div class="bottom_box center_box">
      <div style="width: 300px; height: 100%; overflow: hidden">
        <div class="back_but" @click="lastStep">上一步</div>
        <div class="back_but bottom_but_right" @click="add">提交</div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/add_career.css";
.page {
  text-align: right;
  margin: 15px 50px 10px 0;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      tableData: [],
      list: [
        { name: "工作方案", value: 1 },
        { name: "场地情况", value: 2 },
        { name: "设备设施情况", value: 3 },
        { name: "法人登记证书", value: 4 },
        { name: "题库建设情况", value: 5 },
        { name: "人员技术技能情况", value: 6 },
        { name: "管理制度", value: 7 },
        { name: "央企备案回执", value: 8 },
        { name: "专业优势", value: 9 },
        { name: "信息化建设情况", value: 10 },
        { name: "监控设备配置情况", value: 11 },
        { name: "职业技能等级认定工作承诺书", value: 12 },
        { name: "备案机构郑虎样板、印章样式", value: 13 },
      ],
      tableData: [],
      pageNo: "1",
      pageSize: "5",
      geshi: [
        "bmp",
        "jpg",
        "png",
        "tif",
        "gif",
        "pcx",
        "tga",
        "exif",
        "fpx",
        "svg",
        "psd",
        "cdr",
        "pcd",
        "dxf",
        "ufo",
        "eps",
        "ai",
        "raw",
        "WMF",
        "webp",
        "avif",
      ],
                        urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
    };
  },
  created() {
    this.getSchemeList();
            this.$api.checkSubmitReview().then((res) => {
      // console.log(res.data);
      if (res.data.oCount > 0) {
        this.urla = require("../assets/chas.jpg");
      }
      if (res.data.JobCount > 0) {
        this.urlb = require("../assets/chas.jpg");
      }
      if (res.data.personnelCount >= 4) {
        this.urlc = require("../assets/chas.jpg");
      }
      if (res.data.programmeCount >= 10) {
        this.urld = require("../assets/chas.jpg");
      }
    });
  },
  methods: {
    addProfession() {
      // this.$router.push("/data_upload");
      this.$api.submitReview().then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.$message.success("提交成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    add() {  //提交
      // this.$router.push("/data_upload");
      // console.log(111);
      this.$api.submitReview().then(res=>{
        // console.log(res);
        if(res.code == 0){
          this.$message.success(res.msg)
          this.$router.replace('/')
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    lastStep() {
      this.$router.push("team_info");
    },
    hander(val) {
      // console.log(val);
      this.$router.push("/data_upload");
      localStorage.setItem("material", val);
    },
    getSchemeList() {
      this.$api
        .getScheme({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.code == 0) {
            this.tableData = res.data;
          }
          // console.log(res);
        });
    },
    handleUplload(index, row) {
      //下载
      // console.log(index, row);
      let flag = this.geshi.some((item) => {
        return item == row.planName.slice(row.planName.lastIndexOf(".") + 1);
      });
      // console.log(flag);
      if (flag) {
        this.downloadIamge(row.fileAddress, row.planName);
      } else {
        const a = document.createElement("a"); // 创建a标签
        a.setAttribute("download", ""); // download属性
        a.setAttribute("href", row.fileAddress); // href链接
        a.click(); // 自执行点击事件
      }
    },
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },

    handleDelete(index, row) {
      //删除
      var ids = [];
      ids.push(row.id);
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.delProgramme(ids).then((res) => {
            // console.log(res);
          });
          this.$message({
            type: "success",
            message: "删除成功!",
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
      this.getSchemeList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getSchemeList();
    },
  },
  components: {},
};
</script>