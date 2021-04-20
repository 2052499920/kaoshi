<template>
  <div style="padding: 2%">
    <div style="width: 700px" class="rich_text_box" id="editorElem1"></div>
    <el-button @click="_gywm" type="primary" style="margin-top: 20px"
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
      gywm: "",
      fwzn: "",
      gywm_html: "",
    };
  },
  methods: {
    _gywm() {
      axios
        .post("/jclc_type1", { jiancha_state: this.$route.query.state, html: this.gywm_html, edit_html_id: this.$route.query.id })
        .then((res) => {
            this.$router.back(-1)
        });
    },
  },
  mounted() {
    const editor1 = new E("#editorElem1");
    editor1.customConfig.onchange = (html) => {
      this.gywm_html = html;
    };

    axios.post("/jclc_type1", { id: this.$route.query.id }).then((res) => {
      if(this.$route.query.state == 0) {
          editor1.txt.html(res.data.data[0].zhuyuanbu);
      }
      if(this.$route.query.state == 1) {
          editor1.txt.html(res.data.data[0].menzhen);
      }
    });

    editor1.customConfig.customUploadImg = (files, insert) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("path", "files/ne-icev3-dashboard/content/content/");
      axios.post("/uploadsFile", formData).then((res) => {
        const result = res.data;
        const data =
          "http://yyzs.youlixiang.fun/public/static/img/" + result;
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