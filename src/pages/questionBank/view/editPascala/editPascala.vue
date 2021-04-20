<template>
  <div>
    <div class="nav">
      <div>编辑题库</div>
    </div>
    <div class="content">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="contenta">
            <el-form-item label="职业工种" prop="professionKind">
              <el-select
                size="mini"
                v-model="ruleForm.professionKind"
                placeholder="请选择职业工种"
                style="width: 220px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.jobCode + '-' + item.jobName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择等级" prop="grade">
              <el-checkbox-group v-model="ruleForm.checkbox">
                <el-checkbox label="1">一级</el-checkbox>
                <el-checkbox label="2">二级</el-checkbox>
                <el-checkbox label="3">三级</el-checkbox>
                <el-checkbox label="4">四级</el-checkbox>
                <el-checkbox label="5">五级</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="genre">
              <el-form-item label="试题类型" prop="genre">
                <el-select
                  disabled
                  size="mini"
                  v-model="ruleForm.genre"
                  placeholder="请选择试题类型"
                  style="width: 140px"
                  @change="change"
                >
                  <el-option
                    v-for="item in genreList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联教材">
                <!-- prop="textbook"-->
                <el-select
                  size="mini"
                  v-model="ruleForm.textbook"
                  placeholder="请选择关联教材"
                  style="width: 140px"
                  @visible-change="visibleChange"
                >
                  <el-option
                    v-for="item in textbookList"
                    :key="item.id"
                    :label="item.teachName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试题关键字">
                <!-- prop="keyword"-->
                <el-input
                  size="mini"
                  placeholder="多个试题关键字用逗号隔开"
                  v-model="ruleForm.keyword"
                >
                </el-input>
              </el-form-item>
            </div>
            <el-form-item label="试题状态" prop="state">
              <el-radio v-model="ruleForm.state" label="1">启用</el-radio>
              <el-radio v-model="ruleForm.state" label="0">禁用</el-radio>
            </el-form-item>
          </div>
          <div style="background-color: #fff; padding: 20px 0">
            <div v-if="ruleForm.genre == 1 || ruleForm.genre == 2">
              <div style="margin-bottom: 20px">
                <el-form-item label="题干" prop="topic" style="width: 450px">
                  <el-input
                    resize="none"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入题干"
                    v-model="ruleForm.topic"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="textboxList">
                <div
                  v-for="(item, index) in ruleForm.textboxList"
                  :key="item.id"
                >
                  <el-form-item
                    :label="item.label"
                    :prop="'textboxList.' + index + '.value'"
                    :rules="[
                      {
                        required: true,
                        message: '选项不能为空',
                        trigger: 'blur',
                      },
                    ]"
                    style="width: 450px"
                  >
                    <el-input
                      resize="none"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入选项内容"
                      v-model="item.value"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <div class="img">
                  <img src="@/assets/jian.png" alt="" @click="jian" />
                  <img src="@/assets/jia.png" alt="" @click="jia" />
                </div>
              </div>
              <div>
                <div v-if="ruleForm.genre == 1">
                  <el-form-item
                    label="正确答案"
                    prop="radio"
                    style="width: 800px"
                  >
                    <div>
                      <el-radio
                        v-for="item in ruleForm.textboxList"
                        :key="item.id"
                        v-model="ruleForm.radio"
                        :label="JSON.stringify(item)"
                        >{{ item.label }}</el-radio
                      >
                    </div>
                  </el-form-item>
                </div>
                <div v-if="ruleForm.genre == 2">
                  <el-form-item
                    label="正确答案"
                    prop="textbos"
                    style="width: 800px"
                  >
                    <el-checkbox-group v-model="ruleForm.textbos">
                      <el-checkbox
                        v-for="item in ruleForm.textboxList"
                        :key="item.id"
                        :label="JSON.stringify(item)"
                        >{{ item.label }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div v-if="ruleForm.genre == 3">
              <div class="gapFilling">
                <div>
                  <el-form-item
                    label="题干"
                    prop="gapFillingStem"
                    style="width: 450px"
                  >
                    <el-input
                      resize="none"
                      type="textarea"
                      :rows="3"
                      placeholder="答案用()包起来"
                      v-model="ruleForm.gapFillingStem"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                    label="正确答案"
                    prop="gapFillingAnswer"
                    style="width: 450px"
                  >
                    <el-input
                      resize="none"
                      type="textarea"
                      :rows="3"
                      placeholder="每个括号()对应一个答案,多个答案用逗号隔开"
                      v-model="ruleForm.gapFillingAnswer"
                    >
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div v-if="ruleForm.genre == 4">
              <div class="sqa">
                <div style="margin-bottom: 20px">
                  <el-form-item label="题干" prop="stems" style="width: 450px">
                    <el-input
                      resize="none"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入题干"
                      v-model="ruleForm.stems"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <div class="sqa-a">
                  <div>
                    <el-form-item
                      label="正确答案"
                      prop="sqaAnswer"
                      style="width: 450px"
                    >
                      <el-input
                        resize="none"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入正确答案"
                        v-model="ruleForm.sqaAnswer"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      label="正确答案关键字"
                      prop="answerkeywords"
                      style="width: 500px"
                      label-width="140px"
                    >
                      <el-input
                        resize="none"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入正确答案关键字,多个关键字用逗号隔开"
                        v-model="ruleForm.answerkeywords"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="synchronization">
              <span style="padding-right: 10px">同步试题至练习题库</span>
              <el-switch
                v-model="ruleForm.together"
                active-color="#409EFF"
                inactive-color="#DCDFE6"
              >
              </el-switch>
            </div>
          </div>
          <div class="submitForm">
            <div>
              <el-form-item>
                <el-button size="medium" @click="back">取消编辑</el-button>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <el-button
                  size="medium"
                  type="primary"
                  @click="submitForm('ruleForm')"
                  >确认编辑</el-button
                >
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(value);
      if (value.length == 0) {
        callback(new Error("正确答案不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        professionKind: "", //工种
        checkbox: [], //等级
        genre: 1, //类型
        textbook: "", //教材
        keyword: "", //关键字
        state: "", //状态
        topic: "", //题干
        textboxList: [
          //动态添加文本框
          {
            id: "1",
            label: "A",
            value: "",
          },
          {
            id: "2",
            label: "B",
            value: "",
          },
          {
            id: "3",
            label: "C",
            value: "",
          },
          {
            id: "4",
            label: "D",
            value: "",
          },
        ],
        radio: "", //单选答案
        together: true, //单选题是否同步
        //多选
        textbos: [], //多选答案
        //填空题
        gapFillingStem: "", //填空题题干
        gapFillingAnswer: "", //填空题答案
        //简答题
        stems: "", //简答题 题干
        sqaAnswer: "", //简答题正确答案
        answerkeywords: "", //简答题正确答案关键字
      },
      rules: {
        professionKind: [
          { required: true, message: "职业工种不能为空", trigger: "blur" },
        ],
        checkbox: [
          { required: true, message: "等级不能为空", trigger: "blur" },
        ],
        genre: [
          { required: true, message: "试题类型不能为空", trigger: "blur" },
        ],
        textbook: [
          { required: true, message: "关联教材不能为空", trigger: "blur" },
        ],
        keyword: [
          { required: true, message: "试题关键字不能为空", trigger: "blur" },
        ],
        state: [
          { required: true, message: "试题状态不能为空", trigger: "blur" },
        ],
        topic: [{ required: true, message: "题干不能为空", trigger: "blur" }],
        textbox: [{ required: true, message: "选项不能为空", trigger: "blur" }],
        radio: [
          { required: true, message: "正确答案不能为空", trigger: "blur" }, //单选
        ],
        textbos: [
          { validator: validatePass, trigger: "blur" }, //多选
        ],
        stems: [
          { required: true, message: "题干不能为空", trigger: "blur" }, //简答题 题干
        ],
        sqaAnswer: [
          { required: true, message: "正确答案不能为空", trigger: "blur" }, //简答题正确答案
        ],
        answerkeywords: [
          {
            required: true,
            message: "正确答案关键字不能为空",
            trigger: "blur",
          }, //简答题正确答案关键字
        ],
        gapFillingStem: [
          { required: true, message: "题干不能为空", trigger: "blur" }, //填空题题干
        ],
        gapFillingAnswer: [
          { required: true, message: "答案不能为空", trigger: "blur" }, //填空题答案
        ],
      },
      options: [],
      genreList: [
        {
          id: 1,
          label: "单选题",
          value: 1,
        },
        {
          id: 2,
          label: "多选题",
          value: 2,
        },
        {
          id: 3,
          label: "填空题",
          value: 3,
        },
        {
          id: 4,
          label: "简答题",
          value: 4,
        },
      ],
      textbookList: [],
      flag: true, //禁用关联教材
      form: {
        //传参
        id: "", //编辑室可上传
        jobId: "", //职业工种id
        level: "", //职业等级
        topicType: "", //试题类型
        teachingId: "", //关联教材
        keyword: "", // 关键字
        status: "", //试题状态
        stem: "", //题干
        options: "", //选项json
        answer: "", //答案
        isSynchro: "", //同步至练习库
        keywordAnswer: "", //简单题的正确答案关键字 ,隔开
        examId: "", //考试题库的id，编辑时上传
      },
      num: "", //转换同步练习数字
      answera: "", //查找答案选项并转JSON
      id: "", //编辑id
    };
  },
  components: {},
  methods: {
    submitForm(ruleForm) {
      //提交
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.ruleForm.genre == 1) {
            this.num = "";
            if (this.ruleForm.together) {
              this.num = 1;
            } else {
              this.num = 0;
            }
            this.form.id = this.id;
            this.form.jobId = this.ruleForm.professionKind; //职业工种id
            this.form.level = this.ruleForm.checkbox.sort().toString(); //职业等级
            this.form.topicType = this.ruleForm.genre; //试题类型
            this.form.teachingId = this.ruleForm.textbook; //关联教材
            this.form.keyword = this.ruleForm.keyword; // 关键字
            this.form.status = this.ruleForm.state; //试题状态
            this.form.stem = this.ruleForm.topic; //题干
            this.form.options = JSON.stringify(this.ruleForm.textboxList); //选项json
            this.form.answer = this.ruleForm.radio; //答案
            this.form.isSynchro = this.num; //同步至练习库
            this.question();
          } else if (this.ruleForm.genre == 2) {
            this.num = "";
            if (this.ruleForm.together) {
              this.num = 1;
            } else {
              this.num = 0;
            }
            this.form.id = this.id;
            this.form.jobId = this.ruleForm.professionKind; //职业工种id
            this.form.level = this.ruleForm.checkbox.sort().toString(); //职业等级
            this.form.topicType = this.ruleForm.genre; //试题类型
            this.form.teachingId = this.ruleForm.textbook; //关联教材
            this.form.keyword = this.ruleForm.keyword; // 关键字
            this.form.status = this.ruleForm.state; //试题状态
            this.form.stem = this.ruleForm.topic; //题干
            this.form.options = JSON.stringify(this.ruleForm.textboxList); //选项json
            this.form.answer = JSON.stringify(this.ruleForm.textbos); //答案
            this.form.isSynchro = this.num; //同步至练习库
            this.question();
          } else if (this.ruleForm.genre == 3) {
            this.num = "";
            if (this.ruleForm.together) {
              this.num = 1;
            } else {
              this.num = 0;
            }
            this.form.id = this.id;
            this.form.jobId = this.ruleForm.professionKind; //职业工种id
            this.form.level = this.ruleForm.checkbox.sort().toString(); //职业等级
            this.form.topicType = this.ruleForm.genre; //试题类型
            this.form.teachingId = this.ruleForm.textbook; //关联教材
            this.form.keyword = this.ruleForm.keyword; // 关键字
            this.form.status = this.ruleForm.state; //试题状态
            this.form.stem = this.ruleForm.gapFillingStem; //题干
            this.form.options = ""; //选项json
            this.form.answer = this.ruleForm.gapFillingAnswer; //答案
            this.form.isSynchro = this.num; //同步至练习库
            this.question();
          } else if (this.ruleForm.genre == 4) {
            this.num = "";
            if (this.ruleForm.together) {
              this.num = 1;
            } else {
              this.num = 0;
            }
            this.form.id = this.id;
            this.form.jobId = this.ruleForm.professionKind; //职业工种id
            this.form.level = this.ruleForm.checkbox.sort().toString(); //职业等级
            this.form.topicType = this.ruleForm.genre; //试题类型
            this.form.teachingId = this.ruleForm.textbook; //关联教材
            this.form.keyword = this.ruleForm.keyword; // 关键字
            this.form.status = this.ruleForm.state; //试题状态
            this.form.stem = this.ruleForm.stems; //题干
            this.form.options = ""; //选项json
            this.form.answer = this.ruleForm.sqaAnswer; //简答题答案
            this.form.keywordAnswer = this.ruleForm.answerkeywords; //简单题的正确答案关键字 ,隔开
            this.form.isSynchro = this.num; //同步至练习库
            this.question();
          }
        } else {
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    getfindQustionBanks() {
      //获取关联教材
      this.$api
        .findQustionBanks({
          jobId: this.ruleForm.professionKind,
          level: this.ruleForm.checkbox.toString(),
        })
        .then((res) => {
          //   console.log(res);
          if (res.code == 0) {
            this.textbookList = res.data;
          }
        });
    },
    visibleChange(val) {
      //打开关联教材下拉框
      if (val) {
        if (this.ruleForm.professionKind && this.ruleForm.checkbox) {
          this.getfindQustionBanks();
        } else {
          this.$message.error("请先选择职业功能和职业等级");
        }
      }
    },
    jian() {
      if (this.ruleForm.textboxList.length <= 4) {
        this.$message.error("最少4个选项");
      } else {
        this.ruleForm.textboxList.splice(this.ruleForm.textboxList.length - 1);
      }
    },
    jia() {
      if (this.ruleForm.textboxList.length == 4) {
        this.ruleForm.textboxList.push({
          id: "5",
          label: "E",
          value: "",
        });
      } else if (this.ruleForm.textboxList.length == 5) {
        this.ruleForm.textboxList.push({
          id: "6",
          label: "F",
          value: "",
        });
      } else if (this.ruleForm.textboxList.length == 6) {
        this.ruleForm.textboxList.push({
          id: "7",
          label: "G",
          value: "",
        });
      } else if (this.ruleForm.textboxList.length == 7) {
        this.ruleForm.textboxList.push({
          id: "8",
          label: "H",
          value: "",
        });
      } else if (this.ruleForm.textboxList.length == 8) {
        this.$message.error("最少8个选项");
      }
    },
    question() {
      this.$api.saveQustionBanks(this.form).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.$message.success("编辑成功");
          this.$router.push("/manageBanka");
        } else if (res.code == 1) {
          this.$message.error(res.msg);
        }
      });
    },
    change(val) {
      //选择试题类型
      // console.log(val);
      this.ruleForm.textboxList = [
        //初始化选项
        {
          id: "1",
          label: "A",
          value: "",
        },
        {
          id: "2",
          label: "B",
          value: "",
        },
        {
          id: "3",
          label: "C",
          value: "",
        },
        {
          id: "4",
          label: "D",
          value: "",
        },
      ];
      this.ruleForm.radio = ""; //清空单选题答案
      this.ruleForm.topic = ""; //清空题干
      this.ruleForm.checkList = []; //清空多选选题答案
      this.ruleForm.together = true; //初始化同步练习题库
      this.ruleForm.stems = ""; //题干
      this.ruleForm.sqaAnswer = ""; //简答题答案
      this.ruleForm.answerkeywords = ""; //简答题答案关键字
    },
    back() {
      //取消编辑
      this.$router.push("/manageBanka");
    },
  },
  created() {
    this.$api.getJobfindJob().then((res) => {
      // console.log(res);
      if (res.code == 0) {
        this.options = res.data;
      }
    });
    // if (sessionStorage.getItem("CareerList")) {
    //   this.options = JSON.parse(sessionStorage.getItem("CareerList"));
    // } else {
    //   this.$api.findOccupationList().then((res) => {
    //     this.options = res.data;
    //     sessionStorage.setItem("CareerList", JSON.stringify(res.data));
    //   });
    // }
    let editPascal = JSON.parse(localStorage.getItem("editPascal"));
    this.genreList.map((item) => {
      if (item.label == editPascal.answer) {
        editPascal.topicType = item.value;
      }
    });
    this.$api.getPascalDetailsa(editPascal).then((res) => {
      //查询试题详情
      if (res.code == 0) {
        // console.log(res);
        this.ruleForm.professionKind = res.data.jobId;
        this.ruleForm.checkbox = res.data.level.split(",");
        this.ruleForm.genre = editPascal.topicType;
        this.getfindQustionBanks();
        this.ruleForm.textbook = res.data.teachingId;
        this.ruleForm.keyword = res.data.keyword;
        this.ruleForm.state = res.data.status.toString();
        this.ruleForm.topic = res.data.stem;
        if (editPascal.topicType == 1 || editPascal.topicType == 2) {
          this.ruleForm.textboxList = JSON.parse(res.data.options);
        }
        this.ruleForm.radio = res.data.answer;
        this.id = res.data.id;
        if (editPascal.topicType == 2) {
          this.ruleForm.textbos = JSON.parse(res.data.answer);
        }
        //填空题
        this.ruleForm.gapFillingStem = res.data.stem;
        this.ruleForm.gapFillingAnswer = res.data.answer;

        //简答题
        this.ruleForm.stems = res.data.stem;
        this.ruleForm.sqaAnswer = res.data.answer;
        this.ruleForm.answerkeywords = res.data.keywordAnswer;
      }
    });
  },
  computed: {},
  watch: {},
};
</script>

<style  scoped>
.el-form-item {
  margin-bottom: 10px;
}
.nav {
  background-color: #2290ff;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  border-radius: 5px;
}
.content {
  margin-top: 20px;
}
.contenta {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 2px;
  padding: 15px 20px 15px 0;
}
.genre {
  display: flex;
}
.textboxList {
  display: flex;
  flex-wrap: wrap;
}
.textboxList > div {
  width: 30%;
  margin-bottom: 20px;
}
.img {
  margin-left: 80px;
}
.img > img {
  cursor: pointer;
}
.synchronization {
  margin-left: 30px;
  margin-top: 15px;
  font-size: 14px;
}
.submitForm {
  display: flex;
  background-color: #fff;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
/* 简答 */
.sqa {
  padding: 0 10px;
}
.sqa-a {
  display: flex;
}
.gapFilling {
  padding: 0 10px;
  display: flex;
}
</style>