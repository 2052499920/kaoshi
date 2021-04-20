<!-- 登录界面 -->
<template>
  <div
    class="fullscreen"
    :style="{ 'background-image' : 'url('+require('@/assets/logo_bg.jpg')+')' }"
  >
    <!-- 登录输入框 -->
    <div class="login-box">
      <p class="text-tips-one">后台管理平台</p>

      <!-- 输入框 -->
      <form action class="login-form">
        <div class="m-list-group">
          <div class="m-list-group-item">
            <input type="text" placeholder="请输入登录账号" class="m-input" v-model="form.username" />
          </div>
          <div class="m-list-group-item">
            <input type="password" placeholder="请输入登录密码" class="m-input" v-model="form.password" />
          </div>
        </div>
        <button class="m-btn sub select-none" @click="login">登 录</button>
      </form>

      <!-- 提示 -->
      <div style="margin-top: 50px"></div>
      <p class="text-tips">Copyright {{ date }} © 科技</p>
    </div>
  </div>
</template>

<style type="text/css">
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}
.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #e7ecee;
}
.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f4f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.login-box {
  position: relative;
  width: 330px;
  margin: 0 auto;
  padding: 0px 15px;
}
.login-box .logo {
  max-width: 40%;
  margin-bottom: 30px;
}
.login-box .text-tips-one {
  text-align: center;
  color: #000000;
  font-size: 20px;
}
.login-box .text-tips {
  text-align: center;
  color: #ffffff;
}
.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #36c1fa;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #36c1fa;
  box-sizing: border-box;
  text-decoration: none;
}
.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #36c1fa;
}
.login-box .m-btn:hover {
  background-color: #2db7f5;
}
.login-box .m-btn.m-btn-text:hover {
  background-color: #f4f5f5;
}
.login-box .m-btn:active {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}
</style>

<script>
// import { login } from "@/api/getData";
import axios from "axios";
import Vue from "vue";
import dragVerify from "vue-drag-verify";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      date: 2019,
    };
  },
  created() {
    // 获取当前的年份
    var date = new Date();
    this.date = date.getFullYear();
  },
  methods: {
    // 登录
    login() {
      if (this.form.username == "") {
        this.$message.error("请输入账号 ...");
        return false;
      } else if (this.form.password == "") {
        this.$message.error("请输入密码 ...");
        return false;
      }
      axios
        .post("/user", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          if(res.data.code == 500) {
            this.$message.error(res.data.msg)
          }else {
            this.$router.push({ path: "/" });
          }
        }
        )
    },
  },
  components: {
    dragVerify,
  },
};
</script>

