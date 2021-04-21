<template>
  <div class="layout">
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
    <div class="content">
      <div class="sird ds-f">
        <div class="sirda">
          <div
            class="sirda1"
            v-for="(item, index) in list"
            :key="index"
            @click="selet(item, index)"
          >
            <div :class="{ sirdaName: index == active }">
              <div><img :src="item.icon" alt="" class="imgs" /></div>
              <div>{{ item.name }}</div>
            </div>
            <div class="sirdb" v-if="index == active">
              <div
                v-for="(itema, indexa) in item.children"
                :key="indexa"
                @click.stop="seletb(itema, indexa)"
                :class="{ 'sirdb-colcor': indexa == activeb }"
              >
                {{ itema.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contents">
        <router-view />
      </div>
    </div>
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
      list: [
        {
          name: "计划管理",
          icon: require("@/assets/exam.png"),
          children: [
            {
              name: "计划管理",
              path: "/planManagement",
            },
          ],
        },
        {
          name: "考试管理",
          icon: require("@/assets/practice.png"),
          children: [
            {
              name: "添加考试",
              path: "",
            },
            {
              name: "考试列表",
              path: "",
            },
            {
              name: "考试详情",
              path: "",
            },
          ],
        },
        {
          name: "考场管理",
          icon: require("@/assets/textbook.png"),
          children: [
            {
              name: "职业工种",
              path: "",
            },
            {
              name: "教材管理",
              path: "",
            },
          ],
        },
      ],
      active: 0,
      activeb: 0,
    };
  },
  components: {},
  methods: {
    selet(item, index) {
      // console.log(item, index);
      this.active = index;
      this.activeb = 0;
      sessionStorage.setItem("activea", this.active);
      sessionStorage.setItem("activeba", this.activeb);
      this.$router.push(item.children[0].path);
    },
    seletb(item, index) {
      this.activeb = index;
      // console.log(item, index);
      sessionStorage.setItem("activeba", this.activeb);
      this.$router.push(item.path);
    },
    handleCommand(val) {
      //退出登录
      // console.log(val);
      if (val == "d") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("activea");
        sessionStorage.removeItem("activeba");
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
  },
  created() {
    this.user = localStorage.getItem("user");
    this.time = dayjs(`${new Date()}`).format("YYYY-MM-DD");
    this.times = dayjs(`${new Date()}`).format("HH:mm:ss");
    setInterval(() => {
      this.time = dayjs(`${new Date()}`).format("YYYY-MM-DD");
      this.times = dayjs(`${new Date()}`).format("HH:mm:ss");
    }, 1000);
    if (sessionStorage.getItem("activea")) {
      this.active = sessionStorage.getItem("activea");
    }
    if (sessionStorage.getItem("activeba")) {
      this.activeb = sessionStorage.getItem("activeba");
    }
  },
  computed: {},
  watch: {},
};
</script>

<style  scoped>
.layout {
  background-color: #f2f2f2;
  /* height: 130vh; */
  position: relative;
}
.nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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
.sird {
  flex: 1;
  position: fixed;
  top: 78px;
  left: 0;
  z-index: 9;
}
.contents {
  flex: 10;
  position: absolute;
  width: 89%;
  top: 100px;
  left: 140px;
}
.sirda {
  background-color: #2290ff;
  height: 110vh;
  font-size: 14px;
  color: #fff;
}
.sirda1 > div:nth-of-type(1) {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sirdaName {
  background-color: #187fe6;
  /* color: #2290ff !important; */
}
.sirda > div:hover {
  cursor: pointer;
}
.imgs {
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}
.sirdb {
  background-color: #fff;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px;
  border-radius: 6px;
  font-size: 14px !important;
  transition: all 1.2s ease;
}
.sirdb > div {
  padding: 10px 15px;
  font-size: 14px;
}
.sirdb > div:hover {
  cursor: pointer;
}
.sirdb-colcor {
  color: #187fe6;
  transition: all 0.5;
}
.dropdown:hover {
  cursor: pointer;
}
.ds-f {
  display: flex;
}
.icons {
  font-size: 16px;
  color: #6c6c6c;
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