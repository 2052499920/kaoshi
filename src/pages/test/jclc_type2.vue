<template>
  <div style="padding: 2%">
    <div style="width: 700px" class="rich_text_box" id="editorElem1"></div>
    <el-button @click="_gywm" type="primary" style="margin-top: 20px"
      >更新</el-button
    >
    <el-input
        style="width: 500px; margin-top: 20px; display: block"
        placeholder="请输入通知"
        v-model="notice"
      />
      <el-button @click="_notice" type="primary" style="margin-top: 20px"
      >更新</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
import E from "wangeditor";
export default {
  created() {},
  data() {
    return {
      gywm_html: "",
      notice: '',
    };
  },
  methods: {
    _notice() {
            axios
        .post("/index", {
          update_notice: "update_notice",
          update_notice: this.notice,
        })
        .then((res) => {
          this.$message({
            message: "更新成功",
            type: "success",
          });
        });
    },
    _gywm() {
      axios
        .post("/index", {
          guanyuwomen: "guanyuwomen",
          html: this.gywm_html,
        })
        .then((res) => {
          this.$message({
            message: "更新成功",
            type: "success",
          });
        });
    },
  },
  mounted() {
    const editor1 = new E("#editorElem1");
    editor1.customConfig.onchange = (html) => {
      this.gywm_html = html;
    };

  axios
      .post("/index", { xcx: "xcx_index" })
      .then((res) => {
        this.notice = res.data.data.notice[0].notice
      });

    axios
      .post("/index", { get_guanyuwomen: "get_guanyuwomen" })
      .then((res) => {
        editor1.txt.html(res.data.data[0].html);
      });

    editor1.customConfig.customUploadImg = (files, insert) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("path", "files/ne-icev3-dashboard/content/content/");
      axios.post("/uploadsFile", formData).then((res) => {
        const result = res.data;
        const data = "http://yyzs.youlixiang.fun/public/static/img/" + result;
        insert(data);
      });
    };

    editor1.create();
  },
};
</script>

<style scoped>
.ccc {
}
</style>