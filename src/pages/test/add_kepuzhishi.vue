<template>
  <div style="padding: 2%">
    <el-input
      style="width: 300px; margin-top: 20px; display: block"
      placeholder="请输入标题"
      v-model="title"
    />

    <div
      style="width: 700px; margin-top: 20px"
      class="rich_text_box"
      id="editorElem1"
    ></div>
        <el-select
      style="width: 300px; margin-top: 20px"
      v-model="kepuzhishi_id"
      placeholder="请选择分类"
    >
      <el-option
        v-for="item in kepuzhishi_type"
        :key="item.title"
        :label="item.title"
        :value="item.id"
      >
      </el-option>
    </el-select>
   <div style="margin-top: 20px">
      <el-button @click="_gywm" type="primary" 
      >更新</el-button
    >
   </div>
  </div>
</template>

<script>
import axios from "axios";
import E from "wangeditor";
export default {
  created() {
    axios
      .post("/kepuzhishi_type", {
        queryall: "queryall",
      })
      .then((res) => {
        this.kepuzhishi_type = res.data.data;
      });
  },
  data() {
    return {
      gywm_html: "",
      title: "",
      kepuzhishi_type: [],
      kepuzhishi_id: null,
    };
  },
  methods: {
    _gywm() {
      console.log(this.gywm_html);
      // return
      let obj = {};
      if (this.$route.query.id) {
        obj = {
          html: this.gywm_html,
          edit_id: this.$route.query.id,
          title: this.title,
          kepuzhishi_id: this.kepuzhishi_id
        };
      } else {
        obj = { html: this.gywm_html, title: this.title, add: "add" };
      }
      axios.post("/kepuzhishi", obj).then((res) => {
        this.$router.back(-1);
      });
    },
  },
  mounted() {
    const editor1 = new E("#editorElem1");
    editor1.customConfig.onchange = (html) => {
      // console.log(html);
      this.gywm_html = html;
    };

    axios
      .post("/kepuzhishi", { id: this.$route.query.id })
      .then((res) => {
        editor1.txt.html(res.data.data[0].html);
        this.title = res.data.data[0].title;
        this.kepuzhishi_id = res.data.data[0].kepuzhishi_id;
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