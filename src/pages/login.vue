<template>
  <div class="login">
    <div class="login_item">
      <el-form
        :model="loginForm"
        :rules="rules"
        status-icon
        class="login-form"
        ref="loginForm"
        label-width="100px"
        size="medium"
      >
        <h1>四川省职业技能等级认定申报系统</h1>
        <!-- 账户 -->
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账户"
            suffix-icon="iconfont icon-icon-"
            v-model="loginForm.account"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item class="code">
          <el-input
            placeholder="请输入验证码"
            maxlength="6"
            v-model="loginForm.code"
            class="code_text"
          ></el-input>
          <el-button type="primary" @click="sendCode" :disabled="flag">{{
            sendText
          }}</el-button>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="c_login"
            size="medium"
            type="primary"
            @click="submitForm('loginForm')"
            >点击登录</el-button
          >
        </el-form-item>

        <!-- 忘记密码 -->
        <el-form-item style="cursor: pointer">
          <p>忘记密码？</p>
        </el-form-item>
      </el-form>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        code: "",
      },
      sendText: "发送验证码",
      flag: false,
      //  验证规则
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "账号长度为3~15个字符",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度为6~12个字符",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "密码长度为6个字符", trigger: "change" },
        ],
      },
      isClose: true, //密码框尾部的眼睛是否关闭
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$api
            .login({
              userName: this.loginForm.account,
              passWord: this.loginForm.password,
            })
            .then((res) => {
              // console.log(res);
              if (res.code === 0) {
                //sessionStorage
                this.$message.success(res.msg);
                sessionStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.realName);
                this.$router.push("/type");
              } else if (res.code === 1) {
                this.$message.error(res.msg);
              }
            });
        } else {
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    sendCode() {
      this.flag = true;
      var num = 60;
      let time = setInterval(() => {
        num = num - 1;
        this.sendText = num + "重新发送";
        if (num === 0) {
          clearInterval(time);
          this.flag = false;
          this.sendText = "发送验证码";
        }
      }, 1000);
      // this.sendText='60秒重发'
    },
    // 切换眼睛的状态
    // changeType(e) {
    //   if (e.target.className.includes("icon-yanjing")) {
    //     this.isClose = !this.isClose;
    //   }
    // }
  },
  created() {},
};
</script>

<style scoped lang="less">
.login {
  background: url("../assets/background.png") no-repeat;
  background-size: 100% 120%;
  width: 100%;
  height: 100%;
  position: fixed;

  .login_item {
    display: flex;
    justify-content: space-around;
    align-content: center;

    .login-form {
      margin-top: 15%;

      .el-form-item {
        margin-left: -50px;
        margin-right: 50px;
      }

      h1 {
        text-align: center;
        color: #347cef;
        font-size: 1.8rem;
        margin-bottom: 10%;
        font-width: bold !important;
      }

      p {
        color: #5079f6;
      }

      .code {
        display: flex;
        white-space: nowrap;

        .code_text {
          width: auto;
          margin-right: 10px;
        }

        .code_item {
          color: #fff;
          border-radius: 10px;
          background-image: linear-gradient(to right, #5076f5, #819bff);
        }
      }

      .c_login {
        font-size: 18px;
        padding: 10px 80px;
        border-radius: 10px;
        background-image: linear-gradient(to right, #5076f5, #819bff);
      }
    }
  }
}
</style>