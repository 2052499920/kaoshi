<!-- 页面顶部 -->
<template>
  <m-navbar
    :theme="theme.theme.headerTheme"
    style="
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #f5f5f5;
      line-height: 62px;
      height: 62px;
      background: #3c6eff;
    "
    class="title_txt"
  >
    <!-- 左侧菜单栏 隐藏 | 显示 按钮 -->
    <!-- <m-navbar-brand>
      <i class="side-switch" :class="{
               'el-icon-more': !mini,
               'el-icon-more-outline': mini
               }" @click="handleSwitchSide"></i>
    </m-navbar-brand> -->

    <!-- 今天的时间 -->
    <m-nav>
      <m-nav-item class="">四川省职业技能等级认定申报系统</m-nav-item>
    </m-nav>

    <!-- 顶部右侧信息 / 用户 | 放大缩小 | 主题色 -->
    <m-nav align="right">
      <m-nav-item padding="0">
        <!-- 用户信息 -->
        <div class="hander">
          <div class="btn">
            <!-- <div class="btnaa" @click="btna">备案申报</div> -->
            <div class="btncc" @click="btnc">题库管理</div>
            <div class="btnbb" @click="btnb">考务管理</div>
          </div>
          <div>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <img
                  src="../assets/user.jpg"
                  alt
                  style="
                    border-radius: 50%;
                    vertical-align: middle;
                    width: 32px;
                  "
                />
                <span style="font-size: 14px; color: #fff">管理员</span>
                <i
                  class="el-icon-arrow-down el-icon--right"
                  style="font-size: 14px; color: #fff"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">用户信息</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
                <el-dropdown-item command="c">注销</el-dropdown-item>
                <el-dropdown-item command="d">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- <m-dropdown align="right" padding="0 10px">
          <a href="#" style="display: inline-block; padding: 0px; color: inherit">
            <img src="../assets/user.jpg" alt style="border-radius: 50%;vertical-align: middle;width: 32px;">
            <span style="font-size: 13px;">管理员</span>
            <span class="caret"></span>
          </a>
          <m-dropdown-panel>
            <m-dropdown-item style="font-size: 13px;">用户信息</m-dropdown-item>
            <m-dropdown-item style="font-size: 13px;">修改密码</m-dropdown-item>
            <m-dropdown-item style="font-size: 13px;">注销</m-dropdown-item>
            <div class="test-line"></div>
            <div @click="logout" name="login" style="font-size: 13px;">退出账号</div>
          </m-dropdown-panel>
        </m-dropdown> -->
      </m-nav-item>
      <!-- <m-nav-item padding="0 5px">
        <a href="#" @click.stop.prevent="handleSwitchScreen">
          <i class="fa" :class="isFullScreen ? 'fa-compress' : 'fa-expand'"></i>
        </a>
      </m-nav-item>
      <m-nav-item padding="0">
        <m-dropdown align="right" padding="0 10px">
          <a href="#" style="padding:0 0px; color: inherit">
            <i class="fa fa-gears"></i>
          </a>
          <m-dropdown-panel style="width: 200px; min-height: 100px;">
            <el-form>
              <el-form-item label="侧边栏">
                <el-switch v-model="showAside" @change="handleSwitchHideSide" />
              </el-form-item>
              <el-form-item label="主题">
                <el-select v-model="themeType" style="width: 100px">
                  <el-option v-for="theme in themes" :key="theme.label" :label="theme.label" :value="theme.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item> -->
    </m-nav>
  </m-navbar>
</template>

<script type="text/javascript">
import { requestFullScreen, exitFullscreen } from "@/utils";
import themes from "./theme";
import axios from "axios";
export default {
  name: "app-header",
  data() {
    return {
      mini: false,
      isFullScreen: false,
      themes,
      themeType: "",
      showAside: true,
      theme: { theme: { headerTheme: "info" } },
      today: "2019-2-28 星期四",
    };
  },
  computed: {},
  watch: {
    // 监听主题颜色变化
    themeType(val) {
      this.theme = this.themes.find((e) => e.name === val) || {};
      this.$emit("set-theme", this.theme);
      localStorage.setItem("theme", val);
    },
  },
  methods: {
    // 菜单栏隐藏 | 显示
    handleSwitchSide() {
      this.mini = !this.mini;
      this.$emit("switch", this.mini);
    },

    // 屏幕放大| 缩小
    handleSwitchScreen() {
      if (this.isFullScreen) {
        exitFullscreen();
        this.isFullScreen = false;
      } else {
        requestFullScreen();
        this.isFullScreen = true;
      }
    },

    // 侧边栏隐藏与否
    handleSwitchHideSide() {
      this.$emit("hide-side");
    },

    // 退出登录
    handleCommand(val) {
      // console.log(val);
      if (val == "d") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("activeb");
        this.$router.push("/login");
      }
    },
    btna() {
      this.$router.push("/");
    },
    btnb() {
      this.$router.push("/planManagement");
      // this.$message.warning("功能开发中");
    },
    btnc() {
      this.$router.push("/addBank");
    },
  },
  created() {
    // 主题色初始化
    var theme = localStorage.getItem("theme") || "default";
    this.themeType = theme;

    // 今天日期初始化
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var week = weeks[date.getDay()];
    this.today = year + "年" + month + "月" + day + "日 星期" + week;
  },
};
</script>
<style type="text/css">
.side-switch {
  display: inline-block;
  font-size: 32px;
  cursor: pointer;
  color: inherit;
  margin-top: 10px;
}

.side-switch:hover {
  color: #fff;
}
.hander {
  display: flex;
  align-items: center;
}
.btns {
  align-items: center;
}
.btn {
  margin-right: 20px;
  display: flex;
  color: #fff;
  font-size: 13px;
  align-items: center;
}
.btn > div {
  cursor: pointer;
}
.btnaa {
    padding: 0px 15px;
  height: 40px;
  line-height:40px;
  border-radius: 4px;
  background-color: #66cfe7;
}
.btnbb {
  padding: 0px 15px;
  height: 40px;
  line-height:40px;
  border-radius: 4px;
  background-color: #aba3ff;
  /* margin: 0 10px; */
}
.btncc {
   padding: 0px 15px;
  height: 40px;
  line-height:40px;
  border-radius: 4px;
  background-color: #78b8fd;
  margin: 0 10px;
}
</style>