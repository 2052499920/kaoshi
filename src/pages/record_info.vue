<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">我的备案</a>-基本信息
    </div>
    <div style="overflow: hidden; width: 90%; margin: 50px auto">
      <el-row :gutter="20">
        <el-col :span="6" class="center_box">
          <router-link
            to="/record_info"
            class="item_box"
            style="background-color: #EDEDED"
          >
            <div style="overflow: hidden">
              <span class="item_box_text">基本信息</span>
              <img :src="urla" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/add_career" class="item_box">
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
    <div style="margin: 50px 100px 19px 150px; width: 90%; height: 400px">
      <div style="float: left" class="from_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <div class="form">
            <div>
              <el-form-item label="评价机构类型" prop="genre">
                <el-radio v-model="ruleForm.radio" label="1">用人单位</el-radio>
                <el-radio v-model="ruleForm.radio" label="2"
                  >社会评价组织机构</el-radio
                >
                <el-radio v-model="ruleForm.radio" label="3">技工院校</el-radio>
              </el-form-item>
              <el-form-item label="评价机构种类" prop="kind">
                <el-select
                  :disabled="flag"
                  v-model="ruleForm.kind"
                  placeholder="请选择种类"
                  style="width: 350px"
                  @change="changekind"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="评价机构属性" prop="attribute">
                <el-select
                  :disabled="flag"
                  v-model="ruleForm.attribute"
                  placeholder="请选择属性"
                  style="width: 350px"
                  @change="changeAttribute"
                >
                  <el-option
                    v-for="item in attributeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-if="ruleForm.attribute == 2" label="所属机构">
                <el-select
                  :disabled="flag"
                  v-model="ruleForm.organization"
                  placeholder="请选择所属机构"
                  style="width: 350px"
                >
                  <el-option
                    v-for="item in organizationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-if="ruleForm.attribute == 3" label="央企代码">
                <el-input
                  v-model="ruleForm.central"
                  placeholder="请输入央企代码"
                  maxlength="4"
                ></el-input>
                <!-- <div class="central">央企在部中心备案时的四位数字</div> -->
              </el-form-item>

              <el-form-item label="评价机构性质" prop="nature">
                <el-select
                  :disabled="flag"
                  v-model="ruleForm.nature"
                  placeholder="请选择性质"
                  style="width: 350px"
                >
                  <el-option
                    v-for="item in natureList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="评价机构名称" prop="organizationName">
                <el-input
                  v-model="ruleForm.organizationName"
                  placeholder="请输入机构名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="社会信用代码" prop="creditCode">
                <el-input
                  maxlength="18"
                  v-model="ruleForm.creditCode"
                  placeholder="18个字符由数字+字母组合"
                ></el-input>
              </el-form-item>
            </div>
            <div class="formb">
              <el-form-item label="地址" prop="site">
                <el-input
                  style="width: 350px"
                  placeholder="请输入公司地址"
                  v-model="ruleForm.site"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="linkmanName">
                <el-input
                  style="width: 350px"
                  placeholder="请输入联系人姓名"
                  v-model="ruleForm.linkmanName"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="linkmanPhone">
                <el-input
                  style="width: 350px"
                  placeholder="请输入联系人电话"
                  v-model="ruleForm.linkmanPhone"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="职务" prop="job">
                <el-input
                  style="width: 350px"
                  placeholder="请输入职务"
                  v-model="ruleForm.job"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="mailbox">
                <el-input
                  style="width: 350px"
                  placeholder="请输入邮箱"
                  v-model="ruleForm.mailbox"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item>
            <el-button
              :disabled="show"
              type="primary"
              @click="nextStep('ruleForm')"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="center"></div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/record_info.css";
</style>

<script>
import Button from "../m/button/button.vue";
export default {
  name: "login",
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系人手机号不能为空"));
      } else {
        if (
          !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
            value
          )
        ) {
          return callback(new Error("手机号码有误，请重新输入"));
        } else {
          callback();
        }
      }
    };
    return {
      urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
      ruleForm: {
        radio: "",
        kind: "",
        attribute: "",
        nature: "",
        organizationName: "",
        creditCode: "",
        site: "",
        linkmanName: "",
        linkmanPhone: "",
        job: "",
        mailbox: "",
        central: "",
        organization: "",
      },
      flag: true,
      options: [
        {
          value: "请选择种类",
          label: "请选择种类",
        },
      ],
      attributeList: [
        {
          value: "1",
          label: "省级机构",
        },
        {
          value: "2",
          label: "市级机构",
        },
        {
          value: "3",
          label: "中央机构",
        },
      ],
      value: "",
      natureList: [],
      flags: true,
      organizationList: [],
      rules: {
        radio: [
          { required: true, message: "评价机构类型不能为空", trigger: "blur" },
        ],
        kind: [
          { required: true, message: "评价机构种类不能为空", trigger: "blur" },
        ],
        attribute: [
          { required: true, message: "评价机构属性不能为空", trigger: "blur" },
        ],
        nature: [
          { required: true, message: "评价机构性质不能为空", trigger: "blur" },
        ],
        organizationName: [
          { required: true, message: "评价机构名称不能为空", trigger: "blur" },
        ],
        creditCode: [
          { required: true, message: "社会信用代码不能为空", trigger: "blur" },
          { min: 18, message: "长度为18个字符", trigger: "chamg" },
        ],
        site: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        linkmanName: [
          { required: true, message: "联系人姓名不能为空", trigger: "blur" },
        ],
        linkmanPhone: [
          { required: true, validator: checkphone, trigger: "blur" },
        ],
      },
      show: false,
      list: [
        {
          value: "1",
          label: "省级机构",
        },
        {
          value: "2",
          label: "市级机构",
        },
        {
          value: "3",
          label: "中央机构",
        },
      ],
      lista: [
        {
          value: "1",
          label: "企业",
        },
        {
          value: "2",
          label: "技工院校",
        },
        {
          value: "3",
          label: "行业(学会)协会",
        },
        {
          value: "4",
          label: "其他",
        },
      ],
      listb: [
        {
          value: "1",
          label: "国有",
        },
        {
          value: "2",
          label: "民营",
        },
        {
          value: "3",
          label: "外资",
        },
        {
          value: "4",
          label: "其他",
        },
        {
          value: "5",
          label: "厅直属技工院校",
        },
        {
          value: "6",
          label: "公办技工院校",
        },
        {
          value: "7",
          label: "民办技工院校",
        },
        {
          value: "8",
          label: "部署回行业(学会)协会",
        },
        {
          value: "9",
          label: "省署行业(学会)协会",
        },
        {
          value: "10",
          label: "市署行业(学会)协会",
        },
        {
          value: "11",
          label: "其他",
        },
      ],
    };
  },
  created() {
    this.$api.findBasicInfo().then((res) => {
      // console.log(res);
      this.$api.findList(res.data.oType).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.natureList = res.data;
        }
      });
      if (res.data) {
        (this.ruleForm.radio = String(res.data.type)),
          (this.ruleForm.kind = res.data.oType),
          (this.ruleForm.attribute = res.data.oAttribute),
          (this.ruleForm.nature = res.data.oNature),
          (this.ruleForm.organizationName = res.data.oName),
          (this.ruleForm.creditCode = res.data.socialCreditCode),
          (this.ruleForm.site = res.data.address),
          (this.ruleForm.linkmanName = res.data.contactName),
          (this.ruleForm.linkmanPhone = res.data.contactPhone),
          (this.ruleForm.job = res.data.duties),
          (this.ruleForm.mailbox = res.data.email),
          (this.ruleForm.central = res.data.centerCode),
          (this.ruleForm.organization = res.data.orgCode);
      }
    });
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
    nextStep(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.list.map((item) => {
            if (item.label == this.ruleForm.attribute) {
              this.ruleForm.attribute = item.value;
            }
          });
          this.lista.map((item) => {
            if (item.label == this.ruleForm.kind) {
              this.ruleForm.kind = item.value;
            }
          });
          // // console.log(newVal.attribute); nature
          this.listb.map((item) => {
            if (item.label == this.ruleForm.nature) {
              this.ruleForm.nature = item.value;
            }
          });

          this.$api
            .addInformation({
              type: this.ruleForm.radio,
              oType: this.ruleForm.kind,
              oAttribute: this.ruleForm.attribute,
              oNature: this.ruleForm.nature,
              oName: this.ruleForm.organizationName,
              socialCreditCode: this.ruleForm.creditCode,
              address: this.ruleForm.site,
              contactName: this.ruleForm.linkmanName,
              contactPhone: this.ruleForm.linkmanPhone,
              duties: this.ruleForm.job,
              email: this.ruleForm.mailbox,
              centerCode: this.ruleForm.central,
              orgCode: this.ruleForm.organization,
            })
            .then((res) => {
              // console.log(res);
              if (res.data) {
                sessionStorage.setItem("token", res.data);
              }
              this.$router.push("/add_career");
            });
        } else {
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    lastStep() {},
    affirm() {
      // console.log("确认");
    },
    changeAttribute(val) {
      // console.log(val);
      if (val == 2) {
        this.$api.chankOrganizationList().then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.organizationList = res.data;
          }
        });
      }
    },
    changekind(val) {
      // console.log(val);
      this.$api.findList(val).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.natureList = res.data;
        }
      });
    },

    //职业
    selectClassify(val) {
      // console.log(val);
    },
  },
  components: { Button },
  watch: {
    ruleForm: {
      handler(newVal) {
        // console.log(newVal);
        if (newVal.radio) {
          this.flag = false;
          if (newVal.radio == "1") {
            this.options = [
              {
                value: "1",
                label: "企业",
              },
              {
                value: "2",
                label: "技工院校",
              },
            ];
            if (Number(newVal.kind) > 2) {
              // console.log(1111111);
              this.ruleForm.kind = "";
            }
          } else if (newVal.radio == "2") {
            this.options = [
              {
                value: "1",
                label: "企业",
              },
              {
                value: "2",
                label: "技工院校",
              },
              {
                value: "3",
                label: "行业(学会)协会",
              },
              {
                value: "4",
                label: "其他",
              },
            ];
          } else {
            this.options = [
              {
                value: "2",
                label: "技工院校",
              },
              {
                value: "4",
                label: "其他",
              },
            ];
          }
        }
        if (newVal.kind) {
          if (newVal.kind == "2") {
            // console.log(111);
            // this.ruleForm.kind ="市级机构"
            if (newVal.attribute == 3) {
              this.ruleForm.attribute = "";
            }
            this.attributeList = [
              {
                value: "1",
                label: "省级机构",
              },
              {
                value: "2",
                label: "市级机构",
              },
            ];
          } else {
            // this.ruleForm.attribute = "";
            this.attributeList = [
              {
                value: "1",
                label: "省级机构",
              },
              {
                value: "2",
                label: "市级机构",
              },
              {
                value: "3",
                label: "中央机构",
              },
            ];
          }
        }
        if (newVal.attribute) {
          // console.log(newVal.attribute);
          this.list.map((item) => {
            if (item.value == newVal.attribute) {
              this.ruleForm.attribute = item.label;
            }
          });
        }
        if (newVal.kind) {
          // console.log(newVal.attribute);
          this.lista.map((item) => {
            if (item.value == newVal.kind) {
              this.ruleForm.kind = item.label;
            }
          });
        }
        //kind
        if (newVal.kind) {
          if (newVal.nature) {
            if (newVal.kind == "1" || newVal.kind == "企业") {
              // console.log(newVal.attribute); nature

              this.listb.map((item) => {
                if (item.value == newVal.nature) {
                  this.ruleForm.nature = item.label;
                }
              });
            } else if (newVal.kind == "2" || newVal.kind == "技工院校") {
              this.listb.map((item) => {
                if (item.value == newVal.nature) {
                  this.ruleForm.nature = item.label;
                }
              });
            } else if (newVal.kind == "3" || newVal.kind == "行业(学会)协会") {
              this.listb.map((item) => {
                if (item.value == newVal.nature) {
                  this.ruleForm.nature = item.label;
                }
              });
            } else if (newVal.kind == "4" || newVal.kind == "其他") {
              this.listb.map((item) => {
                if (item.value == newVal.nature) {
                  this.ruleForm.nature = item.label;
                }
              });
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.form {
  display: flex;
  align-items: center;
}
.formb {
  margin-top: 60px;
}
.center {
  display: flex;
  justify-content: center;
  margin-right: 150px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>