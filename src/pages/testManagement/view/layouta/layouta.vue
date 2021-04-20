<template>
  <div>
    <el-container>
      <el-header>
        <div class="nav">
          <div class="nava">
            <div class="navName">四川省职业技能等级认定申报系统</div>
            <div class="ds-f btns">
              <div class="btn">
                <div class="btna" @click="btna">备案申报</div>
                <div class="btnc" @click="btnc">题库管理</div>
                <!-- <div class="btnb" @click="btnb">考务管理</div> -->
              </div>
              <el-dropdown trigger="click" @command="handleCommand">
                <div class="ds-f dropdown">
                  <div><img class="img" src="@/assets/user.jpg" alt="" /></div>
                  <div class="account">
                    <div class="accounta">当前登录账号</div>
                    <div class="accountb">
                      {{ user }} <i class="icons el-icon-caret-bottom"></i>
                    </div>
                  </div>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">用户信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">注销</el-dropdown-item>
                  <el-dropdown-item command="d">退出账号</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="time">
                <div>{{ time }}</div>
                <div class="times">{{ times }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#000"
            active-text-color="#2290ff"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>计划管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1">计划管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div><router-view /></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      user: "",
      time: "",
      times: "",
    };
  },
  components: {},
  methods: {
    handleCommand(val) {
      //退出登录
      // console.log(val);
      if (val == "d") {
        sessionStorage.removeItem("token");
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
      // this.$router.push("/");
    //   this.$message.warning("功能开发中");
    },
    btnc() {
      this.$router.push("/addBank");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.user = localStorage.getItem("user");
    this.time = dayjs(`${new Date()}`).format("YYYY-MM-DD");
    this.times = dayjs(`${new Date()}`).format("HH:mm:ss");
    setInterval(() => {
      this.time = dayjs(`${new Date()}`).format("YYYY-MM-DD");
      this.times = dayjs(`${new Date()}`).format("HH:mm:ss");
    }, 1000);
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
.el-container {
  padding-top: 19px;
}
.el-aside{
    height: 100vh;
    /* overflow: visible; */
    background-color: #fff;
}
.ds-f {
  display: flex;
}
.nav {
  /* width: 100%; */
}
.nava {
  display: flex;
  padding: 20px 25px 18px 40px;
  justify-content: space-between;
  background-color: #2290ff;
}
.navName {
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 2px;
}
.content {
  display: flex;
  /* margin: 20px 20px 20px 10px; */
}
.img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
}
.account {
  margin-left: 10px;
}
.accounta {
  font-size: 10px;
  color: #fff;
  font-weight: bold;
}
.accountb {
  font-size: 7px;
  color: #fff;
}
.time {
  margin-left: 15px;
  color: #fff;
  font-size: 12px;
}
.times {
  margin-top: 2px;
}
.btns {
  align-items: center;
}
.btn {
  margin-right: 20px;
  display: flex;
  color: #fff;
  font-size: 13px;
}
.btn > div {
  cursor: pointer;
}
.btna {
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #66cfe7;
}
.btnb {
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #aba3ff;

}
.btnc {
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #78b8fd;
    margin-left: 10px;
}
</style>