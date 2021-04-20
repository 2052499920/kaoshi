<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">成绩书上报</a>
    </div>
    <div class="title" style="overflow: hidden; margin-top: 20px">
      成绩书上报
    </div>
    <div style="margin-top: 20px; overflow: hidden">
      <span class="title" style="float: left; margin-top: 5px">计划名称</span>
      <input placeholder="请输入" style="padding-left: 10px; float: left" />
      <!-- <el-select style="float: left;width: 100px; border: none;margin-left: 20px;" placeholder="状态">
                <el-option>
                </el-option>
            </el-select> -->
      <input
        placeholder="请输入"
        style="
          padding-left: 10px;
          float: left;
          margin-left: 20px;
          position: relative;
        "
      />
    </div>
    <div class="button">提交确认</div>
    <div class="tab_box">
      <el-table :data="tableData" style="width: 100%">
        <!-- <template slot="empty">
                    <div style="width: 100px;height: 100px;">
                        <img src="../assets/no_data.png" style="width: 130px; height: 100px" alt="" />
                        <p class="">暂无相关数据</p>
                    </div>
                </template> -->
        <el-table-column align="center" prop="date" label="计划名称">
        </el-table-column>
        <el-table-column align="center" prop="name" label="考生人数">
        </el-table-column>
        <el-table-column align="center" prop="address" label="合格人数">
        </el-table-column>
        <el-table-column align="center" prop="address" label="状态">
        </el-table-column>
        <el-table-column align="center" prop="address" label="审核通过时间">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot="header">
            <el-input size="mini" placeholder="输入关键字搜索" />
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row>
                <el-col :span="4" v-for="item in 6">
                    <div class="yuan"></div>
                    <div class="bg-purple">计划名称</div>
                </el-col>
            </el-row>  -->
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/results_report.css";
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.$api.exportJobList().then((res) => {
      // console.log(res);
    });
  },
  methods: {},
  components: {},
};
</script>