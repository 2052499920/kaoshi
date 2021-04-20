<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">我的备案</a>-新增职业
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
            style="background-color: #ededed"
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
        <el-form
          :model="profession"
          :rules="rulesb"
          ref="profession"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="职业工种" prop="classify">
            <el-select
              v-model="profession.classify"
              placeholder="请选择职业工种"
              style="width: 350px"
            >
              <el-option
                v-for="item in classifyList"
                :key="item.id"
                :label="item.jobCode + '-' + item.jobName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择等级" prop="grade">
            <el-checkbox-group v-model="profession.grade">
              <el-checkbox label="1">一级</el-checkbox>
              <el-checkbox label="2">二级</el-checkbox>
              <el-checkbox label="3">三级</el-checkbox>
              <el-checkbox label="4">四级</el-checkbox>
              <el-checkbox label="5">五级</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="标准类别" prop="standard">
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
          </el-form-item>
          <el-form-item label="选择文件" :prop="sel">
            <el-input
              disabled
              style="width: 270px; float: left; height: 30px"
              v-model="profession.file"
            ></el-input>
            <el-upload
              action
              class="upload-demo"
              :show-file-list="true"
              :auto-upload="false"
              :on-change="handleChange"
              accept=".zip,.rar"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="nextStepTow('profession')"
              >下一步</el-button
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
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      data: {
        personnelType: "",
      },
      profession: {
        classify: "",
        grade: [],
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
      dialogOfUpload: false,
      fileList: [],
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
      fileAddress: "",
    };
  },
  created() {
    if (sessionStorage.getItem("CareerList")) {
      this.classifyList = JSON.parse(sessionStorage.getItem("CareerList"));
    } else {
      this.$api.findOccupationList().then((res) => {
        this.classifyList = res.data;
        sessionStorage.setItem("CareerList", JSON.stringify(res.data));
      });
    }
    // this.getfindJobInfo();
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
      this.$refs[profession].validate((valid) => {
        if (valid) {
          this.$api
            .addJobInfo({
              id: "",
              jobId: this.profession.classify,
              level: this.profession.grade.sort().toString(),
              jobType: this.profession.standard,
              jobStandards: this.profession.file,
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
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    selectStandard(val) {
      // console.log(val);
      if (val == 1) {
        this.sel = "";
        this.profession.file = "";
      } else {
        this.sel = "file";
        this.profession.file = "";
      }
    },
    handleChange(file) {
      //  console.log(this.fileList);
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
            // console.error("Error-->" + err);
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

    confirmUpload() {
      //确认上传
      // var param = new FormData();
      // this.fileList.forEach((val, index) => {
      //   console.log(val);
      //   param.append("file", val.raw);
      // });
      // console.log(param);
      // axios.post("http://116.63.172.55:8089/online/personnel/importPersonnel", param,{}).then(responce => {});
      // this.$message({
      // 	message: "上传成功！",
      // 	duration: 1000
      // });
      // var datas = {
      //   file: param,
      // };
    },

    onChange(file) {
      var param = new FormData();
      param.append("file", file.raw);
      //上传文件
      // console.log(file);
      // this.uploadRequest(file);
      // this.profession.file = 'http://www.baido.com'
      //  const workbook = xlsx.read(file, {type: 'array'})
      //   console.log(workbook);
      // console.log(list);
      axios
        .post("http://116.63.172.55:8089/online/personnel/importPersonnel", {
          personnelType: "1",
          fileinput: param,
        })
        .then((res) => {
          // console.log(res);
        });
      // setTimeout(() => {
      //   this.$api.importPersonnel(param).then((res) => {
      //     console.log(res);
      //   });
      // }, 500);
    },

    uploadRequest: function (option, code) {
      const that = this;
      // 授权
      var cos = that.getOss();
      // console.log(option);
      var file = option.raw;
      var filetype = file.name.substring(
        file.name.lastIndexOf("."),
        file.name.length
      );
      var random_name =
        "wjwfiles/advert/" + new Date() + "/" + file.uid + filetype;
      try {
        cos.putObject(
          {
            Bucket: "wj-1303870608" /* 必须 */,
            Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
            Key: random_name /* 必须 */,
            StorageClass: "STANDARD",
            Body: file, // 上传文件对象
            onProgress: function (progressData) {
              // console.log(progressData);
            },
          },
          function (err, data) {
            // console.log(err, data);
            // console.log("1");
            // //成功err为空，失败data为空
            // console.log(err || data);
            let adUrl = "http://" + data.Location;
            // console.log(adUrl);
            // if (code == 0) {
            //   that.shopPictures.push(adUrl);
            //   console.log(that.shopPictures);
            // } else if (code == 1) {
            //   that.license.push(adUrl);
            // }
          }
        );
      } catch (error) {
        // console.error(error);
        option.onError("上传失败");
        // vm.loading = false;
      }
    },
    getOss: function () {
      const that = this;
      var cos = new COS({
        // 必选参数
        getAuthorization: function (options, callback) {
          // console.log(1111);
          that.$api.getCos().then((response) => {
            // console.log(response);
            var data = response;
            var credentials = data && data.credentials;
            if (!data || !credentials)
              return console.error("credentials invalid");
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
            });
          });
        },
      });
      return cos;
    },
    lastStep() {
      this.$router.push("/add_career");
    },
  },
  components: {},
};
</script>