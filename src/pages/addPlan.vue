<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">计划管理</a>
    </div>
    <div class="title" style="overflow: hidden; margin-top: 15px">创建计划</div>
    <div class="hint">此功能仅限未开通考务权限的用户上报数据使用，若已开通考务请登录考务系统进行数据上报。</div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/plan_management.css";
.title{
font-weight: bold;
font-size: 18px;
}
.hint{
padding: 10px 20px;
color: #8a6d3b;
background-color: #faf2cc;
margin: 5px 0;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  created() {},
  methods: {
    addplan(){
      this.$router.push('/addPlan')
    }
  },
  components: {},
};
</script>