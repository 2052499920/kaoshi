<template>
  <div class="container">
    <div class="bg"><img src="../assets/bg.png" /></div>
    <div class="top">四川省职业技能等级认定申报系统</div>
    <div class="center">
      <div class="content">
        <img src="../assets/icon.png" />
        <div class="text1">备案申报</div>
        <div class="text2">
          依据人社部针对职业技能等级认定工作的指导意见，
          将评价机构备案工作信息化，对机构基本信息、认定职业工种、
          各类人员、考核资料等进行备案管理。保证职业技能等级认定机
          构与认定范围的严肃性和真实性，并统一管理机构所有考生数据。
        </div>
        <router-link class="bt" to="/"
          ><el-button type="primary" class="bt bta"
            >进入</el-button
          ></router-link
        >
      </div>
      <div class="content">
        <img src="../assets/icon4.png" />
        <div class="text1">题库管理</div>
        <div class="text2">
          题库是是基于互联网技术和计算机技术，建立在科学测量理论和数学
          模型的基础上，实现题库的建库、用库的智能化服务平台。具有易用
          性、安全性、灵活性、规范性，支持多种组卷方式、征题功能等特点
          ，并支持在线考试及纸质化考试。
        </div>
        <!-- <router-link class="bt" to="/results_report"><el-button type="primary" class="bt">进入</el-button></router-link> -->
        <div class="bt" @click="questionBank">
          <el-button type="primary" class="bt bta">进入</el-button>
        </div>
      </div>
      <div class="content">
        <img src="../assets/icon1.png" />
        <div class="text1">考务管理</div>
        <div class="text2">
          主要管理及规范考前、考中、考后相关工作和流程。提供计划创建、
          考生报名、考场编排、人员派遣、准考证打印、成绩管理、证书打
          印等全流程管理功能，并提供各流程阶段电子化报表支持考务工作
          ，完全将考务信息化管理。
        </div>
        <!-- <router-link class="bt" to="/results_report"><el-button type="primary" class="bt">进入</el-button></router-link> -->
        <div class="bt" @click="TakeAn">
          <el-button type="primary" class="bt bta">进入</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    TakeAn() {
      // this.$message.warning("功能开发中");
      this.$router.push("/planManagement");
    },
    questionBank() {
      // this.$message.warning("功能开发中");
      this.$router.push("/addBank");
    },
  },
  mounted() {
    if (sessionStorage.getItem("CareerList")) {
      this.options = JSON.parse(sessionStorage.getItem("CareerList"));
    } else {
      this.$api.findOccupationList().then((res) => {
        this.options = res.data;
        sessionStorage.setItem("CareerList", JSON.stringify(res.data));
      });
    }
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  height: 100%;
  width: 100%;
  position: fixed;
}

.bg {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
}
.bg > img {
  width: 100%;
  height: 100%;
}

.top {
  width: 100%;
  height: 240px;
  color: white;
  font-size: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.center {
  width: 70%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  /*垂直*/
  position: relative;
}

.content {
  width: 300px;
  height: 450px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*水平居中*/
  position: relative;
}

.content > img {
  width: 86%;
  height: 34%;
  margin-top: 20px;
}
.bt {
  width: 100%;
  height: 60px;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 10px;
  font-size: 26px;
  background-color: #d5d5d5;
  border: none;
  transition: 0.5s all;
  cursor: pointer;
}

/* .bt:hover {
    background: #527EF8;
} */
.bta {
  background: #527ef8;
}
.text1 {
  width: 129px;
  height: 33px;
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1c1c1c;
  line-height: 25px;
  margin-top: 20px;
}

.text2 {
  width: 86%;
  height: 40%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #1c1c1c;
  line-height: 20px;
  margin-top: 20px;
  text-align: justify;
}
</style>
