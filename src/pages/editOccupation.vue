<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">我的备案</a>-编辑职业信息
    </div>
    <div style="overflow: hidden; width: 90%; margin: 50px auto">
      <el-row :gutter="20">
        <el-col :span="6" class="center_box">
          <router-link to="/record_info" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">基本信息</span>
              <img :src="urla" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link
            to="/add_career"
            class="item_box"
            style="background-color: #f7f7f7"
          >
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
          <router-link to="/newPlan" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">方案和资料上传</span>
              <img :src="urld" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <div style="float: left" class="from_box">
        <div class="edit">
          <div>职业编码：{{ job.jobCode }}</div>
          <div>职业名称：{{ job.jobName }}</div>
          <div>
            <span>标准类别：</span>
            <el-select
              v-model="profession.standard"
              placeholder="请选择标椎类别"
              style="width: 350px"
              @change="selectStandard"
            >
              <el-option
                v-for="item in standardList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <el-form
          :model="profession"
          :rules="rulesb"
          ref="profession"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="选择文件" :prop="sel">
            <el-input
              disabled
              style="width: 270px; float: left; height: 30px"
              v-model="profession.file"
            ></el-input>
            <el-upload
              class="upload-demo"
              action
              accept=".zip,.rar"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onChange"
            >
              <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="nextStepTow('profession')"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="form_tips">
        <p>职业标准导入规则：</p>
        <p>1.仅限上传压缩文件zip、rar</p>
        <p>
          2.每个职业一个压缩文件，文件名规则：职业-工种名称，如有工种必须填写工种名称
        </p>
        <p>3.若文件名含有以下字符\ / : * ? " < > | 可忽略不输入</p>
        <p>4.当标准类别是国家标准时，标准文件非必填</p>
      </div>
    </div>
    <div class="bottom_box center_box">
      <div style="width: 300px; height: 100%; overflow: hidden">
        <div class="back_but" @click="lastStep">上一步</div>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
@import "../assets/css/career_info.css";
</style>

<script>
var COS = require("../../static/cos-js-sdk-v5.min.js");
import ObsClient from "../../static/esdk-obs-browserjs-without-polyfill-3.19.5.min.js";
export default {
  name: "login",
  data() {
    return {
      profession: {
        classify: "",
        grade: "",
        standard: "",
        file: "",
      },
      classifyList: [],
      rulesb: {
        classify: [
          { required: true, message: "职业工种不能为空", trigger: "blur" },
        ],
        grade: [{ required: true, message: "等级不能为空", trigger: "blur" }],
        standard: [
          { required: true, message: "标椎类别不能为空", trigger: "blur" },
        ],
        file: [{ required: true, message: "文件不能为空", trigger: "blur" }],
      },
      standardList: [
        {
          value: "1",
          label: "国家标椎",
        },
        {
          value: "2",
          label: "行业标椎",
        },
        {
          value: "3",
          label: "企业规范",
        },
      ],
      sel: "file",
      job: "",
      jobStandards: "https://image.baidu.com/",
      urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
    };
  },
  created() {
    this.$api.findOccupationList().then((res) => {
      // console.log(res.data);
      this.classifyList = res.data;
    });
    this.job = JSON.parse(localStorage.getItem("job"));
    if (this.job.jobType == "国家标准") {
      this.profession.standard = "1";
      this.sel = "";
    } else if (this.job.jobType == "行业标准") {
      this.profession.standard = "2";
      this.sel = "file";
    } else {
      this.sel = "file";
      this.profession.standard = "3";
    }
    this.profession.file = this.job.jobStandards;
    // console.log(this.job);
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
    nextStepTow(profession) {
      //   console.log(11);

      this.$refs[profession].validate((valid) => {
        if (valid) {
          this.$api
            .addJobInfo({
              jobId: this.job.id,
              level: this.job.level,
              jobType: this.profession.standard,
              jobStandards: this.profession.file,
              id: this.job.id,
            })
            .then((res) => {
              if (res.code == 0) {
                this.$router.push("/add_career");
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          this.$message.error("非国家标椎,文件必传");
        }
      });
    },
    selectStandard(val) {
      // console.log(val);
      if (val == 1) {
        this.profession.file = "";
        this.sel = "";
      } else {
        this.sel = "file";
        this.jobStandards = "";
      }
    },
    onChange(file) {
      //上传文件
      // console.log(file);
      let that = this;
      var obsClient = new ObsClient({
        access_key_id: "LXN6KLTYFWIRAZYKDOOZ",
        secret_access_key: "bmel18q7qBWJ2h85xEONrbVxAqHV57f29Z3IAX2A",
        server: "https://obs.cn-southwest-2.myhuaweicloud.com",
      });
      obsClient.putObject(
        {
          Bucket: "skill-identification", //document.getElementById('stringToUpload').files[0]
          Key: "profession/" + file.name, // 存储在obs的文件。可写成file/name即会生成file文件夹name文件
          SourceFile: file.raw, // 文件上传使用sourceFile文本上传采用Body
        },
        function (err, result) {
          // console.log(err, result);
          if (err) {
            console.error("Error-->" + err);
          } else {
            // console.log("Status-->" + result.CommonMsg.Status);
            that.profession.file =
              "https://" +
              "skill-identification.obs.cn-southwest-2.myhuaweicloud.com/profession/" +
              file.name;
            // console.log(that.fileAddress, 111);
          }
        }
      );
    },

    lastStep() {
      this.$router.push("/add_career");
    },
  },
  components: {},
};
</script>
<style scoped>
.edit {
  margin-left: 30px;
}
.edit > div {
  margin: 15px 0;
}
</style>