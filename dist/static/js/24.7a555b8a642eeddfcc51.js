webpackJsonp([24],{tFka:function(t,e){},xSFf:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("2sCs"),n=i.n(a),l=i("Eq4a"),o=i.n(l),d={created:function(){var t=this;n.a.post("/gywm_type",{queryall:"queryall"}).then(function(e){t.gywm=e.data.data})},data:function(){return{gywm_html:"",title:"",gywm:[],gywm_id:null}},methods:{_gywm:function(){var t=this;console.log(this.gywm_html);var e={};e=this.$route.query.id?{html:this.gywm_html,edit_id:this.$route.query.id,title:this.title,gywm_id:this.gywm_id}:{html:this.gywm_html,title:this.title,add:"add",gywm_id:this.gywm_id},n.a.post("/gywm",e).then(function(e){t.$router.back(-1)})}},mounted:function(){var t=this,e=new o.a("#editorElem1");e.customConfig.onchange=function(e){console.log(e),t.gywm_html=e},n.a.post("/gywm",{id:this.$route.query.id}).then(function(i){e.txt.html(i.data.data[0].html),t.title=i.data.data[0].title,t.gywm_id=i.data.data[0].gywm_id}),e.customConfig.customUploadImg=function(t,e){var i=new FormData;i.append("file",t[0]),i.append("path","files/ne-icev3-dashboard/content/content/"),n.a.post("/uploadsFile",i).then(function(t){var i=t.data;e("http://yyzs.youlixiang.fun/public/static/img/"+i)})},e.create()}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{padding:"2%"}},[i("el-input",{staticStyle:{width:"300px","margin-top":"20px",display:"block"},attrs:{placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),i("div",{staticClass:"rich_text_box",staticStyle:{width:"700px","margin-top":"20px"},attrs:{id:"editorElem1"}}),t._v(" "),i("el-select",{staticStyle:{width:"300px","margin-top":"20px"},attrs:{placeholder:"请选择分类"},model:{value:t.gywm_id,callback:function(e){t.gywm_id=e},expression:"gywm_id"}},t._l(t.gywm,function(t){return i("el-option",{key:t.title,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-button",{attrs:{type:"primary"},on:{click:t._gywm}},[t._v("更新")])],1)],1)},staticRenderFns:[]};var r=i("C7Lr")(d,s,!1,function(t){i("tFka")},"data-v-7f40f822",null);e.default=r.exports}});
//# sourceMappingURL=24.7a555b8a642eeddfcc51.js.map