webpackJsonp([36],{AsaP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("2sCs"),i=a.n(n),o=a("Eq4a"),s=a.n(o),r={created:function(){},data:function(){return{gywm:"",fwzn:"",gywm_html:""}},methods:{_gywm:function(){var t=this;i.a.post("/type3",{jiancha_state:this.$route.query.state,html:this.gywm_html,edit_html_id:this.$route.query.id}).then(function(e){t.$router.back(-1)})}},mounted:function(){var t=this,e=new s.a("#editorElem1");e.customConfig.onchange=function(e){console.log(e),t.gywm_html=e},i.a.post("/type3",{id:this.$route.query.id}).then(function(a){0==t.$route.query.state&&e.txt.html(a.data.data[0].jcq),1==t.$route.query.state&&e.txt.html(a.data.data[0].jcz),2==t.$route.query.state&&e.txt.html(a.data.data[0].jch)}),e.customConfig.customUploadImg=function(t,e){var a=new FormData;a.append("file",t[0]),a.append("path","files/ne-icev3-dashboard/content/content/"),i.a.post("/uploadsFile",a).then(function(t){var a=t.data;e("http://yyzs.youlixiang.fun/public/static/img/"+a)})},e.create()}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{padding:"2%"}},[e("div",{staticClass:"rich_text_box",staticStyle:{width:"700px"},attrs:{id:"editorElem1"}}),this._v(" "),e("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:this._gywm}},[this._v("更新")])],1)},staticRenderFns:[]};var u=a("C7Lr")(r,c,!1,function(t){a("XWYl")},"data-v-42226e0a",null);e.default=u.exports},XWYl:function(t,e){}});
//# sourceMappingURL=36.dfbb0f0829be4484806e.js.map