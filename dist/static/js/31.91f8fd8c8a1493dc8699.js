webpackJsonp([31],{RPPY:function(t,e){},tAsb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("2sCs"),i=n.n(a),o=n("Eq4a"),s=n.n(o),r={created:function(){},data:function(){return{gywm:"",fwzn:"",gywm_html:""}},methods:{_gywm:function(){var t=this;i.a.post("/jclc_type1",{jiancha_state:this.$route.query.state,html:this.gywm_html,edit_html_id:this.$route.query.id}).then(function(e){t.$router.back(-1)})}},mounted:function(){var t=this,e=new s.a("#editorElem1");e.customConfig.onchange=function(e){t.gywm_html=e},i.a.post("/jclc_type1",{id:this.$route.query.id}).then(function(n){0==t.$route.query.state&&e.txt.html(n.data.data[0].zhuyuanbu),1==t.$route.query.state&&e.txt.html(n.data.data[0].menzhen)}),e.customConfig.customUploadImg=function(t,e){var n=new FormData;n.append("file",t[0]),n.append("path","files/ne-icev3-dashboard/content/content/"),i.a.post("/uploadsFile",n).then(function(t){var n=t.data;e("http://yyzs.youlixiang.fun/public/static/img/"+n)})},e.create()}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{padding:"2%"}},[e("div",{staticClass:"rich_text_box",staticStyle:{width:"700px"},attrs:{id:"editorElem1"}}),this._v(" "),e("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:this._gywm}},[this._v("更新")])],1)},staticRenderFns:[]};var u=n("C7Lr")(r,c,!1,function(t){n("RPPY")},"data-v-5f07b676",null);e.default=u.exports}});
//# sourceMappingURL=31.91f8fd8c8a1493dc8699.js.map