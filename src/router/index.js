import Vue from "vue";
import VueRouter from "vue-router";

import AppView from "@/components/app-view";
import Layout from '@/pages/questionBank/view/layout/layout.vue'
import Layouta from '@/pages/testManagement/view/layouta/layouta.vue'
Vue.use(VueRouter);

const page = name => () => import("@/pages/" + name);
const routes = [
  {
    path: "",
    component: AppView,
    children: [
      // 成绩上报
      { path: "/results_report", name: "/results_report", component: page("results_report") },
      //计划书上报  
      { path: "/plan-up", name: "/plan-up", component: page("plan-up") },
      // 计划管理
      { path: "/plan_management", name: "/plan_management", component: page("plan_management") },
      // 职业信息
      { path: "/career_info", name: "/career_info", component: page("career_info") },
      // 新增职业
      { path: "/add_career", name: "/add_career", component: page("add_career") },
      //编辑职业
      { path: "/editOccupation", name: "/editOccupation", component: page("editOccupation") },
      // 队伍信息
      { path: "/team_info", name: "/team_info", component: page("team_info") },
      // 备案信息
      { path: "/record_info", name: "/record_info", component: page("record_info") },
      //新增方案 
      { path: "/newPlan", name: "/newPlan", component: page("newPlan") },
      // 数据上传
      { path: "/data_upload", name: "/data_upload", component: page("data_upload") },
      // 我的备案
      { path: "/", name: "/", component: page("my_beian") },
      //创建计划
      { path: '/addPlan', name: "/addPlan", component: page("addPlan") }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/addBank', //新增题库
        name: 'addBank',
        component: () => import('@/pages/questionBank/view/addBank/addBank.vue')
      },
      {
        path: '/manageBank', //题库管理
        name: 'manageBank',
        component: () => import('@/pages/questionBank/view/manageBank/manageBank.vue')
      },
      {
        path: '/textbookManageBank', //教材管理
        name: 'textbookManageBank',
        component: () => import('@/pages/questionBank/view/textbookManageBank/textbookManageBank.vue')
      },
      {
        path: '/editPascal', //编辑试题
        name: 'editPascal',
        component: () => import('@/pages/questionBank/view/editPascal/editPascal.vue')
      },
      //练习题库
      {
        path: '/addBanka', //练习新增试题
        name: 'addBanka',
        component: () => import('@/pages/questionBank/view/addBanka/addBanka.vue')
      },
      {
        path: '/manageBanka', //练习题库管理
        name: 'manageBanka',
        component: () => import('@/pages/questionBank/view/manageBanka/manageBanka.vue')
      },
      {
        path: '/editPascala', //练习题库管理
        name: 'editPascala',
        component: () => import('@/pages/questionBank/view/editPascala/editPascala.vue')
      },
      //题库配置
      {
        path: '/professionalWork', //职业工种
        name: 'professionalWork',
        component: () => import('@/pages/questionBank/view/professionalWork/professionalWork.vue')
      },
      {
        path: '/textbookManagement', //教材管理 
        name: 'textbookManagement',
        component: () => import('@/pages/questionBank/view/textbookManagement/textbookManagement.vue')
      },
    ]
  },
  {  //Layouta
    path: '',
    component: Layouta,
    children: [
      {
        path: '/planManagement',
        name: 'planManagement',
        component: () => import('@/pages/testManagement/view/planManagement/planManagement.vue'),
      }
    ]
  },


  { path: "/login", name: "login", component: page("login") },
  { path: "/home-login", name: "p-login", component: page("home-login") },
  { path: "/register", name: "p-register", component: page("register") },
  { path: "/test", name: "test", component: page("test") },
  // 分类
  { path: "/type", name: "/type", component: page("type") },

];


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title; //动态改变浏览器标题
  if (to.path === "/login") {
    //当进入的就是登陆页面或者注册页面时，不做操作
    next();
  } else {
    if (sessionStorage.getItem("token")) {
      //同过登陆成功时存储在本地用户名，来判断用户是否成功登陆
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
