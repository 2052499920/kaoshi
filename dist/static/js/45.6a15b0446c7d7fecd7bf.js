webpackJsonp([45],{"7l12":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("2sCs"),i=a.n(n),l=(a("EP0S"),a("eMUZ"),{created:function(){this.get_list(this.page)},data:function(){return{tableData:[],value:"",edit_id:null,title:"",radio1:1,pages:1,page:1}},methods:{show_cahange:function(t){var e=this;console.log(0==t.show?1:0),i.a.post("/liuyan",{edit_id:t.id,show:0==t.show?1:0}).then(function(t){e.edit_id=null,e.get_list(e.page)})},edit:function(t){this.$router.push("/add_liuyan?id="+t.id)},del:function(t){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.a.post("/liuyan",{del_id:t.id}).then(function(t){200==t.data.code?e.get_list(e.page):e.$message.error("操作失败")})}).catch(function(){})},sub:function(){var t=this,e={icon:this.value,title:this.title};this.edit_id?e.edit_id=this.edit_id:e.add="add",i.a.post("/liuyan",e).then(function(e){t.edit_id=null,t.get_list(t.page)})},handleCurrentChange:function(t){this.get_list(t)},get_list:function(t){var e=this;i.a.post("/liuyan",{query:"query",page:t,b:"b"}).then(function(t){e.tableData=t.data.data})},handleAvatarSuccess:function(t,e){this.value=t}}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{padding:"2%"}},[a("el-table",{staticStyle:{width:"100%","margin-top":"4%"},attrs:{id:"out-table",data:t.tableData}},[a("el-table-column",{attrs:{prop:"id",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_type",label:"内容"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.user.avatar,alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"msg",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"time",label:"时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"warning"},on:{click:function(a){return t.del(e.row)}}},[t._v("删除")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"是否展示",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(a){return t.show_cahange(e.row)}},model:{value:1==e.row.show,callback:function(a){t.$set(e.row,"show == 1 ? true : false",a)},expression:"scope.row.show == 1 ? true : false"}})]}}])})],1),t._v(" "),a("div",{staticStyle:{float:"right","margin-top":"4%","padding-bottom":"4%"}},[a("el-pagination",{attrs:{layout:"prev, pager, next, jumper",total:10*t.pages},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var r=a("C7Lr")(l,o,!1,function(t){a("LmZu")},"data-v-0aee7cb0",null);e.default=r.exports},LmZu:function(t,e){}});
//# sourceMappingURL=45.6a15b0446c7d7fecd7bf.js.map