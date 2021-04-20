<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">我的备案</a>-方案资料上传
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
    <div style="margin: 100px auto; width: 90%; height: 300px">
      <div style="float: left; width: 50%" class="from_box">
        <div class="unloads">
          <div class="unload">
            <el-upload
              class="upload-demo upload"
              drag
              action
              :on-change="upload"
              :show-file-list="true"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </div>
        <div style="overflow: hidden; margin-top: 20px">
          <div class="import_but" @click="onChange">导入</div>
          <div
            class="import_but"
            style="background: #d5d5d5; color: #fff; margin-left: 20px"
            @click="back"
          >
            取消
          </div>
        </div>
      </div>
      <div class="form_tips">
        <p>文件说明：</p>
        <p>1. 最多支持上传五个文件，多个文件，建议压缩后上传</p>
        <p>2. 图片格式支持：jpg、png、jpeg、gif、bmp。最大不超过200k</p>
        <p>3. 文档格式支持：pdf、docx，表格为Excel格式,最大不超过5 M</p>
        <p>5. 请上传职业技能等级认定试点工作方案,签字盖章PDF版本</p>
        <p></p>
      </div>
    </div>
    <div class="bottom_box center_box">
      <div style="width: 300px; height: 100%; overflow: hidden">
        <div class="back_but" @click="lastStep">上一步</div>
        <div class="back_but bottom_but_right" @click="submit">下一步</div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/data_upload.css";

.avatar-uploader-icon {
  width: 120px !important;
}
.inpt {
  width: 200px;
}
.inpt > div {
  width: 100px;
  padding: 10px 0;
}
.unloads {
  display: flex;
}
.upload {
}
.uploadText {
}
</style>
<script>
import ObsClient from "../../static/esdk-obs-browserjs-without-polyfill-3.19.5.min.js";
export default {
  name: "",
  data() {
    return {
      imageUrl: "",
      file: "",
      fileList: [],
                        urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
    };
  },
  created() {
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
    // console.log(localStorage.getItem("material"));
  },
  methods: {
    upload(file, fileList) {
      this.fileList = fileList;
    },

    lastStep() {
      this.$router.push("/newPlan");
    },
    submit() {
      this.$router.push("/newPlan");
    },
    unload() {},
    onChange() {
      // console.log(this.fileList);
      let that = this;
      var obsClient = new ObsClient({
        access_key_id: "LXN6KLTYFWIRAZYKDOOZ",
        secret_access_key: "bmel18q7qBWJ2h85xEONrbVxAqHV57f29Z3IAX2A",
        server: "https://obs.cn-southwest-2.myhuaweicloud.com",
      });
      that.fileList.map((item) => {
        obsClient.putObject(
          {
            Bucket: "skill-identification", //document.getElementById('stringToUpload').files[0]
            Key: "filelist/" + item.name, // 存储在obs的文件。可写成file/name即会生成file文件夹name文件
            SourceFile: item.raw, // 文件上传使用sourceFile文本上传采用Body
          },
          function (err, result) {
            // console.log(err, result);
            if (err) {
              console.error("Error-->" + err);
            } else {
              // console.log("Status-->" + result.CommonMsg.Status);
              let list = [];
              that.fileList.map((item) => {
                let obj = {};
                obj.name = item.name;
                obj.type = localStorage.getItem("material");
                obj.fileAddress =
                  "https://" +
                  "skill-identification.obs.cn-southwest-2.myhuaweicloud.com/filelist/" +
                  item.name;
                list.push(obj);
              });
              that.$api.importProgramme(list).then((res) => {
                // console.log(res);
                if (res.code == 0) {
                  that.$message.success(res.msg);
                  that.$router.push("/newPlan");
                }
              });
            }
          }
        );
      });
    },
    back(){
      this.$router.push("/newPlan")
    }
  },
  components: {},
};
</script>