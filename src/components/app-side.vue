<!-- 左侧菜单栏组件，数据由js获取 -->
<template>
  <div>
    <!-- <v-menu
    class="side-menu"
    :collapse="collapse"
    :default-active="defaultActive"
    :menus="menus"
    router
    :uniqueOpened="true"
    :text-color="theme.textColor"
    :active-text-color="theme.activeTextColor"
  ></v-menu> -->

    <div
      :style="{ background: act_index == index ? '#3530FF' : '#3C6EFF' }"
      v-for="(item, index) in menus"
      @click="chang_tab(index)"
      class="item_box"
    >
      <img src="../assets/tab1.png" alt="" />
      <div class="item_box_text">{{ item.label }}</div>
    </div>
    <!-- <div @click="chang_tab(1)" class="item_box" style="background: none;">
         <img src="../assets/tab2.png" alt="">
         <div class="item_box_text">考试计划</div>
      </div> -->
    <ul
      :style="{
        height: menus[act_index].id == '/plan-up' ? '110px' : '0px',
      }"
      class="show_more"
    >
      <!-- <li
        style="padding-top: 20px"
        :class="{ box: $route.path == '/plan_management'|| $route.path == '/addPlan'}"
        @click="management"
      >
        计划管理
      </li> -->
      <li
        style="margin-top: 20px"
        :class="{ box: $route.path == '/plan-up' }"
        @click="plan"
      >
        计划上报
      </li>
      <li
        style="margin-top: 20px"
        :class="{ box: $route.path == '/results_report' }"
        @click="report"
      >
        成绩证书上报
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import VMenu from "./vmenu";
import menus from "./menus";
export default {
  props: {
    collapse: Boolean,
    theme: Object,
  },
  components: {
    VMenu,
  },
  data() {
    return {
      menus,
      defaultActive: "home",
      test: "asdfasdf",
      act_index: 0,
    };
  },
  watch: {
    $route() {
      this.setCurrentRoute();
    },
  },
  methods: {
    // 菜单栏选中样式
    setCurrentRoute() {
      // console.log(this.$route)
      this.defaultActive = this.$route.name;
      this.menus.forEach((element, i) => {
        if (element.id == this.$route.name) {
          this.act_index = i;
        }
      });
    },
    chang_tab(index) {
      this.act_index = index;
      // this.$routes.push(this.menus[this.act_index].name)
      this.$router.push(this.menus[this.act_index].name);
    },
    management() {
      this.$router.push("/plan_management");
    },
    plan() {
      this.$router.push("/plan-up");
    },
    report() {
      this.$router.push("/results_report");
    },
  },
  created() {
    if (
      this.$route.path == "/plan_management" ||
      this.$route.path == "/plan-up" ||
      this.$route.path == "/results_report"||
      this.$route.path == "/addPlan"
    ) {
      this.act_index = 1;
    }
    this.setCurrentRoute();
    // console.log(this.menus[this.act_index].id);
  },
  mounted() {
    // console.log(this.$route.path);
  },
};
</script>

<style type="text/css" scoped>
.el-menu.side-menu {
  border-right: none;
  background: #3c6eff !important;
}

.el-menu .fa {
  font-size: 18px;
  margin-right: 7px;
  display: inline-block;
  width: 23px;
  text-align: center;
}

.el-menu.side-menu .el-menu-item.is-active {
  color: #fff;
  border-right: solid 2px #36c1fa;
  background: #3530ff;
}

.item_box {
  width: 100%;
  height: 150px;
  background: #3530ff;
  padding-top: 30px;
  cursor: pointer;
}

.item_box img {
  display: block;
  margin: auto;
  width: 60px;
}

.item_box_text {
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f5f5f5;
  line-height: 14px;
  margin-top: 10px;
  text-align: center;
}

.show_more {
  width: 96%;
  height: 220px;
  background: #f4f4f4;
  box-shadow: 1px 34px 21px 3px rgba(59, 59, 59, 0.1);
  margin: auto;
  transition: 0.5s all;
  overflow: hidden;
}

.show_more > li {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a9a9a9;
  line-height: 12px;
  text-align: center;
  list-style-type: circle;
  cursor: pointer;
  transition: 0.5s all;
}
.show_more > li:hover {
  color: #5680fd;
}
.box {
  color: #5680fd !important;
}

.show_more_item:hover {
  color: #3c6eff;
}
</style>